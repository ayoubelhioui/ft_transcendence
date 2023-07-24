const host = import.meta.env.VITE_HOST
const port = import.meta.env.VITE_SERVER_PORT
const address = `${host}:${port}`

const STATUS_UNDEFINED = 0
const STATUS_SUCCESS = 1
const STATUS_ERROR = 2
const STATUS_NOT_SIGN_IN = 3

export {
    host,
    port,
    address,
    STATUS_UNDEFINED,
    STATUS_SUCCESS,
    STATUS_ERROR,
    STATUS_NOT_SIGN_IN
}
