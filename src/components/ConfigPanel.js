import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import { InputAdornment } from 'material-ui/Input';

const styles = theme => ({
  dialogContent: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300
  }
})


class ConfigPanel extends Component {
  state = {
    showPassword: false,
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    updateUI: PropTypes.func.isRequired,
    config: PropTypes.object,
  }

  handleCancel = () => {
    this.props.updateUI({isConfigPanelOpened: false})
  }
  
  handleOk = () => {
    this.props.updateUI({ isConfigPanelOpened: false })
    this.props.setConfig({
      host: this.state.host,
      port: this.state.port,
      secret: this.state.secret
    })
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
            value={this.props.config.host}
          />
          <TextField
            required
            id="port"
            label="Port"
            type="number"
            margin="normal"
            fullWidth
            onChange={(event) => this.setState({ port: event.target.value })}
            value={this.props.config.port}
          />
          <TextField
            required
            id="secret"
            label="Secret"
            type={this.state.showPassword ? "text" : "password"}
            margin="normal"
            fullWidth
            onChange={(event) => this.setState({ secret: event.target.value })}
            value={this.props.config.secret}
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