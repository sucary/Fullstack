import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id) // search for a specific note object we wan to change

      // Create a note object, the copy of the previous one, where the importance is changed
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }

      // Create a new state, where the target note is replaced
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
}

export default noteReducer;