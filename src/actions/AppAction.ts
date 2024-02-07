import { Action } from "redux";

export const UPDATE_TEMP = 'UPDATE_TEMP';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export interface UpdateTempAction extends Action {
  temp: number;
};

export interface UpdateCommentAction extends Action {
  comment: string;
}

export const createUpdateTempAction = (temp: number) => {
  return {
    temp: temp,
    type: UPDATE_TEMP,
  }
};

export const createUpdateCommentAction = (comment: string) => {
  return {
    comment: comment,
    type: UPDATE_TEMP,
  }
};

