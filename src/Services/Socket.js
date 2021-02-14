import axios from 'axios'
const baseUrl = '/api/sockets'

const updateState = async (employeeState) => {
    const response = await axios.put(`${baseUrl}/employeeState`, employeeState)
    return response.data
}

const addRoomMessage = async (content) => {
    const response = await axios.post(`${baseUrl}/roomMessage`, content)
    return response.data
}

const sendSignal = async (employeeId, signal) => {
    const response = await axios.post(`${baseUrl}/sendSignal`, { employeeId, signal })
    return response.data
}

const returnSignal = async (employeeId, signal) => {
    const response = await axios.post(`${baseUrl}/returnSignal`, { employeeId, signal })
    return response.data
}

const services = { updateState, addRoomMessage, sendSignal, returnSignal }
export default services