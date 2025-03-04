import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'

ReactDOM.createRoot(document.getElementById("root")).render(<App />)

axios
  .get('http://localhost:3001/api/persons')
  .then(response => {
    const persons = response.data
    console.log(persons)
  })