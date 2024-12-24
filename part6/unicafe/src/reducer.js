/*In the tests, make sure that the reducer is an immutable function with the deep-freeze library. 
Ensure that the provided first test passes, because Redux expects that the reducer returns the original state when it is called with a first parameter - which represents the previous state - with the value undefined.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality that they are testing.
*/

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        good: state.good + 1
      }
    case 'OK':
      return {
        ...state,
        ok: state.ok + 1
      }
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1
      }
    case 'RESET':
      return initialState

    default: return state
  }
  
}

export default counterReducer
