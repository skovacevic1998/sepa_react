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
  brBlagajne: number;
}

interface GrupaNaloga {
  id: number;
  id_user: number;
  sts_grupe: string;
  date: string;
}

interface UnosNaloga {
  id: string;
  brRac: string;
  iznUpl: number;
  iznIspl: number;
  date: string;
  pnb: string;
  naknada: number;
  sifOpisPlac: number;
  sifNamjene: string;
  status: string;
}

interface RootState {
  unosNalogaList: UnosNaloga[];
  currentUser: User | null;
  currentGrupaNaloga: GrupaNaloga | null;
}

const initialState: RootState = {
  unosNalogaList: [],
  currentUser: null,
  currentGrupaNaloga: null,
};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addUnosNaloga: (state, action: PayloadAction<UnosNaloga>) => {
      state.unosNalogaList.push(action.payload);
    },
    clearUnosNalogaList: (state) => {
      state.unosNalogaList = [];
    },
    updateUnosNalogaList: (
      state,
      action: PayloadAction<Partial<UnosNaloga>[]>
    ) => {
      state.unosNalogaList = state.unosNalogaList.map((item) => {
        const updatedItem = action.payload.find(
          (partialItem) => partialItem.id === item.id
        );

        if (updatedItem) {
          return {
            ...item,
            ...updatedItem,
          };
        }

        return item;
      });
    },

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

    setGrupaNaloga: (state, action: PayloadAction<Partial<GrupaNaloga>>) => {
      state.currentGrupaNaloga = {
        ...state.currentGrupaNaloga!,
        ...action.payload,
      };
    },
    clearGrupaNaloga: (state) => {
      state.currentGrupaNaloga = null;
    },
    updateGrupaNaloga: (state, action: PayloadAction<Partial<GrupaNaloga>>) => {
      state.currentGrupaNaloga = {
        ...state.currentGrupaNaloga!,
        ...action.payload,
      };
    },
  },
});

export const {
  addUnosNaloga,
  clearUnosNalogaList,
  setUser,
  clearUser,
  updateUser,
  setGrupaNaloga,
  clearGrupaNaloga,
  updateGrupaNaloga,
  updateUnosNalogaList,
} = slice.actions;

export default slice.reducer;
