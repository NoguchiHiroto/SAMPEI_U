const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = require('./ondu-ee7db-firebase-adminsdk-7c0xz-2f1cf505b0.json')

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


module.exports = {
  addData: (data) => {
    const docRef = db.collection('comment').doc(`${data.userName}`).collection(`${data.year}-${data.month}-${data.date}`).doc(`${data.hour}:${data.minute}`);
    return new Promise((resolve, reject) => {
      docRef.set({
        comment: data.comment,
        date: data.date,
        month: data.month,
        hour: data.hour,
        minute: data.minute,
        userName: data.userName,
        userID: data.userID,
        year: data.year,
      }).then(() => resolve());
    })
  },
  getData: () => {
    const refAll = db.collection('comment');
    return new Promise((resolve, reject) => {
      refAll.get().then((snapshot) => {
        if(snapshot.empty) {
          console.log('Empty');
          resolve({})
        } else {
          const result = {}
          snapshot.forEach(doc => {
            result[doc.id] = doc.data();
          });
          resolve(result);
        }
      })
    })
 }
} 
