import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel'
import { LinearProgress } from 'material-ui/Progress'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import PlayArrowIcon from 'material-ui-icons/PlayArrow'
import PauseIcon from 'material-ui-icons/Pause'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '70%',
    margin: 12,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  fileInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  linearProgress: {
    width: '100%',
    alignSelf: 'flex-end',
  },
  speed: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 100
  },
  speedIcon: {
    display: 'inline-block',
    width: 16,
    height: 20,
    verticalAlign: 'middle'
  },
  active: {
    background: '#4285f4'
  },
  active_: {
    background: '#80b4ff'
  },
  paused: {
    background: '#757575'
  },
  paused_: {
    background: '#a4a4a4'
  },
  completed: {
    background: '#4caf50'
  },
  completed_: {
    background: '#e53935'
  }
})

const downloadItem = (item, index, classes, state = 'active') => {
  return (
    <ExpansionPanel key={index}>
      <ExpansionPanelSummary className={classes.grid}>
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <div className={classes.fileInfo}>
          <div>
            <Typography className={classes.heading}>{item.name}</Typography>
            <Typography className={classes.secondaryHeading}>{item.completedSize} / {item.totalSize} ({item.progress}%)</Typography>
          </div>
          <div>
            <div className={classes.speed}>
              <ArrowUpwardIcon style={{ color: 'green' }} className={classes.speedIcon} />
              <Typography>{item.uploadSpeed}</Typography>
            </div>
            <div className={classes.speed}>
              <ArrowDownwardIcon style={{ color: 'red' }} className={classes.speedIcon} />
              <Typography>{item.downloadSpeed}</Typography>
            </div>
          </div>
          <LinearProgress
            className={classes.linearProgress}
            classes={{
              barColorPrimary: classes[state],
              colorPrimary: classes[state + '_']
            }}
            variant="determinate"
            value={item.progress}
          />
        </div>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
}


class DownloadList extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    downloadList: PropTypes.object.isRequired,
    startAll: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    pauseAll: PropTypes.func.isRequired,
  }

  handleStart = () => {
    this.props.startAll()
  }


  handlePause = () => {
    this.props.pauseAll()
  }


  render() {
    const { downloadList, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit" elevation={1}>
          <Toolbar>
            <Checkbox onClick={(e) => e.stopPropagation()} />
            <IconButton onClick={this.handleStart}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton onClick={this.handlePause}>
              <PauseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {downloadList.active.map((item, index) => downloadItem(item, index, classes, 'active'))}
        {downloadList.paused.map((item, index) => downloadItem(item, index, classes, 'paused'))}
        {downloadList.completed.map((item, index) => downloadItem(item, index, classes, 'completed'))}
      </div>
    )
  }
}

export default withStyles(styles)(DownloadList)