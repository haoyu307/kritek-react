import { configureStore } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// *
import { postQuery } from "./hooks/postQueries";

interface PostState {
  id: number | undefined;
}

const postSlice = createSlice({
  name: "posts",
  initialState: {
    id: undefined,
  },
  reducers: {
    setId: (state: PostState, action: PayloadAction<number | undefined>) => {
      state.id = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    [postQuery.reducerPath]: postQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postQuery.middleware),
});

export default store;

export const { setId } = postSlice.actions;
export const idSelector = (state: any) => state?.posts?.id;
