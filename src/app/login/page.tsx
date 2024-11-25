import logoapi from "public/logoapi.svg"
import Image from "next/image";

export default function Login(){

    return(
        <form action="" className="user-create">
             <Image className='img-logo' src={logoapi} alt='Logo da API'/>

            <section className="user-input">
                <input type="email" name="email" id="email" placeholder="Email" aria-label="email" />
            </section>

            <section className="user-input">
                <input type="password" name="senha" id="senha" placeholder="Senha" aria-label="Senha" />
            </section>

            <button className="btn-Cadastrar">entrar</button>
        </form>

    );



};