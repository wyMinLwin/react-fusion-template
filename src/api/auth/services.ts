import type { LoginPayload } from './types'
import axios from 'axios'

const baseUrl = '/Authentication'

const login = async (credentials: LoginPayload) => {
    const request = await axios.post(`${baseUrl}/Login`, credentials)
    return request.data
}

export default { login }
