import "@/styles/Create.css";
import Image from "next/image";
import logoapi from "public/logoapi.svg"

export default function Create(){

    return(
        <form action="" className="user-create">

            <Image className='img-logo' src={logoapi} alt='Logo da API'/>

            <section className="user-input">
                <input type="email" name="email" id="email" placeholder="Email" aria-label="email" />
            </section>

            <section className="user-input">
                <input type="password" name="senha" id="senha" placeholder="Senha" aria-label="Senha" />
            </section>

            <section className="user-input">
                <input type="password" name="conf-senha" id="conf-senha" placeholder="Confirme sua senha" aria-label="Confirme sua senha" />
            </section>

            <button className="btn-Cadastrar">Cadastrar</button>
        </form>

    );

};