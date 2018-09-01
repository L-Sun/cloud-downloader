import { all, fork, takeLatest } from 'redux-saga/effects'
import {
  fetchGlobalState,
  fetchDownloadList,
  removeDownload,
  purgeDownload,
  addDownload,
  pauseDownload,
  startDownload,
  deselectFile
} from './download'


function* rootSaga() {
  yield all([
    fork(fetchGlobalState),
    fork(fetchDownloadList),
    takeLatest('ADD_URI', addDownload),
    takeLatest('ADD_TORRENT', addDownload),
    takeLatest('REMOVE_DOWNLOAD', removeDownload),
    takeLatest('PURGE_DOWNLOAD', purgeDownload),
    takeLatest('START_ALL', startDownload),
    takeLatest('START', startDownload),
    takeLatest('PAUSE_ALL', pauseDownload),
    takeLatest('PAUSE', pauseDownload),
    takeLatest('DESELECT_FILE', deselectFile),
  ])
}

export default rootSaga