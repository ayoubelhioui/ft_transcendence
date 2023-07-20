const host = import.meta.env.VITE_HOST
const port = import.meta.env.VITE_SERVER_PORT
const address = `${host}:${port}`

export {
    host,
    port,
    address
}
