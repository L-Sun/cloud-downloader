import { connect } from 'react-redux'
import DownloadList from '../components/DownloadList'

const mapStateToProps = (state) => ({
  ui: state.ui.filiter,
  downloadList: state.downloadList
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateUI: (ui) => dispatch({type: 'UPDATE_UI', payload: ui}),
  updateDownload: () => dispatch({type: 'UPDATE_DOWNLOAD'})
})

export default connect(mapStateToProps, mapDispatchToProps)(DownloadList)