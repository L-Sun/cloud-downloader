import axios from 'axios'

let reqConfig = {
  id: '',
  jsonrpc: '2.0',
}

const formatConfig = (config) => {
  return {
    url: 'http://' + config.host + ':' + config.port + '/jsonrpc',
    secret: config.secret
  }
}

export const getDownloadList = (config = {}) => {
  console.log('loading download list')

  config = formatConfig(config)
  let jsonreq = {
    ...reqConfig,
    method: 'aria2.tellActive'
  }

  return new Promise((resolve, reject) => {
    axios.post(config.url, jsonreq).then(
      response => resolve(response)
    ).catch(
      error => reject(error)
    )
  })
}

export const addUri = (url, config) => {
  console.log('add a new download')
  
  config = formatConfig(config)
  let jsonreq = JSON.stringify({
    ...reqConfig,
    method: 'aria2.addUri',
    params: [[url], { 'split': '16', 'max-connection-per-server': '16' }]
  })

  return new Promise((resolve, reject) => {
    axios.post(config.url, jsonreq).then(
      response => resolve(response)
    ).catch(
      error => reject(error)
    )
  })
}

