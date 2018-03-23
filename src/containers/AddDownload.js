import { connect } from 'react-redux'
import AddDownload from '../components/AddDownload'

const mapStateToProps = (state) => ({
  open: state.ui.isAddDownloadOpened
})

const mapDispatchToProps = (dispatch, ownProps) => ({
      updateUI: (ui) => dispatch({type: 'UPDATE_UI', payload: ui}),
      addDownload: (url) => dispatch({type: 'ADD_DOWNLOAD', payload: url})
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDownload)