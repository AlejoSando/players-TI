import { pool } from "./database"

export interface jugador {
    id: number,
    nombre: string,
    pos: string,
    edad: number,
    est: number,
    p: number,
    nac: string,
    ap: number, 
    sub: number,
    a: number,
    ga: number,
    assis: number,
    fc: number,
    fs: number,
    ta: number,
    tr: number,
} 

export const getAllPlayers = async () => {
    try {
        const [rows] = await pool.query('Select * from jugadores')
        return rows
      } catch (error) {
        return error
      }
}


export const getAllArgentinians = async () =>{
    try {
        const [rows] = await pool.query("SELECT * FROM jugadores WHERE nac = ?", [
          "Argentina"
        ]);
        return rows
      } catch (error) {
        return error
      }
}

export const getAllByHeight = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM jugadores WHERE peso BETWEEN ? AND ?', [74, 81]);
        return rows
    } catch (error) {
        return error
    }
}

export const getAllByAltura = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM jugadores ORDER BY altura DESC LIMIT 1');
        return rows
    } catch (error) {
        return error
    }
}

export const getOneByID = async (playerId: number) => {
    try {
        const [row] = await pool.query('SELECT * FROM jugadores WHERE id = ?', [playerId]);
      return row
    } catch (error) {
        return error
    }
}

export const addPlayer = async (player: jugador) => {
    try {
        const result = await pool.query('INSERT INTO jugadores SET ?', [player]);
        return result
    } catch (error) {
        return error
    }
}

export const modifyPlayer = async (player: jugador, id:number) => {
    try {
        const result = await pool.query('UPDATE jugadores SET ? WHERE id = ?', [player, id]);        
        return result
    } catch (error) {
        return error
    }
}

export const deletePlayer = async (id:number) => {
    try {
        const result = await pool.query('DELETE FROM jugadores WHERE id = ?', [id]);        
        return result
    } catch (error) {
        return error
    }
}
