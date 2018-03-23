import { combineReducers } from 'redux'
import config from './config'
import downloadList from './downloadList'
import ui from './ui'

const rootReducer = combineReducers({
    ui,
    config,
    downloadList
})

export default rootReducer