import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCelebs = createAsyncThunk(
  "celebs/deleteCelebs",
  async (deleteKey, { getState }) => {
    const state = getState();
    const currentData = state.celebs.celebsProfile;
    const filteredData = currentData.filter((item) => item.id !== deleteKey);
    return { dataa: filteredData };
  }
);
