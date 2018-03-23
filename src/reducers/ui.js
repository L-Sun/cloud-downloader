const initialState = {
  isNavOpened: true,
  isConfigPanelOpened: false,
  isAddDownloadOpened: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case 'UPDATE_UI':
    return { ...state, ...action.payload }

  default:
    return state
  }
}
