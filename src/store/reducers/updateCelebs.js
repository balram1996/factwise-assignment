import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateCelebs = createAsyncThunk(
  "celebs/updateCelebs",
  async (updatedItem, { getState }) => {
    const state = getState();
    const currentData = state.celebs.celebsProfile;
    // const filteredData = currentData.filter((item) => item.id !== deleteKey);
    const updatedItems = currentData.map((item) =>
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    );
    return { dataa: updatedItems };
  }
);
