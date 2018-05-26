import { combineReducers } from 'redux'
import config from './config'
import downloadList from './downloadList'
import globalState from './globalState'
import ui from './ui'

const rootReducer = combineReducers({
    ui,
    config,
    downloadList,
    globalState
})

export default rootReducer