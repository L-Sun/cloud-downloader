import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = () => ({
  dialogContent: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300
  }
})


class ConfigPanel extends Component {
  state = {
    showPassword: false,
    ...this.props.config
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    updateUI: PropTypes.func.isRequired,
    config: PropTypes.object,
    setConfig: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  handleCancel = () => {
    this.props.updateUI({ isConfigPanelOpened: false })
  }

  handleOk = () => {
    const config = {
      host: this.state.host,
      port: this.state.port,
      secret: this.state.secret
    }
    this.props.updateUI({ isConfigPanelOpened: false })
    for (const key in config) {
      localStorage.setItem(key, config[key])
    }
    this.props.setConfig(config)
  }


  render() {
    const { open, classes } = this.props
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="config-dialog-title"
        open={open}
      >
        <DialogTitle>Config</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            required
            id="host"
            label="Host"
            type="text"
            margin="normal"
            fullWidth
            onChange={(event) => this.setState({ host: event.target.value })}
            value={this.state.host}
          />
          <TextField
            required
            id="port"
            label="Port"
            type="number"
            margin="normal"
            fullWidth
            onChange={(event) => this.setState({ port: event.target.value })}
            value={this.state.port}
          />
          <TextField
            required
            id="secret"
            label="Secret"
            type={this.state.showPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            onChange={(event) => this.setState({ secret: event.target.value })}
            value={this.state.secret}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ConfigPanel)