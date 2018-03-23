export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_LIST_SUCCESS':
      return [ ...action.payload ]

    default:
      return state
  }
}