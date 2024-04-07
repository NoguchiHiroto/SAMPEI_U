export interface AppState {
  userName: string;
  temp: number;
  isSymptoms: boolean;
  symptoms: string[][];
  comments: {[userName:string]: {comment: string, date: string}[]};
  profileImg: any;
  inputComment: string;
}