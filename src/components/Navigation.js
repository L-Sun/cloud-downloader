import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import DoneIcon from '@material-ui/icons/Done'

const styles = theme => ({
  drawerPaper: {
    width: 240,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: theme.palette.background.default,
    border: 'none',
    zIndex: theme.zIndex.appBar - 1,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 7,
    },
  },
  mixinsBar: {
    marginTop: 8,
    ...theme.mixins.toolbar
  }
})

class Navigation extends Component {

  static propTypes = {
    ui: PropTypes.object.isRequired,
    updateUI: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  openConfigPanel = () => {
    this.props.updateUI({ isConfigPanelOpened: true })
  }


  render() {
    const { ui, classes } = this.props
    return (
      <Drawer
        open={ui.isNavOpened}
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !ui.isNavOpened && classes.drawerPaperClose),
        }}
      >
        <div className={classes.mixinsBar} />
        <List component="nav">
          <ListItem button divider>
            <ListItemIcon>
              <DoneIcon />
            </ListItemIcon>
            <ListItemText primary="已完成" />
          </ListItem>
          <ListItem button onClick={this.openConfigPanel}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="设置" />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Navigation)