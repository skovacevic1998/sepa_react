import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UnosNaloga {
  tip_naloga: string;
  valuta_placanja: string;
  iznos: number;
  ime_plat: string;
  adresa_plat: string;
  mjesto_plat: string;
  ime_prim: string;
  adresa_prim: string;
  mjesto_prim: string;
  sif_opis_plac: number;
  sif_namjene: string;
  dat_izvrsenja: string;
  dat_podnosenja: string;
  drzavaRac: string;
  kontrolni_broj_plat: string;
  iban_plat: string;
  model_plat: string;
  pnb_plat: string;
  kontrolni_broj_prim: string;
  iban_prim: string;
  model_prim: string;
  pnb_prim: string;
  opis_placanja: string;
  br_blagajne: number;
  vr_naknade: number;
  iznos_naknade: number;
}

interface UnosState {
  currentUnosNaloga: UnosNaloga | null;
}

const initialState: UnosState = {
  currentUnosNaloga: null,
};

const unoSlice = createSlice({
  name: "unosNaloga",
  initialState,
  reducers: {
    setUnosNaloga: (state, action: PayloadAction<Partial<UnosNaloga>>) => {
      state.currentUnosNaloga = {
        ...state.currentUnosNaloga!,
        ...action.payload,
      };
    },
    clearUnosNaloga: (state) => {
      state.currentUnosNaloga = null;
    },
    updateUnosNaloga: (state, action: PayloadAction<Partial<UnosNaloga>>) => {
      state.currentUnosNaloga = {
        ...state.currentUnosNaloga!,
        ...action.payload,
      };
    },
  },
});

export const { setUnosNaloga, clearUnosNaloga, updateUnosNaloga } =
  unoSlice.actions;

export default unoSlice.reducer;
