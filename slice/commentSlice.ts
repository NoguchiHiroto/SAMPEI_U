import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentInput, CommentResponse } from '../types/comment';

interface CommentState {
  comments: CommentResponse[];
  latestComments: { [userId: number]: CommentResponse };
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

const initialState: CommentState = {
  comments: [],
  latestComments: {},
  loading: false,
  error: null,
  submitting: false,
};

export const submitComment = createAsyncThunk(
  'comments/submit',
  async (commentData: CommentInput) => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit comment');
    }

    const result = await response.json();
    return result.data;
  }
);

export const fetchGroupComments = createAsyncThunk(
  'comments/fetchGroup',
  async (groupId: number) => {
    const response = await fetch(`/api/comments/group/${groupId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const result = await response.json();
    return result.data;
  }
);

export const fetchLatestUserComment = createAsyncThunk(
  'comments/fetchLatestUser',
  async (userId: number) => {
    const response = await fetch(`/api/comments/user/${userId}/latest`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch latest comment');
    }

    const result = await response.json();
    return { userId, comment: result.data };
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitComment.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.submitting = false;
        state.comments.unshift(action.payload);
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || 'Failed to submit comment';
      })
      .addCase(fetchGroupComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchGroupComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(fetchLatestUserComment.fulfilled, (state, action) => {
        const { userId, comment } = action.payload;
        if (comment) {
          state.latestComments[userId] = comment;
        }
      });
  },
});

export const { clearError, clearComments } = commentSlice.actions;
export default commentSlice.reducer;