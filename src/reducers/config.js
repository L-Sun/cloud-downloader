const initialState = {
  host: 'localhost',
  port: '6800'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...state, ...action.payload }

    default:
      return state
  }
}