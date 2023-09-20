import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import fetchSongSlice from "../features/songs/FetchSongSlice"
import createSagaMiddleware from "redux-saga" // Note the change here, using 'redux-saga' instead of 'redux-saga/core'
import mySaga from "../saga/sagas"
import UpdateSongSlice from "../features/songs/UpdateSongSlice"
import AddSongSlice from "../features/songs/AddSongSlice"
import DeleteSongSlice from "../features/songs/DeleteSongSlice"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    songs: fetchSongSlice,
    updateSongs: UpdateSongSlice,
    addSongs: AddSongSlice,
    deleteSongs: DeleteSongSlice,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(mySaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
