import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import getUsersName from './getUsersName';
import { setGestureState } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const getComments = () => {
  const now = moment();
  const year = now.year();
  const month = (now.month() + 1).toString().padStart(2, '0');
  const date = (now.date()).toString().padStart(2, '0');
  const hour = now.hour();
  const minute = now.minute();
  interface result {
    [userName: string]: {
      date: string,
      comment: string
    }[]
  }
  return new Promise((resolve, reject) => {
    const result:result = {}
    getUsersName().then((usersName:string[]) => {
      Promise.all(
        usersName.map((userName) => {
          return new Promise<void>((resolve, reject) => {
            firestore().collection('comment').doc(userName).collection(`${year}-${month}-${date}`).get()
            // firestore().collection('comment').doc('Noguchi').collection(`2023-12-24`).get()
            .then((querySnapshot) => {
              querySnapshot.forEach((documentSnapshot:any) => {
                const data = documentSnapshot.data();
                if (Object.keys(result).includes(userName)) {
                  result[userName].push({date: `${data.hour}:${data.minute}`, comment: data.comment});
                } else {
                  result[userName] = [{date: `${data.hour}:${data.minute}`, comment: data.comment}];
                };
              });
              resolve()
            })
            .catch(err => reject(err));
          })
        })
      ).then(() => {
        console.log('GET', result)
        resolve(result);
      })
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
};

export default getComments;