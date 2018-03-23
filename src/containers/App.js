import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
  return {ui: state.ui}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUI: (ui) => dispatch({ type: 'UPDATE_UI', payload: ui })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)