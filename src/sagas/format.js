const formatProgress = (x, y) => {
  if (y === '0') {
    return 0
  }
  return parseFloat((parseFloat(x) / parseFloat(y) * 100).toFixed(2))
}

const formatSize = (size, type="size") => {
  const index = Math.floor((size.length - 1) / 3)
  const value = (parseInt(size, 10) / 1000 ** index).toFixed(2)
  if (type==="size") {
    return value.toString() + ['B', 'KB', 'MB', 'GB'][index]
  } else if(type==="speed") {
    return value.toString() + ['B/s', 'KB/s', 'MB/s', 'GB/s'][index]
  }
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