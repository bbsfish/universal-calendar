const express = require('express');
const router = express.Router();
const FireStore = require('../lib/firebase.js');
const fireStore = new FireStore();
const logger = require('../lib/logger.js');

router.post('/add', addSubscribe);

async function addSubscribe(req, res) {
    const { color, profile_id, id } = req.body;
    let uid = '';
    try {
        uid = await fireStore.fetchUIdById(id);
    } catch (error) {
        return res.status(401).send('Unknown User ID');
    }
    const subscribesRef = fireStore.getUserSubscribes(uid).doc();
    const result = await subscribesRef.set({
        color, profile_id, uid,
    });
    logger.log('Add Subscribes: ', result);
    return res.status(500).send('OK');
}

module.exports = router;
