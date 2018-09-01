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
    files: formatFiles(task.files),
    connections: task.connections,
    status: task.status,
  }

  if ('bittorrent' in task) {
    if ('info' in task.bittorrent) {
      result['name'] = task.bittorrent.info.name
    } else {
      result['name'] = 'loading...'
    }
    return result
  }

  if (task.files.length === 1) {
    result['name'] = task.files[0].path.split('/').pop()
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
  selected: file.selected === 'true' ? true : false,
  uri: file.uri
}))

export const formatData = (data) => {
  let result = {}
  data.map(task => result[task.gid] = formatTask(task))
  return result
}

export const formateState = (data) => {
  data['downloadSpeed'] = formatSize(data['downloadSpeed'], 'speed')
  data['uploadSpeed'] = formatSize(data['uploadSpeed'], 'speed')
  data['numActive'] = parseInt(data['numActive'], 10)
  data['numPaused'] = parseInt(data['numWaiting'], 10)
  data['numCompleted'] = parseInt(data['numStopped'], 10)
  data['numStoppedTotal'] = parseInt(data['numStoppedTotal'], 10)
  delete data['numWaiting']
  delete data['numStopped']
  return data
}
