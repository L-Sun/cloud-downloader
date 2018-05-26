import { connect } from 'react-redux'
import DownloadList from '../components/DownloadList'

const mapStateToProps = (state) => ({
  ui: state.ui.filiter,
  downloadList: state.downloadList,
  total_tasks: state.globalState.numActive
    + state.globalState.numPaused
    + state.globalState.numCompleted
})

const mapDispatchToProps = (dispatch) => ({
  updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui }),
  remove: (gid) => dispatch({ type: 'REMOVE_DOWNLOAD', payload: gid }),
  start: (gid) => dispatch({ type: 'START', payload: gid }),
  startAll: () => dispatch({ type: 'START_ALL' }),
  pause: (gid) => dispatch({ type: 'PAUSE', payload: gid }),
  pauseAll: () => dispatch({ type: 'PAUSE_ALL' })
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList)