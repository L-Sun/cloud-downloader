import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import { withStyles } from "material-ui/styles"
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'

import Navigation from '../containers/Navigation'
import DownloadList from '../containers/DownloadList'
import ConfigPanel from '../containers/ConfigPanel'
import AddDownload from '../containers/AddDownload'

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
  mixinsBar: {
    ...theme.mixins.toolbar,
    width: '100%'
  },
  addIcon: {
    position: 'absolute',
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

  handleResize = (e) => {
    const width = 1300
    const { ui, updateUI } = this.props
    if (window.innerWidth <= width && ui.isNavOpened) {
      updateUI({ isNavOpened: false })
    }
    if (window.innerWidth >= width && !ui.isNavOpened) {
      updateUI({ isNavOpened: true })
    }
  }

  handleAddDownload = (e) => {
    this.props.updateUI({isAddDownloadOpened: true})
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
          <AppBar color="primary">
            <Toolbar className={classes.toolBar}>
              <Typography variant="title" color="inherit">
                Could Downloader
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.mixinsBar} />
          <Navigation />
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