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
    recentFilter: null,
    startDatePredict: null,
    endDatePredict: null,
    isUpdate: false
  },
  reducers: {
    addData(state, action) {
      state.datas = action.payload;
      state.isCollected = true;
      state.startDatePredict = null;
      state.endDatePredict = null;
      state.filterResult = null;
    },
    updateIsCollected(state, action) {
      state.isCollected = action.payload;
    },
    updateGame(state, action) {
      state.game = action.payload;
    },
    updateMaxNumber(state, action) {
      state.maxNumber = action.payload;
    },
    updateMaxBonus(state, action) {
      state.maxBonus = action.payload;
    },
    updateNumberDraw(state, action) {
      state.numberDraw = action.payload;
    },
    updateBonusDraw(state, action) {
      state.bonusDraw = action.payload;
    },
    updateFilterResult(state, action) {
      state.filterResult = action.payload;
    },
    updateRecentFilter(state, action) {
      state.recentFilter = action.payload;
    },
    updateStartDatePredict(state, action) {
      state.startDatePredict = action.payload;
    },
    updateEndDatePredict(state, action) {
      state.endDatePredict = action.payload;
    },
    setUpdated(state) {
      state.isUpdate = true;
    }
  },
});

export const { addData, updateIsCollected, updateGame, updateMaxNumber, updateMaxBonus, updateNumberDraw, updateBonusDraw, updateFilterResult, updateRecentFilter, updateStartDatePredict, updateEndDatePredict, setUpdated } = dataSlice.actions;
export default dataSlice.reducer;