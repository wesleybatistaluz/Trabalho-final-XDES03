'use server';
import { promises as fs } from 'fs';
import path from 'path';

// Defina um tipo genérico para os dados
export async function retornaBD<T = any>(arquivo: string): Promise<T[]> {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  const dados = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(dados);
}

export async function armazenaBD<T>(arquivo: string, dados: T[]) {
  const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
  await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
}