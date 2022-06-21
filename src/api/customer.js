
import axios from '@/config/httpConfig'

export function listCustomer(data) {
    return axios.post('/customer/list', data)
}
