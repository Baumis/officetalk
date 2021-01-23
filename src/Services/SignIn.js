import axios from 'axios'
const baseUrl = '/api/signin'

const signInWithToken = async () => {
    const response = await axios.post(baseUrl)
    return response.data
}

const signInEmployee = async (credentials) => {
    const response = await axios.post(`${baseUrl}/employee`, credentials)
    return response.data
}

const signInOrganization = async (credentials) => {
    const response = await axios.post(`${baseUrl}/organization`, credentials)
    return response.data
}

export default { signInWithToken, signInEmployee, signInOrganization }