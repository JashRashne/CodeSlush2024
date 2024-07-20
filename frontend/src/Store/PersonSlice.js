import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personCount: 0,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    updatePersonCount(state, action) {
      state.personCount = action.payload;
    },
  },
});
export const { updatePersonCount } = personSlice.actions;
// Export the reducer to combine it with other reducers
export default personSlice.reducer;
