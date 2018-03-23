import { call, put, fork, select } from 'redux-saga/effects'
import { getDownloadList, addUri } from './apiCalls'
import { formatData } from './format'

const getConfigFromState = state => state.config

export function* loadDownloadList() {
    try {
        const config = yield select(getConfigFromState)

        const response = yield call(getDownloadList, config)
        const downloadList = formatData(response.data.result)
        
        yield put({type: 'FETCH_LIST_SUCCESS', payload: downloadList})
    } catch (error) {
        yield put({type: 'FETCH_FAILD'})
    }
}

export function* addDownload(action) {
    console.log('add Download saga')
    try {
        const config = yield select(getConfigFromState)
        const url = action.payload

        yield fork(addUri, url, config)
    } catch (error) {
        console.error(error)
    }
}