import mysql from 'mysql2'
import { database, host, password, port, user } from './config'

export const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port
}).promise()