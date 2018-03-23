import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'


const styles = theme => ({
  addIcon: {
    positon: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  dialogContent: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 500
  }
})



class AddDownload extends Component {
  state = {
    url: ''
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    updateUI: PropTypes.func.isRequired,
    addDownload: PropTypes.func.isRequired,
  }

  handleCancel = () => {
    this.props.updateUI({isAddDownloadOpened: false})
  }
  handleOk = () => {
    if (this.state.url.length !== 0) {
      this.props.updateUI({ isAddDownloadOpened: false })
      this.state.url.length > 0 && this.props.addDownload(this.state.url)
    } else {
      this.setState({ linkInput: true})
    }
  }

  render() {
    const { open, classes } = this.props
    return (
      <Dialog
        onClose={this.handleCancel}
        aria-labelledby="download-dialog"
        open={open}
      >
        <DialogTitle>添加下载</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            error={this.state.linkInput}
            id="url"
            label="下载链接"
            margin="normal"
            fullWidth
            placeholder="Http(s) / 磁力链接"
            onChange={(event) => this.setState({url: event.target.value, linkInput: false})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">取消</Button>
          <Button onClick={this.handleOk} color="primary">添加</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(AddDownload)
