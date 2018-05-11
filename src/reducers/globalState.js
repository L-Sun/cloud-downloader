const initialState = {
  downloadSpeed: 0,
  uploadSpeed: 0,
  numActive: 0,
  numPaused: 0,
  numCompleted: 0,
  numStoppedTotal: 0
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_GLOBAL_STATE_SUCCESS':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
