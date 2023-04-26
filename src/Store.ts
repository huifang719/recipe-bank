import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import recipeSlice from './features/recipeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    recipe:recipeSlice.reducer,
  },
})