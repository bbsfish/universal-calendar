const express = require('express');
const router = express.Router();
const FireStore = require('../lib/firebase.js');
const fireStore = new FireStore();

router.get('/all', getAllStamps);

async function getAllStamps(req, res) {
    const snapshot = await table.get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}

module.exports = router;
