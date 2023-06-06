import fastify from 'fastify'
import cors from '@fastify/cors' // Cors controla qual url frontend pode acessar o backend
import 'dotenv/config'
import { authRoutes } from './routes/auth'

import { memoriesRoutes } from './routes/memories'
// import { PrismaClient } from '@prisma/client' - movido para o arquivo ddo prisma.ts

// Utilizando o framework fastify e colocando na variável
const app = fastify()
// const prisma = new PrismaClient() - Enviado para a pasta lib para ser transformado em uma função e exportado

// Criação das rotas onde o frontend pode acessar e colher informações - enviada para a pasta de rotas
// app.get('/users', async () => {
//   const users = await prisma.user.findMany()

//   return users
// })

app.register(cors, {
  origin: true, // Com o true, todas as URLs de frontend poderão acessar nosso backend
})

// O correto é colocar todas as URLs que serão acessadas
// app.register(cors, {
//   origin: ['http://localhost:3333', 'https://localhost:3333/memories'],
// })

app.register(authRoutes)

// O método serve para registrar o arquivo de rotas separados
app.register(memoriesRoutes)

// Um servidor deve ficar ouvindo uma url específica. Como o listen devolve uma promise e ela pode demorar, então a gente usa o then para enviar uma mensagem
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
