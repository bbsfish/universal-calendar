const express = require('express');
const router = express.Router();
const FireStore = require('../lib/firebase.js');
const fireStore = new FireStore();
const logger = require('../lib/logger.js');

router.post('/add', addProfile);

async function addProfile(req, res) {
    const { label } = req.body;
    const result = await fireStore.getUserProfiles(req.session.uid).add({
        label,
    });
    logger.log('Add Profile: ', result);
    return res.json({
        profile_id: result.id,
    });
}

module.exports = router;
