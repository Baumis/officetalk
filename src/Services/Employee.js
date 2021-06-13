import axios from 'axios'
const baseUrl = '/api/employees'

const updateEmployee = async (employee) => {
    const response = await axios.put(`${baseUrl}/${employee._id}`, employee)
    return response.data
}

const createEmployee = async (id, employee) => {
    const response = await axios.post(`${baseUrl}/`, employee)
    return response.data
}

const services = { updateEmployee, createEmployee }
export default services