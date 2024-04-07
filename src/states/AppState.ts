export interface AppState {
  userName: string;
  temp: number;
  isSymptoms: boolean;
  symptoms: string[][];
  comment: {[userName:string]: string[]};
  profileImg: any;
  inputComment: string;
}