import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../states/AppState";
import { symptomsList } from "../common/variables";
import ProfileIcon from "../Header/ProfileIcon.png";
export const initialState: AppState = {
  userName: '大沼万優子２',
  temp: 36.0,
  isSymptoms: false,
  symptoms: symptomsList.map((symptoms_3) => (symptoms_3.map(() => ''))),
  comment: {},
  inputComment: '',
  profileImg: ProfileIcon
}
export const tempSlice = createSlice({
  name: 'Temp',
  initialState: initialState,
  reducers: {
    changeTemp: (state, action) => {
      state.temp = action.payload
    },
    changeIsSymptoms: (state, action) => {
      state.isSymptoms = action.payload;
    },
    changeSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    changeComment: (state, action) => {
      state.comment = action.payload;
    },
    changePrifileImg: (state, action) => {
      state.profileImg = action.payload;
    },
    changeInputComment: (state, action) => {
      state.inputComment = action.payload;
    }
  }
});

export const {changeTemp, changeIsSymptoms, changeSymptoms, changeComment, changePrifileImg, changeInputComment} = tempSlice.actions; // Action Createrのこと
export default tempSlice.reducer;