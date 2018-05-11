const formatProgress = (x, y) => {
  if (y === '0') {
    return 0
  }
  return parseFloat((parseFloat(x) / parseFloat(y) * 100).toFixed(2))
}

const formatSize = (size, type = "size") => {
  const index = Math.floor((size.length - 1) / 3)
  const value = (parseInt(size, 10) / 1000 ** index).toFixed(2)
  if (type === "size") {
    return value + ['B', 'KB', 'MB', 'GB'][index]
  } else if (type === "speed") {
    return value + ['B/s', 'KB/s', 'MB/s', 'GB/s'][index]
  }
}

const formatTime = (completedLength, totalLength, speed) => {
  let hr = 0, min = 0, sec = 0
  const remaningLength = parseInt(totalLength, 10) - parseInt(completedLength, 10)
  sec = parseInt(remaningLength / parseInt(speed, 10), 10)
  if (sec > 60) {
    min = parseInt(sec / 60, 10)
    sec = parseInt(sec % 60, 10)
    if (min > 60) {
      hr = parseInt(min / 60, 10)
      min = parseInt(min % 60, 10)
    }
  }
  hr < 10 && (hr = '0' + hr)
  min < 10 && (min = '0' + min)
  sec < 10 && (sec = '0' + sec)
  return hr + ':' + min + ':' + sec
}

const formatTask = (task) => {
  let result = {
    gid: task.gid,
    dir: task.dir,
    totalSize: formatSize(task.totalLength, "size"),
    completedSize: formatSize(task.completedLength, "size"),
    progress: formatProgress(task.completedLength, task.totalLength),
    uploadSpeed: formatSize(task.uploadSpeed, "speed"),
    downloadSpeed: formatSize(task.downloadSpeed, "speed"),
    remainingTime: formatTime(task.completedLength, task.totalLength, task.downloadSpeed),
    files: formatFiles(task.files)
  }

  if (task.files.length === 1) {
    result['name'] = task.files[0].path.split('/').pop()
  }

  if ('bittorrent' in task) {
    result['name'] = task.bittorrent.info.name
  }

  return result
}

const formatFiles = files => files.map(file => ({
  index: file.index,
  path: file.path,
  name: file.path.split('/').pop(),
  totalSize: formatSize(file.length, "size"),
  completedSize: formatSize(file.completedLength, "size"),
  progress: formatProgress(file.completedLength, file.length),
  selected: file.selected,
  uri: file.uri
}))

export const formatData = (data) => {
  return data.map(task => formatTask(task))
}

export const formateState = (data) => {
  data['numPaused'] = data['numWaiting']
  data['numCompleted'] = data['numStopped']
  delete data['numWaiting']
  delete data['numStopped']
  return data
}
