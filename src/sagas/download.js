import { all, call, put, select } from 'redux-saga/effects'
import {
  getGlobalStat,
  tellActive,
  tellCompleted,
  tellPaused,
  addUri,
  addTorrent,
  startAll,
  start,
  pauseAll,
  pause,
  remove,
  removeDownloadResult,
  changeOption
} from './apiCalls'
import { formatData, formateState } from './format'

const delay = () => new Promise(resolve => setTimeout(resolve, 2000))
const getConfigFromState = state => state.config
const getGlobalStateFromState = state => state.globalState

export function* fetchGlobalState() {
  while (true) {
    yield call(delay)
    try {
      const config = yield select(getConfigFromState)

      const response = yield call(getGlobalStat, config)
      const globalState = formateState(response.data.result)

      yield put({ type: 'FETCH_GLOBAL_STATE_SUCCESS', payload: globalState })
    } catch (error) {
      yield put({ type: 'FETCH_FAILD' })
    }
  }
}

export function* fetchDownloadList() {
  while (true) {
    yield call(delay)
    try {
      const config = yield select(getConfigFromState)
      const globalState = yield select(getGlobalStateFromState)
      const response = yield all([
        call(tellActive, config),
        call(tellPaused, config, parseInt(globalState.numPaused, 10)),
        call(tellCompleted, config, parseInt(globalState.numCompleted, 10))
      ])

      const downloadList = {
        ...formatData(response[0].data.result),
        ...formatData(response[1].data.result),
        ...formatData(response[2].data.result)
      }

      yield put({ type: 'FETCH_LIST_SUCCESS', payload: downloadList })
    } catch (error) {
      console.error('fetch list error', error)
      yield put({ type: 'FETCH_FAILD' })
    }
  }
}

export function* addDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    switch (action.type) {
      case 'ADD_URI':
        const url = action.payload
        yield call(addUri, config, url)
        break
      case 'ADD_TORRENT':
        const torrent = action.payload
        yield call(addTorrent, config, torrent)
        break
      default:
        break
    }
  } catch (error) {
    console.error('add download error', error)
    yield put({ type: 'ADD_DOWNLOAD_FAILD' })
  }
}

export function* removeDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    const gid = action.payload
    yield call(remove, config, gid)
    yield call(removeDownloadResult, config, gid)
  } catch (error) {
    console.error("remove error", error)
    yield put({ type: 'REMOVE_DOWNLOAD_FAILD' })
  }
}

export function* purgeDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    const gid = action.payload
    yield call(removeDownloadResult, config, gid)
  } catch (error) {
    console.error("purge error", error)
    yield put({ type: 'PURGE_DOWNLOAD_FAILD' })
  }
}

export function* startDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    switch (action.type) {
      case 'START_ALL':
        yield call(startAll, config)
        break
      case 'START':
        const gid = action.payload
        yield call(start, config, gid)
        break
      default:
        break
    }
  } catch (error) {
    console.error('start error', error)
    yield put({ type: 'START_DOWNLOAD_FAILD' })
  }
}

export function* pauseDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    switch (action.type) {
      case 'PAUSE_ALL':
        yield call(pauseAll, config)
        break
      case 'PAUSE':
        const gid = action.payload
        yield call(pause, config, gid)
        break
      default:
        break
    }
  } catch (error) {
    console.error('pause download error', error)
    yield put({ type: 'PAUSE_DOWNLOAD_FAILD' })
  }
}

export function* deselectFile(action) {
  try {
    const config = yield select(getConfigFromState)
    const { gid, index } = action.payload
    yield call(changeOption, config, gid, { 'select-file': index })
  } catch (error) {
    console.error('deselectFile error', error)
    yield put({ type: 'DESELECT_FILE_FAILD' })
  }
}