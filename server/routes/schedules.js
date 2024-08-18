const express = require('express');
const router = express.Router();
const { collection, query, where, Timestamp, or, getDocs } = require('firebase/firestore');
const FireStore = require('../lib/firebase.js');
const logger = require('../lib/logger.js');
const fireStore = new FireStore();

router.use((req, res, next) => {
    if (!req.session.authenticated) {
        return res.status(401).send('Unauthorized');
    }
    next();
});

router.get('/date/:profileId/:month/:year', getSchedulesByDate);
router.post('/add', addSchedule);

async function getSchedulesByDate(req, res) {
    const { year, month, profileId } = req.params;
    const schedulesRef = fireStore.getUserSchedules(profileId, req.session.uid);
    const startDate = new Date(year, month-2, 23);
    const endDate = new Date(year, month, 7);
    const snapshot = await schedulesRef
        .where('start_time', '>=', Timestamp.fromDate(startDate).toDate())
        .where('end_time', '<=', Timestamp.fromDate(endDate).toDate())
        .get();
    let schedules = [];
    snapshot.forEach((doc) => {
        schedules.push(doc.data());
    });
    return res.json(schedules);
}

async function addSchedule(req, res) {
    const {
        all_day, start_time, end_time,
        profile_id, stamp_id, subject,
    } = req.body;
    const result = await fireStore.getUserSchedules(profile_id, req.session.uid).add({
        all_day,
        start_time: Timestamp.fromDate(new Date(start_time)).toDate(),
        end_time: Timestamp.fromDate(new Date(end_time)).toDate(),
        stamp_id,
        subject,
    });
    logger.log('Add Schedule: ', result);
    return res.json({
        profile_id,
        schedule_id: result.id,
    });
}

module.exports = router;
