import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  loading: true,
  error: false,
  success: false,
}

const AddSongSlice = createSlice({
  name: "addSongs",
  initialState,
  reducers: {
    addSongStart: (state) => {
      state.loading = true
      state.error = false
    },
    addSongSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = false
      state.success = true
    },
    addSongFailure: (state) => {
      state.loading = false
      state.error = true
      state.success = false
    },
  },
})

export const { addSongStart, addSongSuccess, addSongFailure } =
  AddSongSlice.actions

export default AddSongSlice.reducer
