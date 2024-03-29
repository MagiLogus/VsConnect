//estilização
import "./style.css";

//hook
import { useState, useEffect } from "react";

import api from "../../utils/api";

import { useNavigate } from "react-router-dom";

//localstorage
import secureLocalStorage from "react-secure-storage";


function Login() {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    function realiazarAutenticacao(event: any) {
        event.preventDefault();

        const usuario = {
            email: email,
            password: senha
        }

        api.post("login", usuario)
            .then((response: any) => {
                secureLocalStorage.setItem("user", response.data)

                //redireicionar ao componenete perfil
                navigate("/perfil/" + response.data.user.id)
                //recarrega a tela
                navigate(0);
            })

            .catch((error: any) => {
                alert("Erro ao tentar logar");
            })
    }
    //variavel navigate que utiliza a funcao usenavigate para navgear entre os componentes 
    const navigate = useNavigate();

    return (
        <main id="main_login">
            <div className="container container_login">
                <div className="login_conteudo">
                    <h1>Login</h1>
                    <hr />
                    <form className="login_formulario" method="POST" onSubmit={realiazarAutenticacao}>
                        <div className="login_box_input">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Digite aqui seu e-mail:"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login_box_input">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite aqui sua senha:"
                                required
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <button className="login_botao" type="submit">Logar</button>
                    </form>
                </div>
            </div>
        </main>

    );
}

export default Login;