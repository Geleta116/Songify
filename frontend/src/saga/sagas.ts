import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  watchFetchSongs,
  watchAddSong,
  watchUpdateSongs,
  watchDeleteSong,
} from "../saga/Watchers/SongWatchers"

export default function* rootSaga(): Generator {
  yield all([
    watchFetchSongs(),
    watchAddSong(),
    watchUpdateSongs(),
    watchDeleteSong(),
  ])
}
