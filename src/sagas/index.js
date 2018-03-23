import { all, fork, takeLatest } from 'redux-saga/effects'
import { loadDownloadList, addDownload } from './download'


function* rootSaga() {
  yield all([
    fork(loadDownloadList),
    takeLatest('ADD_DOWNLOAD', addDownload),
    takeLatest('UPDATE_DOWNLOAD', loadDownloadList)
  ])
}

export default rootSaga