export default function CreateUser() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const response = await fetch("/api/add-user", {
            method: "POST",
            body: JSON.stringify({
                nome: formData.get("nome"),
                email: formData.get("email"),
                senha: formData.get("senha"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            window.location.href = "/main/listar"; // Redireciona após sucesso
        } else {
            alert("Erro ao cadastrar usuário.");
        }
    };

    return (
        <div className="create-user-container">
            <h2>Cadastrar Novo Usuário</h2>
            <form onSubmit={handleSubmit} className="create-user-form">
                <section className="user-input">
                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Nome do Usuário"
                        aria-label="Nome do Usuário"
                    />
                </section>

                <section className="user-input">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email do Usuário"
                        aria-label="Email do Usuário"
                    />
                </section>

                <section className="user-input">
                    <input
                        type="password"
                        name="senha"
                        id="senha"
                        placeholder="Senha"
                        aria-label="Senha"
                    />
                </section>

                <button type="submit">Cadastrar Usuário</button>
            </form>
        </div>
    );
}
