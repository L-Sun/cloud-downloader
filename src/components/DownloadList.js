import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import DeleteIcon from '@material-ui/icons/Delete'
import DownloadItem from './DownloadItem.js'

const root = {
  flexGrow: 1,
  margin: 12,
  marginLeft: 'auto',
  marginRight: 'auto'
}

const styles = () => ({
  root: {
    ...root,
    maxWidth: '70%'
  },
  narrow_row: {
    ...root,
    width: '100%'
  },
  toolbar: {
    padding: '0 24px 0 24px'
  },
  list: {
    marginTop: 24,
    marginBottom: 24,
  },
})

class DownloadList extends Component {

  state = {
    selected: [],
    expanded: '',
  }

  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    downloadList: PropTypes.object.isRequired,
    total_tasks: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired,
    purge: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    startAll: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    pauseAll: PropTypes.func.isRequired,
    deselectFile: PropTypes.func.isRequired,
  }

  handleExpand = gid => {
    const is_expanded = this.state.expanded === gid
    this.setState({ expanded: is_expanded ? '' : gid })

  }

  handleRemove = () => {
    this.state.selected.forEach(gid => {
      let status = this.props.downloadList[gid].status
      if (status === 'active' || status === 'paused') {
        this.props.remove(gid)
      } else {
        this.props.purge(gid)
      }
    })
  }

  handleStart = () => {
    if (this.state.selected.length === 0) {
      this.props.startAll()
    } else {
      this.state.selected.forEach(gid => {
        if (this.props.downloadList[gid].status === 'paused') {
          this.props.start(gid)
        }
      })
    }
  }


  handlePause = () => {
    if (this.state.selected.length === 0) {
      this.props.pauseAll()
    } else {
      this.state.selected.forEach(gid => {
        if (this.props.downloadList[gid].status === 'active') {
          this.props.pause(gid)
        }
      })
    }
  }

  isSelected = (gid) => this.state.selected.indexOf(gid) !== -1

  handleSelect = (gid) => {
    const { selected } = this.state
    const gidIndex = selected.indexOf(gid)
    if (gidIndex === -1) {
      this.setState({ selected: [gid, ...this.state.selected] })
    } else {
      const newSelected = [...selected.slice(0, gidIndex), ...selected.slice(gidIndex + 1)]
      this.setState({ selected: newSelected })
    }
  }

  handleSelectAll = (event, checked) => {
    const { downloadList } = this.props
    if (checked) {
      this.setState({ selected: Object.keys(downloadList) })
    } else {
      this.setState({ selected: [] })
    }
  }

  render() {
    const { isMobile, downloadList, total_tasks, deselectFile, classes } = this.props
    const { selected, expanded } = this.state
    return (
      <div className={isMobile? classes.narrow_root:classes.root}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar className={classes.toolbar} disableGutters={true}>
            <Checkbox
              checked={selected.length > 0}
              indeterminate={selected.length > 0 && selected.length < total_tasks}
              onChange={(e, c) => {
                this.handleSelectAll(e, c)
              }}
            />
            <IconButton onClick={this.handleStart}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton onClick={this.handlePause}>
              <PauseIcon />
            </IconButton>
            <IconButton onClick={this.handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {
          Object.keys(downloadList).map(gid => (
            <DownloadItem key={gid}
              info={downloadList[gid]}
              expanded={expanded}
              isSelected={this.isSelected}
              handleFileDeselect={deselectFile}
              handleSelect={this.handleSelect}
              handleExpand={this.handleExpand}
            />
          ))
        }
      </div>
    )
  }
}

export default withStyles(styles)(DownloadList)