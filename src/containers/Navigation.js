import { connect } from 'react-redux'
import Navigation from '../components/Navigation'

const mapStateToProps = (state, ownProps) => {
  return {
    ui: state.ui
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)