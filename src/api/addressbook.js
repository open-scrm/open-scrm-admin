import axios from '@/config/httpConfig'

export function listDepts(data) {
    return axios.post('/addressbook/dept/list', data)
}
