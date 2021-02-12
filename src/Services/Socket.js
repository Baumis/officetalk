import axios from 'axios'
const baseUrl = '/api/sockets'

const updateState = async (employeeState) => {
    const response = await axios.put(`${baseUrl}/employeeState`, employeeState)
    return response.data
}

const addRoomMessage = async (content) => {
    const response = await axios.put(`${baseUrl}/roomMessage`, content)
    return response.data
}

const startCall = async (data) => {
    const response = await axios.post(`${baseUrl}/startCall`, data)
    return response.data
}

const services = { updateState, addRoomMessage, startCall }
export default services