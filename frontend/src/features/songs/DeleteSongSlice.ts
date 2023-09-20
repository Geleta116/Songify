import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  loading: true,
  error: false,
  success: false,
}

const DeleteSongSlice = createSlice({
  name: "deleteSongs",
  initialState,
  reducers: {
    deleteSongStart: (state) => {
      state.loading = true
      state.error = false
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = false
      state.success = true
    },
    deleteSongFailure: (state) => {
      state.loading = false
      state.error = true
      state.success = false
    },
  },
})

export const { deleteSongStart, deleteSongSuccess, deleteSongFailure } =
  DeleteSongSlice.actions

export default DeleteSongSlice.reducer
