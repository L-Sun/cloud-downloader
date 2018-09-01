import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SwipeableViews from 'react-swipeable-views'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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
    width: 80
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
  },
  detials: {
    display: 'block',
    paddingLeft: '72px',
    paddingRight: '72px'
  }
})

class DownloadItem extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    expanded: PropTypes.string.isRequired,
    info: PropTypes.object.isRequired,
    isSelected: PropTypes.func.isRequired,
    handleFileDeselect: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handleExpand: PropTypes.func.isRequired,
  }

  state = {
    tab_value: 0,
    isFileSelected: this.props.info.files.map(file => file.selected)
  }

  handleTabChange = (event, value) => {
    this.setState({ tab_value: value })
  }

  handleFileDeselect = (gid, index) => {
    const { handleFileDeselect } = this.props
    let isFileSelected = this.state.isFileSelected
    isFileSelected[index - 1] = !isFileSelected[index - 1]
    this.setState({ isFileSelect: isFileSelected })

    let selected = ''
    isFileSelected.forEach((isSelected, i) => {
      if (isSelected) {
        selected += (i + 1) + ','
      }
    })
    selected = selected.slice(0, -1)
    handleFileDeselect(gid, selected)
    this.setState({ isFileSelect: isFileSelected })
  }

  render() {
    const { classes, info, isSelected, handleSelect, handleExpand, expanded } = this.props
    const { tab_value, isFileSelected } = this.state
    return (
      <ExpansionPanel expanded={expanded === info.gid} key={info.gid} onChange={() => handleExpand(info.gid)}>
        <ExpansionPanelSummary>
          <Checkbox
            checked={isSelected(info.gid)}
            onChange={() => handleSelect(info.gid)}
            onClick={e => e.stopPropagation()}
          />
          <div className={classes.fileInfo}>
            <section>
              <Typography className={classes.heading}>{info.name}</Typography>
              <Typography className={classes.secondaryHeading}>{info.completedSize} / {info.totalSize} ({info.remainingTime})</Typography>
            </section>
            <section>
              <span className={classes.speed}>
                <ArrowUpwardIcon style={{ color: 'green' }} className={classes.speedIcon} />
                <Typography>{info.uploadSpeed}</Typography>
              </span>
              <span className={classes.speed}>
                <ArrowDownwardIcon style={{ color: 'red' }} className={classes.speedIcon} />
                <Typography>{info.downloadSpeed}</Typography>
              </span>
            </section>
            <LinearProgress
              className={classes.linearProgress}
              classes={{
                barColorPrimary: classes[info.status],
                colorPrimary: classes[info.status + '_']
              }}
              variant="determinate"
              value={info.progress}
            />
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detials}>
          <Tabs value={tab_value} fullWidth={true} centered onChange={this.handleTabChange}>
            <Tab label="文件列表" />
            <Tab label="连接用户" />
          </Tabs>
          <SwipeableViews
            index={tab_value}
            onChangeIndex={index => this.setState({ tab_value: index })}
          >
            <section>
              <List className={classes.file_list} dense={true}>
                <ListSubheader>文件列表</ListSubheader>
                {info.files.map((file, index) => (
                  <ListItem key={index}>
                    <Checkbox
                      checked={isFileSelected[index]}
                      onClick={() => this.handleFileDeselect(info.gid, file.index)}
                    />
                    <ListItemText primary={file.name} />
                  </ListItem>
                ))}
              </List>
            </section>
            <section>
              
            </section>
          </SwipeableViews>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(DownloadItem)
