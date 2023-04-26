import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CuisineMeals from "../interface/CuisineMeals";

interface RecipeState {
  value: CuisineMeals []
}

const initialState: RecipeState  = { value: []}

const recipeSlice = createSlice({
  name: "recipe", 
  initialState, 
  reducers: {
    showResult: (state: RecipeState, action: PayloadAction<CuisineMeals>) => {
      state.value.push(action.payload);
    }, 
    reset: (state: RecipeState) => {
      state = initialState;
    }
  }
})

export const { showResult, reset } = recipeSlice.actions;
export default recipeSlice; 