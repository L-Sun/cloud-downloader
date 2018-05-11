import { connect } from 'react-redux'
import AddDownload from '../components/AddDownload'

const mapStateToProps = (state) => ({
  open: state.ui.isAddDownloadOpened
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui }),
  addUri: (uri) => dispatch({ type: 'ADD_URI', payload: uri }),
  addTorrent: (torrent) => dispatch({ type: 'ADD_TORRENT', payload: torrent })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDownload)