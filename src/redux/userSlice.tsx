import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  dob: number;
  lokacija: string;
  roles: string;
  username: string;
}

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.currentUser = {
        ...state.currentUser!,
        ...action.payload,
      };
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.currentUser = {
        ...state.currentUser!,
        ...action.payload,
      };
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
