import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const getUsersName = () => {
  return new Promise<string[]>((resolve, reject) => {
    const usersName:string[] = [];
    firestore().collection('users').get()
    // firestore().collection('comment').doc('Noguchi').collection(`${year}-${month}-${date}`).get()
    // firestore().collection('comment').doc('Noguchi').collection(`2023-12-24`).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot:any) => {
        // console.log(documentSnapshot.data());
        const data = documentSnapshot.data();
        usersName.push(data.userName);
        
      //   const data = documentSnapshot.data();
      //   if(Object.keys(result).includes(data.userName)) {
      //     result[data.userName].push({date: `${data.hour}:${data.minute}`, comment: data.comment}) ;
      //   } else {
      //     result[data.userName] = [{date: `${data.hour}:${data.minute}`, comment: data.comment}]
      //   };
      });
      resolve(usersName);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
  });
};

export default getUsersName;