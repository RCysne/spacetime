import { PrismaClient } from '@prisma/client'

// Trouxe a variável e passei a exportar para ficar visível a outros locais

export const prisma = new PrismaClient({
  // Esse log server para ver o que o prisma está solicitando no chamado do banco, executando todas as querys
  log: ['query'],
})
