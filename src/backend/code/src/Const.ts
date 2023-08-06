import * as dotenv from 'dotenv'
dotenv.config({path: __dirname + '/../src/.env'})

const host_ip = process.env.HOST_IP || '0.0.0.0' //host
const server_host = process.env.SERVER_HOST || '0.0.0.0' //container
const client_host = process.env.CLIENT_HOST || '0.0.0.0' //container

const server_port = process.env.SERVER_PORT || 3000
const client_port = process.env.CLIENT_PORT || 5000

const host_server_address = `${host_ip}:${server_port}`
const host_client_address = `${host_ip}:${client_port}`
const server_address = `${server_host}:${server_port}`
const client_address = `${client_host}:${client_port}`

function customLog(...args : any) {
    const stackTrace = new Error().stack.split('\n');
    const callerLine = stackTrace[2].trim();
    let a = callerLine.split('/')
    let b = a[a.length - 1]
    console.log(`[${b}]`, ...args);
  }



export {
  host_server_address,
  host_client_address,
  server_host,
  client_host,
  server_port,
  client_port,
  server_address,
  client_address,
  customLog
}
