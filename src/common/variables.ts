export const symptomsList = [
  ['せきが出る', '身体がだaaるい', '筋肉痛がする'],
  ['のどが痛い', 'たんが出る', '味がない'],
  ['便がゆるい', '目が赤い', '頭が痛い'],
  ['息切れがする', '悪寒がする', '吐き気がする'],
  ['鼻水が出る', '鼻が詰まる', '皮膚が赤い'],
];

export const rootPath = '/Users/noguchi.hiroto/Documents/ONDU/';
// const isMac = false;
const isMac = false;
const MAC_URL = 'http://127.0.0.1';
const WSL_URL = 'http://10.0.2.2';
export const URL = {
  getProfileImgs: `${isMac ? MAC_URL : WSL_URL}:8000/api/getProfileImgs/`,
  getComments: `${isMac ? MAC_URL : WSL_URL}:8000/api/getComments/`,
  setProfileImg: `${isMac ? MAC_URL : WSL_URL}:8000/api/setProfileImg/`,
  setComment: `${isMac ? MAC_URL : WSL_URL}:8000/api/setComment/`,
}