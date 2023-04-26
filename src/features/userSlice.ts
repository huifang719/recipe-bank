import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStateValue {
    email: string | null;
}
interface UserState {
    value: UserStateValue;
}
const initialState = { value: { email: null } } as UserState

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        login: (state: UserState, action: PayloadAction<UserStateValue>) => {
            state.value = action.payload;
        },
        logout: (state: UserState) => {
            state = initialState;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice;