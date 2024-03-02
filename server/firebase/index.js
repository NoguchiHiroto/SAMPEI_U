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
  getData: (date='2023-12-24') => {
    const refAll = db.collection('comment').doc('Noguchi').collection(date);
    return new Promise((resolve, reject) => {
      refAll.get().then((snapshot) => {
        if (snapshot.empty) {
          // もしもコメントがなかった場合
          console.log('Empty');
          resolve({});
        } else {
          // コメントがあればその日のコメントを全て取得
          const result = {}
          snapshot.forEach(doc => {
            result[doc.id] = doc.data();
          });
          resolve(result);
        }
      }).catch((err) => {
        reject({});
        throw new Error(err);
      })
    })
  },
  setProfileImg: (data) => {
    // console.log(data);
    const docRef = db.collection('users').doc(`${data.userName}`);
    console.log(docRef);
    // const docRef = db.collection('users').doc('user1');
    return new Promise((resolve, reject) => {
      // docRef.get().then((snapshot) => {
      //   if (snapshot.empty) {
      //     console.log('EMPTY');
      //   } else {
      //     // snapshot.forEach(doc => {
      //     //   conosle.log(doc.data())
      //     // });
      //     console.log(snapshot.data())
      //     console.log('OK')
      //     resolve('OK');
      //   }
      // }).catch((err) => {
      //   reject();
      //   throw new Error(err);
      // })

      docRef.set({
        img: data.img,
        userName: 'aaaa',
      }).then(() => resolve());
    })
  }
} 
