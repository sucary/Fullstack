const Filter = ({props}) => {
    const {filter, handleFilterChange} = props
  
    return (
      <div>
        <form>
          filter by name: <input 
          value = {filter}
          onChange = {handleFilterChange} />
      </form>
    </div>
    )
  }

  export default Filter