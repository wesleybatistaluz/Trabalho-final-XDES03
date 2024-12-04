'use server';

import {promises as fs} from 'fs';
import path from 'path';

export async function retornaBD(arquivo: string): Promise<Array<any>> {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    const dados = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(dados);
}

export async function armazenaBD(arquivo: string, dados: any) {
    const dbPath = path.join(process.cwd(), 'src', 'db', arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
}