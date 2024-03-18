const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, collection, getDocs } = require('firebase-admin/firestore');
const serviceAccount = require('./ondu-ee7db-firebase-adminsdk-7c0xz-2f1cf505b0.json')

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


module.exports = {
  addComment: (data) => {
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
  getComments: (date='2023-12-24') => {
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
  getProfileImgs: () => {
    const ref =  db.collection('users');
    return new Promise((resolve, reject) => {
      ref.get().then((snapshot) => {
        if (snapshot.empty) {
          console.log('そのようなユーザー名のユーザーは存在しません');
        } else {
          // console.log('users', snapshot);
          const result = {};
          snapshot.forEach((doc) => {
            userInfo  = doc.data();
            result[userInfo.userName] = userInfo.img;
            
          });
          resolve(result);
        }
      }).catch((err) => {
        reject();
        console.error(err);
      })
    })
  },
  setProfileImg: (data) => {
    // console.log(data);
    const docRef = db.collection('users').doc(`${data.userName}`);
    // console.log(docRef);
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
        userName: data.userName,
      }).then(() => {
        console.log('DBにset完了しました')
        resolve()
      });
    })
  }
} 
