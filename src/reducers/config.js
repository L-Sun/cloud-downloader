const initialState = {
  host: localStorage.getItem('host'),
  port: localStorage.getItem('port'),
  secret: localStorage.getItem('secret')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload }

    default:
      return state
  }
}