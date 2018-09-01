import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  addIcon: {
    positon: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
  dialogContent: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minWidth: 500
  },
  inputUpload: {
    display: 'none'
  },
  uploadTorrent: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})



class AddDownload extends Component {
  state = {
    url: '',
    torrent: null
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    updateUI: PropTypes.func.isRequired,
    addUri: PropTypes.func.isRequired,
    addTorrent: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  handleTorrent = (e) => {
    const torrent = e.target.files[0]
    this.setState({ torrentName: torrent.name })
    const reader = new FileReader()
    reader.readAsBinaryString(torrent)
    reader.onload = () => this.setState({ torrent: btoa(reader.result) })
  }

  handleCancel = () => {
    this.setState({ torrent: null, inputError: false, url: '' })
    this.props.updateUI({ isAddDownloadOpened: false })
  }
  handleOk = () => {
    if (this.state.url.length !== 0 || this.state.torrent !== null) {
      this.props.updateUI({ isAddDownloadOpened: false })
      this.state.url.length > 0 && this.props.addUri(this.state.url)
      this.state.torrent !== null && this.props.addTorrent(this.state.torrent)
    } else {
      this.setState({ inputError: true })
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
            error={this.state.inputError}
            id="url"
            label="下载链接"
            margin="normal"
            fullWidth={true}
            className={classes.inputLink}
            placeholder="Http(s) / 磁力链接"
            onChange={e => this.setState({ url: e.target.value, linkInput: false })}
          />
          <input
            className={classes.inputUpload}
            type="file"
            accept=".torrent"
            name="updload-torrent"
            id="upload-input"
            onChange={this.handleTorrent}
          />
          <label htmlFor="upload-input" className={classes.uploadTorrent}>
            <Typography variant="body1" color={this.state.inputError ? "error" : "default"}>
              {this.state.torrent ? this.state.torrentName : '未选择文件'}
            </Typography>
            <Button variant='raised' component="span">
              上传种子
            </Button>
          </label>
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
