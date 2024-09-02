import { createSlice } from "@reduxjs/toolkit";
// import { data } from "../celebrities";
import { deleteCelebs } from "./reducers/deleteCelebs";
import { updateCelebs } from "./reducers/updateCelebs";
import { apicall } from "./reducers/callApi";

const initialState = {
  celebsProfile: [],
};
export const celebsSlice = createSlice({
  name: "celebs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCelebs.fulfilled, (state, action) => {
      console.log(action.payload.dataa, "dispatch"); // Check this log carefully
      if (action.payload.dataa) {
        state.celebsProfile = action.payload.dataa;
      }
    });
    builder.addCase(updateCelebs.fulfilled, (state, action) => {
      console.log(action.payload.dataa, "dispatch"); // Check this log carefully
      if (action.payload.dataa) {
        state.celebsProfile = action.payload.dataa;
      }
    });
    builder.addCase(apicall.fulfilled, (state, action) => {
      console.log(action.payload.dataa, "dispatch"); // Check this log carefully
      if (action.payload.dataa) {
        state.celebsProfile = action.payload.dataa;
      }
    });
  },
});

export default celebsSlice.reducer;
