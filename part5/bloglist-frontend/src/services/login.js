import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    try {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    } catch (error) {
        if (error.response) {
            throw new Error('Wrong username or password')
    }
    }
}

export default { login }