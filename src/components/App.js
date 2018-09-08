import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

import DownloadList from '../containers/DownloadList'
import ConfigPanel from '../containers/ConfigPanel'
import AddDownload from '../containers/AddDownload'
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80b4ff',
      main: '#4285f4',
      dark: '#0059c1',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff725c',
      main: '#d23f31',
      dark: '#9a0009',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5'
    }
  },
})

const styles = theme => ({
  root: {
    height: '100%',
    background: '#f5f5f5'
  },
  flex: {
    flexGrow: 1,
  },
  addIcon: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
})

class App extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    updateUI: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  handleResize = () => {
    const width = 600
    const { updateUI } = this.props
    if (window.innerWidth <= width) {
      updateUI({ isMobile: true })
    } else {
      updateUI({ isMobile: false })
    }
    
  }

  handleAddDownload = () => {
    this.props.updateUI({ isAddDownloadOpened: true })
  }

  handleConfig = () => {
    this.props.updateUI({ isConfigPanelOpened: true })
  }
  

  componentDidMount = () => {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    window.releaseEvents('resize', this.handleResize)
  }

  render() {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Could Downloader
              </Typography>
              <IconButton
                color="inherit"
                onClick={this.handleConfig}
              >
                <SettingsIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.mixinsBar} />
          <DownloadList />
          <ConfigPanel />
          <AddDownload />
          <Tooltip title="新建下载">
            <Button
              variant="fab"
              color="secondary"
              className={classes.addIcon}
              onClick={this.handleAddDownload}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App)