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
    const response = await axios.put(`${baseUrl}/startCall`, data)
    return response.data
}

export default { updateState, addRoomMessage, startCall }