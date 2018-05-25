import { all, fork, takeLatest } from 'redux-saga/effects'
import {
  fetchGlobalState,
  fetchDownloadList,
  removeDownload,
  addDownload,
  pauseDownload,
  startDownload
} from './download'


function* rootSaga() {
  yield all([
    fork(fetchGlobalState),
    fork(fetchDownloadList),
    takeLatest('ADD_URI', addDownload),
    takeLatest('ADD_TORRENT', addDownload),
    takeLatest('REMOVE_DOWNLOAD', removeDownload),
    takeLatest('START_ALL', startDownload),
    takeLatest('START', startDownload),
    takeLatest('PAUSE_ALL', pauseDownload),
    takeLatest('PAUSE', pauseDownload)
  ])
}

export default rootSaga