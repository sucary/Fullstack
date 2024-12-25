import { useSelector, useDispatch } from 'react-redux'

const AnecditeList = () => {

    // React hook
    const anecdotes = useSelector(state => 
        [...state].sort((a, b) => (b.votes - a.votes))
    )

    // React hook
    const dispatch = useDispatch()

    const voteForAnecdote = (id) => {
        console.log('vote', id)
    
        return({
            type: 'VOTE',
            payload: { id }
        })
    }

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteForAnecdote(id))
      }
    
    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}

        </div>
    )
}

export default AnecditeList