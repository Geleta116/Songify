import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  loading: true,
  error: false,
  success: false,
}

const UpdateSongSlice = createSlice({
  name: "updateSongs",
  initialState,
  reducers: {
    updateSongStart: (state) => {
      state.loading = true
      state.error = false
    },
    updateSongSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = false
      state.success = true
    },
    updateSongFailure: (state) => {
      state.loading = false
      state.error = true
      state.success = false
    },
  },
})

export const { updateSongStart, updateSongSuccess, updateSongFailure } =
  UpdateSongSlice.actions

export default UpdateSongSlice.reducer
