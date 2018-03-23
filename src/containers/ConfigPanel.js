import { connect } from 'react-redux'
import ConfigPanel from '../components/ConfigPanel';

const mapStateToProps = (state, ownProps) => {
    return {
        open: state.ui.isConfigPanelOpened,
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateUI: (ui) => dispatch({type: 'UPDATE_UI', payload: ui}),
        setConfig: (config) => dispatch({type: 'SET_CONFIG', payload: config})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel)
