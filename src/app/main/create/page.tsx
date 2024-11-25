"use client";

import { useState } from "react";
import Image from "next/image";
import logoapi from "public/logoapi.svg";

export default function Create() {
    const [formData, setFormData] = useState({ email: "", senha: "", confSenha: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || "Erro ao cadastrar.");
                return;
            }

            setMessage("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error(error);
            setMessage("Erro ao conectar ao servidor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-create">
            <Image className="img-logo" src={logoapi} alt="Logo da API" />
            <section className="user-input">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    aria-label="Email"
                    onChange={handleChange}
                />
            </section>

            <section className="user-input">
                <input
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="Senha"
                    aria-label="Senha"
                    onChange={handleChange}
                />
            </section>

            <section className="user-input">
                <input
                    type="password"
                    name="conf-senha"
                    id="conf-senha"
                    placeholder="Confirme sua senha"
                    aria-label="Confirme sua senha"
                    onChange={handleChange}
                />
            </section>

            <button type="submit" className="btn-Cadastrar">
                Cadastrar
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
