import getId from '../reducers/anecdoteReducer'
import useDispatch from 'react-redux'

// Action creator
const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      id: getId(),
      content,
      votes: 0
    }
  }
}

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnencdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }
  
  return (    
    <div>  
      <h2>create new</h2>
      <form onSubmit = {addAnencdote}>
        <div><input name = "anecdote" /></div>
        <button type = "submit">create</button>
      </form>
    </div>)
  }

export default AnecdoteForm