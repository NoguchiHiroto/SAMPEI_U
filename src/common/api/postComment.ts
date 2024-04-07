import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

interface CommentData {
  comment: string;
  userName: string;
  userID: number;
}


const postComment = (data: CommentData) => {
  const now = moment();
  const year = (now.year()).toString();
  const month = (now.month() + 1).toString().padStart(2, '0');
  const date = (now.date()).toString().padStart(2, '0');
  const hour = (now.hour()).toString().padStart(2, '0');
  const minute = (now.minute()).toString().padStart(2, '0');
  return new Promise((resolve, reject) => {
    firestore().collection('comment').doc(data.userName).collection(`${year}-${month}-${date}`).doc(`${hour}:${minute}`).set({
      year: year,
      date: date,
      month: month,
      hour: hour,
      minute: minute,
      userName: data.userName,
      userID: data.userID,
      comment: data.comment,
    })
    .then((documentReference) => {
      resolve(documentReference);
    })
    .catch(err => {
      console.error(err);
      reject(err);
    });
  })
}

export default postComment;