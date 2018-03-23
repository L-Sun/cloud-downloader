import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import { LinearProgress } from 'material-ui/Progress'
import Checkbox from 'material-ui/Checkbox'


const styles = theme => ({
  root: {
    maxWidth: '70%',
    margin: 12,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

const downloadItem = (item, index) => (
  <TableRow hover={true} key={index}>
    <TableCell padding="checkbox">
      <Checkbox />
    </TableCell>
    <TableCell>{item.name}</TableCell>
    <TableCell>{item.completedSize + ' / ' +item.totalSize}</TableCell>
    <TableCell>
      <LinearProgress variant="determinate" value={item.progress} />
      {item.progress + '%'}
    </TableCell>
    <TableCell>{item.downloadSpeed}</TableCell>
  </TableRow>
)

class DownloadList extends Component {

  static propTypes = {
    file: PropTypes.object,
  }

  componentDidMount = () => {
    this.updateDownload = setInterval(() => {
      this.props.updateDownload()
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.updateDownload)
  }

  render() {
    const { downloadList, classes } = this.props
    return (
      <Paper className={classes.root} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>文件名</TableCell>
              <TableCell>大小</TableCell>
              <TableCell>进度</TableCell>
              <TableCell>速度</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {downloadList.map((item, index) =>
              downloadItem(item, index)
            )}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(DownloadList)