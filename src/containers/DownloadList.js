import { connect } from 'react-redux'
import DownloadList from '../components/DownloadList'

const mapStateToProps = (state) => ({
  isMobile: state.ui.isMobile,
  downloadList: state.downloadList,
  total_tasks: state.globalState.numActive
    + state.globalState.numPaused
    + state.globalState.numCompleted
})

const mapDispatchToProps = (dispatch) => ({
  updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui }),
  remove: (gid) => dispatch({ type: 'REMOVE_DOWNLOAD', payload: gid }),
  purge: (gid) => dispatch({ type: 'PURGE_DOWNLOAD', payload: gid }),
  start: (gid) => dispatch({ type: 'START', payload: gid }),
  startAll: () => dispatch({ type: 'START_ALL' }),
  pause: (gid) => dispatch({ type: 'PAUSE', payload: gid }),
  pauseAll: () => dispatch({ type: 'PAUSE_ALL' }),
  deselectFile: (gid, index) => dispatch({ type: 'DESELECT_FILE', payload: { gid, index } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList)