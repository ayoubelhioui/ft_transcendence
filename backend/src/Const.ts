import * as dotenv from 'dotenv'
dotenv.config({path: __dirname + '/../src/.env'})


const host = process.env.SERVER_HOST || 'localhost'
const server_port = process.env.SERVER_PORT || 3000
const client_port = process.env.CLIENT_PORT || 5000
const server_address = `${host}:${server_port}`
const client_address = `${host}:${client_port}`

function customLog(...args) {
    const stackTrace = new Error().stack.split('\n');
    const callerLine = stackTrace[2].trim();
    let a = callerLine.split('/')
    let b = a[a.length - 1]
    console.log(`[${b}]`, ...args);
  }

customLog(server_address, " client: ", client_address)
export {
    host,
    server_port,
    client_port,
    client_address,
    server_address,
    customLog
}
