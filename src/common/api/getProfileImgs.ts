import firestore from '@react-native-firebase/firestore';
import moment from "moment";

const getUsersProfile = () => {
  const now = moment();
  const year = now.year();
  const month = (now.month() + 1).toString().padStart(2, '0');
  const date = (now.date()).toString().padStart(2, '0');
  const hour = now.hour();
  const minute = now.minute();
  interface UserProfile {
    [userName: string]: string;
  }
  return new Promise((resolve, reject) => {
    firestore().collection('users').get().then((snapshot) => {
      if (snapshot.empty) {
        console.log('そのようなユーザー名のユーザーは存在しません');
        resolve(null);
      } else {
        // console.log('users', snapshot);
        const result:UserProfile = {};
        snapshot.forEach((doc) => {
          const userInfo  = doc.data();
          result[userInfo.userName] = userInfo.img;
        });
        resolve(result);
      }
    }).catch((err) => {
      reject();
      console.error(err);
    })
  })
}

export default getUsersProfile;