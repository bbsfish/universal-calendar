const {
    initializeApp,
    applicationDefault,
    cert,
} = require('firebase-admin/app');
const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter,
} = require('firebase-admin/firestore');

const serviceAccount = require('../credentials/firestore-acc-key.json');

initializeApp({
    credential: cert(serviceAccount),
});

class FireStore {
    constructor() {
		this.$ = getFirestore();
		this.users = this.$.collection('calendar_users');
		this.stamps = this.$.collection('calendar').doc('assets')
			.collection('stamps');
	}

	/**
	 * @param {String} id calendar_users > {uid}.{id}
	 * @returns {Promise<String>} UID - DB 用のユーザ識別子
	 */
	fetchUIdById(id) {
		return new Promise(async (resolve, reject) => {
			const snapshot = await this.users.where('id', '==', id).get();
			if (snapshot.empty) reject('Unknown User ID');
			snapshot.forEach((doc) => {
				const context = doc.data();
				resolve(context.id);
			});
		});
	}

	/**
	 * @param {String} uid calendar_users > {uid}
	 * @returns {<Ref>}
	 */
	getUserProfiles(uid) {
		return this.users.doc(uid).collection('profiles');
	}

	/**
	 * @param {String} uid calendar_users > {uid}
	 * @returns {<Ref>}
	 */
	getUserSubscribes(uid) {
		return this.users.doc(uid).collection('subscribes');
	}

	/**
	 * @param {String} profileId calendar_users > {uid} > profiles > {profileId}
	 * @param {String} uid calendar_users > {uid}
	 * @returns {<Ref>}
	 */
	getUserSchedules(profileId, uid) {
		return this.getUserProfiles(uid).doc(profileId).collection('schedules');
	}
}

module.exports = FireStore;