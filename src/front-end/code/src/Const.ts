const host_ip = import.meta.env.VITE_HOST_IP || '0.0.0.0' //host
const server_host = import.meta.env.VITE_SERVER_HOST || '0.0.0.0' //container
const client_host = import.meta.env.VITE_CLIENT_HOST || '0.0.0.0' //container

const server_port = import.meta.env.VITE_SERVER_PORT || 3000
const client_port = import.meta.env.VITE_CLIENT_PORT || 5000

const host_server_address = `${host_ip}:${server_port}`
const host_client_address = `${host_ip}:${client_port}`
const server_address = `${server_host}:${server_port}`
const client_address = `${client_host}:${client_port}`

const intra_api = import.meta.env.VITE_API
const google_api = `http://${host_server_address}/auth/google`


const address = host_server_address

const STATUS_UNDEFINED = 0
const STATUS_SUCCESS = 1
const STATUS_ERROR = 2
const STATUS_NOT_SIGN_IN = 3

export {
    address,
    host_ip,
    server_host,
    client_host,
    server_port,
    client_port,
    host_server_address,
    host_client_address,
    server_address,
    client_address,
    intra_api,
    google_api,
    STATUS_UNDEFINED,
    STATUS_SUCCESS,
    STATUS_ERROR,
    STATUS_NOT_SIGN_IN
}
