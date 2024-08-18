const express = require('express');
const router = express.Router();
const FireStore = require('../lib/firebase.js');
const fireStore = new FireStore();

router.post('/', authenticateUserPassword);

async function authenticateUserPassword(req, res) {
    const { id, passwd } = req.body;
    const snapshot = await fireStore.users
        .where('id', '==', id)
        .where('password', '==', passwd)
        .get();
    if (snapshot.empty) {
        return res.status(400).send('Authentication Deny');
    }

    snapshot.forEach((doc) => {
        Object.assign(req.session, {
            authenticated: true,
            uid: doc.id
        });
        return;
    });
    return res.status(200).send('Authentication Success');
}

module.exports = router;
