import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel'
import { LinearProgress } from 'material-ui/Progress'
import Checkbox from 'material-ui/Checkbox'
import Typography from 'material-ui/Typography'
import ArrowUpwardIcon from 'material-ui-icons/ArrowUpward'
import ArrowDownwardIcon from 'material-ui-icons/ArrowDownward'

const styles = theme => ({
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

class DownloadItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    isSelected: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
  }


  render() {
    const { classes, info, state, isSelected, handleSelect } = this.props
    return (
      <ExpansionPanel key={info.gid}>
        <ExpansionPanelSummary className={classes.grid}>
          <Checkbox
            checked={isSelected(info.gid)}
            onChange={() => handleSelect(info.gid)}
            onClick={e => e.stopPropagation()}
          />
          <div className={classes.fileInfo}>
            <div>
              <Typography className={classes.heading}>{info.name}</Typography>
              <Typography className={classes.secondaryHeading}>{info.completedSize} / {info.totalSize} ({info.progress}%)</Typography>
            </div>
            <div>
              <div className={classes.speed}>
                <ArrowUpwardIcon style={{ color: 'green' }} className={classes.speedIcon} />
                <Typography>{info.uploadSpeed}</Typography>
              </div>
              <div className={classes.speed}>
                <ArrowDownwardIcon style={{ color: 'red' }} className={classes.speedIcon} />
                <Typography>{info.downloadSpeed}</Typography>
              </div>
            </div>
            <LinearProgress
              className={classes.linearProgress}
              classes={{
                barColorPrimary: classes[state],
                colorPrimary: classes[state + '_']
              }}
              variant="determinate"
              value={info.progress}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          asdasd
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(DownloadItem)
