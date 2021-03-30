import axios from 'axios'
const baseUrl = '/api/offices'

const createOffice = async () => {
    const response = await axios.post(`${baseUrl}`)
    return response.data
}

const services = { createOffice }
export default services