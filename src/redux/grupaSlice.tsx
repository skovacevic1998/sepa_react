import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GrupaNaloga {
  id: number;
  id_user: number;
  sts_grupe: string;
  date: string;
}

interface GrupaNalogaState {
  currentGrupaNaloga: GrupaNaloga | null;
}

const initialState: GrupaNalogaState = {
  currentGrupaNaloga: null,
};

const grupaSlice = createSlice({
  name: "unosNaloga",
  initialState,
  reducers: {
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

export const { setGrupaNaloga, clearGrupaNaloga, updateGrupaNaloga } =
  grupaSlice.actions;

export default grupaSlice.reducer;
