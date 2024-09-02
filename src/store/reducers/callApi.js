import { createAsyncThunk } from "@reduxjs/toolkit";

export const apicall = createAsyncThunk(
  "celebs/apicall",
  async (mapData, { getState }) => {
    return { dataa: mapData };
  }
);
