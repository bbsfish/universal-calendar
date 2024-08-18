const express = require('express');
const router = express.Router();
const FireStore = require('../lib/firebase.js');
const fireStore = new FireStore();

router.get('/i/:id', getUserById);

async function getUserById(req, res) {
    const anyId = req.params.id;
    const snapshot = await fireStore.users.where('id', '==', anyId).get();
    if (snapshot.empty) {
        return res.status(400).send('Invalid User ID');
    }

    snapshot.forEach((doc) => {
        const { id, nickname, email } = doc.data();
        return res.json({
            id, nickname, email,
        });
    });
}

module.exports = router;
