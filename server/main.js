import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import { PORT } from './config.js';
import { addPlayer, getAllArgentinians, getAllPlayers, getOneByID, modifyPlayer } from './jugadores.js';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.get('/jugadores', async (req, res) => {
  const jugadores = await getAllPlayers();
  res.send(jugadores);
});

fastify.get('/jugadores/argentinos', async (req, res) => {
  const jugadores = await getAllArgentinians();
  res.send(jugadores);
});

fastify.post('/jugadores/:id', async (req, res) => {
  const id = req.params.id;
  const jugadorInsertado = await getOneByID(id);
  res.send(jugadorInsertado);
});

fastify.post('/jugadores/agregar', async (req, res) => {
  const jugador = req.body.jugador;
  const jugadorInsertado = await addPlayer(jugador);
  res.send(jugadorInsertado);
});

fastify.put('/jugadores/modificar', async (req,res) => {
  const jugador = req.body.jugador;
  const id = req.params.id;
    await modifyPlayer(jugador,id)
    res.send({message:'Jugador modificado exitosamente'})
})

const runServer = async () => {
  await fastify.register(cors, {
    origin: '*',
  });

  try {
    await fastify.listen({ port: 3000 }, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    fastify.log.error(error);
  }
};

runServer();