import moment from "moment";
import firestore from '@react-native-firebase/firestore';

const postProfileImg = (data:any) => {
  const now = moment();
  const year = now.year();
  const month = (now.month() + 1).toString().padStart(2, '0');
  const date = (now.date()).toString().padStart(2, '0');
  const hour = now.hour();
  const minute = now.minute();
  return new Promise<string>((resolve, reject) => {
    firestore().collection('users').doc(data.userName).set({
      img: data.img,
      userName: data.userName,
    }).then(() => {
      console.log('DBset完了')
      resolve(data.img)
    })
  })
}

export default  postProfileImg;