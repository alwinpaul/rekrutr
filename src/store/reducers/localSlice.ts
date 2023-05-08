import { createSlice } from '@reduxjs/toolkit'
export const candidateSlice = createSlice({
  name: 'local',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value = state.value - 1
    },
  },
})
export const { increment, decrement } = candidateSlice.actions
export default candidateSlice.reducer