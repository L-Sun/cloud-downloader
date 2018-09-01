const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LIST_SUCCESS':
      return { ...action.payload }

    default:
      return state
  }
}