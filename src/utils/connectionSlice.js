import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection", // Trimmed name
  initialState: [], // Initial state is an empty array
  reducers: {
    setConnections: (state, action) => action.payload, // Sets the state to the provided payload
    clearConnections: () => [], // Resets the state to an empty array
  },
});

export const { setConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
