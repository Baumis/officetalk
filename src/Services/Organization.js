import axios from 'axios'
const baseUrl = '/api/organizations'

const getOrganization = async (id) => {
    const response = await axios.post(`${baseUrl}/${id}`)
    return response.data
}

export default { getOrganization }