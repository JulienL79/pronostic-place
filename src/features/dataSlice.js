import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    datas: [],
    isCollected: false
  },
  reducers: {
    addData(state, action) {
        state.datas = action.payload
      },
    updateIsCollected(state) {
      state.isCollected = true;
    },
  },
});

export const { addData, updateIsCollected } = dataSlice.actions;
export default dataSlice.reducer;