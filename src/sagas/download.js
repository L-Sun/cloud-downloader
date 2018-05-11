import { all, call, put, fork, select } from 'redux-saga/effects'
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
  pause
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
        active: formatData(response[0].data.result),
        paused: formatData(response[1].data.result),
        completed: formatData(response[2].data.result)
      }

      yield put({ type: 'FETCH_LIST_SUCCESS', payload: downloadList })
    } catch (error) {
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
        yield fork(addUri, config, url)
        break
      case 'ADD_TORRENT':
        const torrent = action.payload
        yield fork(addTorrent, config, torrent)
        break
      default:
        break
    }
  } catch (error) {
    console.error(error)
  }
}

export function* startDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    switch (action.type) {
      case 'START_ALL':
        yield fork(startAll, config)
        break
      case 'START':
        yield fork(start, config)
        break
      default:
        break
    }
  } catch (error) {
    console.error(error)
  }
}

export function* pauseDownload(action) {
  try {
    const config = yield select(getConfigFromState)
    switch (action.type) {
      case 'PAUSE_ALL':
        yield fork(pauseAll, config)
        break
      case 'PAUSE':
        const gid = action.payload
        yield fork(pause, config, gid)
        break
      default:
        break
    }
  } catch (error) {
    console.error(error)
  }
}