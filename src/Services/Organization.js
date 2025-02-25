import axios from 'axios'
const baseUrl = '/api/organizations'

const getOrganization = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const services = { getOrganization }
export default services