import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  // app.get('/users', async () => {
  //   const users = await prisma.user.findMany({
  // Dentro do findMany posso escolher qual item procuro na tabela, ele vai devolver o item mais o que ficou como prioritário
  // select: {
  //   name: true,
  // },

  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  // ------------------  BUSCA

  // No fastify o id vem do do params de dentro do request, então para ele ser usado o request é passado como parâmetro. Como o fastify não faz a validação do id, a gente instala o zod para fazer essa validação
  app.get('/memories/:id', async (request) => {
    // request params é um objeto, de onde estou retirando o id de dentro dos parametros e como eu sei que o id vem do uuid, eu valido usando o uuid
    // const { id } = request.params - comentando para criar uma nova variável com as novas

    // Usando o zod eu digo que o paramsSchema é um objeto e que dentro dele tem uma id e que eu espero que seja do tipo string
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    // Pegando o resquest params, passando como parâmetro para dentro do paramsSchema para o zod fazer uma validaçao se segue o padrão colocado em cima, se sim ele vai mostrar o id, e se não ele vai disparar um erro.
    const { id } = paramsSchema.parse(request.params)

    // Agora vou pegar a memória usando o findUnique já que eu recebo o id e se ele não achar ele dispara um erro. E ele procura na tabela (where) e verifica se a id recebida é igual a variável da paramsSchema
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id, // O mesmo que id: id
      },
    })
    return memory
  })

  app.post('/memories/', async (request) => {
    const bodySchema = z.object({
      coverUrl: z.string(),
      // para validar a memória que vem do body da requisição, é preciso de duas informações: o conteúdo da memória, e se essa informação é pública.
      content: z.string(),
      isPublic: z.coerce.boolean().default(false), // Booleano e por padrão é false. Só que na maioria das vezes não dá para enviar um booleano no corpo da requisição. O mais comum é número e strings (ex num formulário), ou até o booleano seja 0 e 1. Por isso se utiliza o método coerce para converter o valor que chegar no isPublic para boolean.
    })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    // Salvando a memória no banco de dados
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '0d2ab73f-4639-409b-a8d7-fb7af8f3642d',
      },
    })
    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      // Atualiza a memória
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return memory
  })

  // app.delete('/memories/:id', async () => {})
  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    await prisma.memory.delete({
      where: {
        id, // O mesmo que id: id
      },
    })
  })
}
