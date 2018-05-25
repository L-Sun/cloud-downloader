import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import PauseIcon from 'material-ui-icons/Pause'
import DeleteIcon from 'material-ui-icons/Delete'
import DownloadItem from './DownloadItem.js'


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '70%',
    margin: 12,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  list: {
    marginTop: 24,
    marginBottom: 24,
  },
})

class DownloadList extends Component {

  state = {
    selected: [],
    showList: ['active', 'paused', 'completed']
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    downloadList: PropTypes.object.isRequired,
    total_tasks: PropTypes.number.isRequired,
    remove: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    startAll: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    pauseAll: PropTypes.func.isRequired,
  }

  handleRemove = () => {
    this.state.selected.map(gid => this.props.remove(gid))
  }

  handleStart = () => {
    if (this.state.selected.length === 0) {
      this.props.startAll()
    } else {
      this.state.selected.map(gid => {
        if (this.props.downloadList['paused'].hasOwnProperty(gid)) {
          this.props.start(gid)
        }
      })
    }
  }


  handlePause = () => {
    if (this.state.selected.length === 0) {
      this.props.pauseAll()
    } else {
      this.state.selected.map(gid => {
        if (this.props.downloadList['active'].hasOwnProperty(gid)) {
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
      let newSelected = []
      this.state.showList.map(key =>
        newSelected = [...newSelected, ...Object.keys(downloadList[key])]
      )
      this.setState({ selected: newSelected })
    } else {
      this.setState({ selected: [] })
    }
  }

  render() {
    const { downloadList, total_tasks, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar>
            <Checkbox
              checked={this.state.selected.length > 0}
              indeterminate={this.state.selected.length > 0 && this.state.selected.length < total_tasks}
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
          Object.keys(downloadList).map((key) => {
            if (this.state.showList.indexOf(key) !== -1) {
              return (
                Object.values(downloadList[key]).map(item => (
                  <DownloadItem key={item.gid}
                    info={item}
                    state={key}
                    isSelected={this.isSelected}
                    handleSelect={this.handleSelect}
                  />
                ))
              )
            }
            return null
          })
        }
      </div>
    )
  }
}

export default withStyles(styles)(DownloadList)