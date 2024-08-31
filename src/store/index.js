import { createSlice } from "@reduxjs/toolkit";
import { data } from "../celebrities";

const initialState = {
  celebsProfile: data,
};
export const celebsSlice = createSlice({
  name: "celebs",
  initialState: initialState,
  reducers: {
    // setCelebs: (state) => (state.celebsProfile = celebrities),
  },
});

export default celebsSlice.reducer;
