const database = require('./lib/firebase.js');
const { collection, query, where, Timestamp } = require('firebase/firestore');

async function add(params) {
    
}

async function main() {
    // const year = 2024;
    // const month = 8;
    // const schedulesRef = database.collection('calendar_users')
    //     .doc('7XhHkhmLYg3FRW3BdQXH')
    //     .collection('schedules');
    // const startDate = new Date(year, month-2, 23);
    // const endDate = new Date(year, month, 7);
    // const snapshot = await schedulesRef
    //     .where('start_time', '>=', Timestamp.fromDate(startDate).toDate())
    //     .where('end_time', '<=', Timestamp.fromDate(endDate).toDate())
    //     .get();
    // console.log(snapshot);
    // const snapshot  = await table
    //     .or(where('start_time', '>=', Timestamp.fromDate(startDate).toDate()),
    //         where('end_time', '<=', Timestamp.fromDate(endDate).toDate()))
    //     .get();
    // snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', (doc.data()).subject);
    // });
    console.log(Timestamp.fromDate(new Date('Thu Aug 20 2024 06:35:20 GMT+0900')))
}

main();