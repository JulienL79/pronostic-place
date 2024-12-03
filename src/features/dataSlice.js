import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    game: 'euromillions',
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
    updateGame(state, action) {
      state.game = action.payload
    },
  },
});

export const { addData, updateIsCollected, updateGame } = dataSlice.actions;
export default dataSlice.reducer;