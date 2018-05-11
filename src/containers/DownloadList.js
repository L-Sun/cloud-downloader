import { connect } from 'react-redux'
import DownloadList from '../components/DownloadList'

const mapStateToProps = (state) => ({
  ui: state.ui.filiter,
  downloadList: state.downloadList
})

const mapDispatchToProps = (dispatch) => ({
  updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui }),
  startAll: () => dispatch({ type: 'START_ALL' }),
  pause: (gid) => dispatch({ type: 'PAUSE', payload: gid }),
  pauseAll: () => dispatch({ type: 'PAUSE_ALL' })
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList)