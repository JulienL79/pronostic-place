import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    game: '',
    datas: [],
    isCollected: false,
    maxNumber: 0,
    maxBonus: 0,
    numberDraw: 0,
    bonusDraw: 0,
    filterResult: null,
    firstFilterPredict: null,
    secondFilterPredict: null
  },
  reducers: {
    addData(state, action) {
        state.datas = action.payload
      },
    updateIsCollected(state, action) {
      state.isCollected = action.payload;
    },
    updateGame(state, action) {
      state.game = action.payload
    },
    updateMaxNumber(state, action) {
      state.maxNumber = action.payload
    },
    updateMaxBonus(state, action) {
      state.maxBonus = action.payload
    },
    updateNumberDraw(state, action) {
      state.numberDraw = action.payload
    },
    updateBonusDraw(state, action) {
      state.bonusDraw = action.payload
    },
    updateFilterResult(state, action) {
      state.filterResult = action.payload;
    },
    updateFirstFilterPredict(state, action) {
      state.firstFilterPredict = action.payload;
    },
    updateSecondFilterPredict(state, action) {
      state.secondFilterPredict = action.payload;
    },
  },
});

export const { addData, updateIsCollected, updateGame, updateMaxNumber, updateMaxBonus, updateNumberDraw, updateBonusDraw, updateFilterResult, updateFirstFilterPredict, updateSecondFilterPredict } = dataSlice.actions;
export default dataSlice.reducer;