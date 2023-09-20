import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "../../features/songs/FetchSongSlice"
import {
  addSongStart,
  addSongSuccess,
  addSongFailure,
} from "../../features/songs/AddSongSlice"
import {
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
} from "../../features/songs/UpdateSongSlice"

import {
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} from "../../features/songs/DeleteSongSlice"
import {
  fetchSongsFromApi,
  postSongToApi,
  patchSongToApi,
  deleteSongFromApi,
} from "../Api/SongApi"

function* fetchSongsSaga(): Generator {
  try {
    const data = yield call(fetchSongsFromApi)

    yield put(fetchSongsSuccess(data))
  } catch (error) {
    yield put(fetchSongsFailure())
  }
}
function* addSongSaga(action: {
  payload: { name: string; singer: string; file: string }
}): Generator<any, void, any> {
  try {
    const data = yield call(postSongToApi, action.payload)
    yield put(addSongSuccess(data))
    yield put(fetchSongsStart())
  } catch (error) {
    yield put(addSongFailure())
  }
}

function* updateSongSaga(action: {
  payload: {
    title: string
    singerName: string
    file: string
    songId: number
  }
}): Generator {
  try {
    const data = yield call(patchSongToApi, action.payload)
    yield put(updateSongSuccess(data))
    yield put(fetchSongsStart())
  } catch (error) {
    yield put(updateSongFailure()) 
  }
}

function* DeleteSongSaga(action: {
  payload: {
    songId: number
  }
}): Generator {
  try {
    const data = yield call(deleteSongFromApi, action.payload)
    yield put(deleteSongSuccess(data))
    yield put(fetchSongsStart())
  } catch (error) {
    yield put(deleteSongFailure())
  }
}

export function* watchUpdateSongs(): Generator {
  yield takeLatest(updateSongStart.type, updateSongSaga)
}

export function* watchFetchSongs(): Generator {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga)
}

export function* watchAddSong(): Generator {
  yield takeLatest(addSongStart.type, addSongSaga)
}

export function* watchDeleteSong(): Generator {
  yield takeLatest(deleteSongStart.type, DeleteSongSaga)
}
