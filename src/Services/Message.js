import axios from 'axios'
const baseUrl = '/api/messages'

const sendOfficeMessage = async (content) => {
    const response = await axios.post(`${baseUrl}`, content)
    return response.data
}

export default { sendOfficeMessage }