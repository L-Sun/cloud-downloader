import axios from 'axios'

const formatConfig = (config, method, ...params) => ({
  address: 'http://' + config.host + ':' + config.port + '/jsonrpc',
  req_payload: {
    id: '1',
    jsonrpc: '2.0',
    method: 'aria2.' + method,
    params: ['token:' + config.secret, ...params]
  }
})

const post = (address, req_payload) => {
  return new Promise((resolve, reject) => {
    axios.post(address, req_payload).then(
      response => resolve(response)
    ).catch(
      error => reject(error)
    )
  })
}

export const getGlobalStat = (config) => {
  const { address, req_payload } = formatConfig(config, 'getGlobalStat')

  return post(address, req_payload)
}

export const tellActive = (config) => {
  const { address, req_payload } = formatConfig(config, 'tellActive')

  return post(address, req_payload)
}
export const tellPaused = (config, num = 0) => {
  const { address, req_payload } = formatConfig(config, 'tellWaiting', 0, num)

  return post(address, req_payload)
}
export const tellCompleted = (config, num = 0) => {
  const { address, req_payload } = formatConfig(config, 'tellStopped', 0, num)

  return post(address, req_payload)
}

export const addUri = (config, uri) => {
  const params = [[uri], { 'split': '16', 'max-connection-per-server': '16' }]
  const { address, req_payload } = formatConfig(config, 'addUri', ...params)

  return post(address, req_payload)
}

export const addTorrent = (config, torrent) => {
  const { address, req_payload } = formatConfig(config, 'addTorrent', torrent)

  return post(address, req_payload)
}

export const startAll = (config) => {
  const { address, req_payload } = formatConfig(config, 'unpauseAll')

  return post(address, req_payload)
}

export const start = (config, gid) => {
  const { address, req_payload } = formatConfig(config, 'unpause', gid)

  return post(address, req_payload)
}

export const pauseAll = (config) => {
  const { address, req_payload } = formatConfig(config, 'pauseAll')

  return post(address, req_payload)
}

export const pause = (config, gid) => {
  const { address, req_payload } = formatConfig(config, 'upause', gid)

  return post(address, req_payload)
}

