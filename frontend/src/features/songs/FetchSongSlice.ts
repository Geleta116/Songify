import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  loading: true,
  error: false,
  success: false,
}

const SongsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true
      state.error = false
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = false
      state.success = true
    },
    fetchSongsFailure: (state) => {
      state.loading = false
      state.error = true
      state.success = false
    },
  },
})

export const { fetchSongsStart, fetchSongsSuccess, fetchSongsFailure } =
  SongsSlice.actions

export default SongsSlice.reducer
