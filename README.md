# TheMovieDB 🌟

**TheMovieDB** é uma aplicação moderna e envolvente que combina design visual impactante com funcionalidades práticas. Desenvolvida utilizando uma paleta de cores em verde e azul, a aplicação oferece uma interface dinâmica e acessível para atender às necessidades dos usuários de forma inovadora e eficaz.

---

## Descrição do Projeto 💡

### Visão Geral
**TheMovieDB** foi criada para oferecer uma experiência visual diferenciada, utilizando uma combinação de cores vibrantes que promovem tanto clareza quanto estilo. O objetivo é atender às demandas contemporâneas de design intuitivo, enquanto fornece ferramentas úteis e interativas para o público-alvo.

---

## Funcionalidades Principais 🛠️

- **Design Atrativo e Funcional**: Interface construída com foco na paleta verde e azul, priorizando acessibilidade e beleza visual.  
- **Customização do Usuário**: Ferramentas que permitem personalizar preferências ao gosto do usuário.  
- **Navegação Intuitiva**: Layout simples e eficiente que facilita o uso e reduz a curva de aprendizado.  

---

## Tecnologias Utilizadas 💻

- **Frontend**: Next.js, HTML5, CSS3, Axios: Biblioteca para realizar requisições HTTP assíncronas 
- **Backend**: Utilizando arquivos .json para persistência de dados
- **Outros**: Git e integração com APIs.  

---

## Como Começar 🚀

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Pré-requisitos
  
- Gerenciador de pacotes (npm, yarn, pnpm ou bun).  

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/BlueRedApp.git
   ```

2. Instale as dependências:
   ```bash
   cd TheMovieDB
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```
4. Aqui estão algumas dependências a serem instaladas:
  ```bash
  npm i
  npm i zod
  npm i react-hot-toast
  npm i bcrypt
  ```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página é atualizada automaticamente conforme você edita o arquivo.

---

## Learn More

Para aprender mais sobre Next.js, confira os seguintes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - saiba mais sobre os recursos e API do Next.js.  
- [Learn Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.  

Você pode explorar o [repositório do Next.js no GitHub](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!

---

## Deploy on Vercel

A maneira mais fácil de implantar sua aplicação Next.js é usar a [plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de implantação do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

---

## Estrutura e Pastas do Projeto 🚧

A estrutura do projeto está organizada da seguinte maneira para o front-end:

root/  
├── src/  
│   ├── app/  
│   │   ├── fonts/  
│   │   │   ├── GeistMonoVF/  
│   │   │   └── GeistVF/  
│   │   ├── main/  
│   │   │   ├── create/  
│   │   │   │   ├── createFavorite.module.css  
│   │   │   │   └── page.tsx  
│   │   │   ├── edit/[id]/  
│   │   │   │   └── page.tsx  
│   │   │   ├── fav/  
│   │   │   │   ├── fav.css  
│   │   │   │   └── page.tsx  
│   │   │   ├── listar/  
│   │   │   │   ├── listar.css  
│   │   │   │   └── page.tsx  
│   │   ├── user/  
│   │   │   ├── create/  
│   │   │   │   └── page.tsx  
│   │   │   ├── login/  
│   │   │   │   └── page.tsx  
│   │   ├── globals.css  
│   │   ├── layout.tsx  
│   │   ├── page.css  
│   │   └── page.tsx  
│   ├── components/  
│   │   ├── filmes.tsx  
│   │   ├── footer.tsx  
│   │   ├── form-create.tsx  
│   │   ├── form-login.tsx  
│   │   └── header.tsx  
│   ├── styles/  
│   │   ├── create.css  
│   │   ├── Create.modules.css  
│   │   ├── edit.modules.css  
│   │   ├── filmes.modules.css  
│   │   ├── Footer.css  
│   │   ├── Header.css  
│   │   ├── listar.css  
│   │   └── Login.css  
│   ├── utils/  
│   │   ├── auth.ts  
│   │   ├── conexao-bd.ts  
│   │   ├── credentials.ts  
│   │   └── favorites-actions.ts  
├── .env  
├── .eslintrc.json  
├── .gitignore  
├── next-env.d.ts  
├── next.config.ts  
├── package-lock.json  
├── package.json  
├── README.md  
└── ... (outros arquivos de configuração e metadados)
