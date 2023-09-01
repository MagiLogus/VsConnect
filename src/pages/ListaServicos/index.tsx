import "./style.css";

//components
import CardServ from "../../components/CardServ";

//hooks
import { useState, useEffect } from "react";

import api from "../../utils/api";

function ListaServicos() {

    //STATE DEVS
    const [serv, setServ] = useState<any[]>([]);

    const [skillDigitado, setSkillDigitado] = useState<string>("");

    //função onde pega o que o usuario digitou
    function verificarCampoSkill(event: any) {
        if (event.target.value === "") {
            listarServicos();
        }
        setSkillDigitado(event.target.value);
    }

    function buscarDevPorSkill(event: any) {
        //não recarrega a pagina
        event.preventDefault();

        //filtrar servicos pela skill digitada no campo buscar
        const servicosFiltrados = serv.filter((serv: any) => serv.techs.includes(skillDigitado.toLocaleUpperCase()));

        if (servicosFiltrados.length === 0) {
            alert("Nenhum desenvolvedor(a) com essa skill :(")
        } else {
            //atribui valor de servicos filtrado, ao state listaServicosFiltrados 
            setServ(servicosFiltrados);
        }


    }

    function listarServicos() {
        api.get("servicos")
            .then((response: any) => {
                setServ(response.data)
            })
            .catch((error: any) => {
                console.log("Erro ao realizar uma requisicao:", error);

            })

    }

    useEffect(() => {
        listarServicos();
    }, [])


    return (
        <>
            <main id="main_listaservicos">
                <div className="container container_lista_servicos">
                    <div className="lista_servicos_conteudo">
                        <h1>Lista de Serviços</h1>
                        <hr />
                        <form method="post" onSubmit={buscarDevPorSkill}>
                            <div className="wrapper_form">
                                <label htmlFor="busca">Procurar serviços</label>
                                <div className="campo-label">
                                    <input type="search" name="campo-busca" id="busca" placeholder="Buscar serviços por tecnologias..." onChange={verificarCampoSkill} />
                                    <button type="submit">Buscar</button>
                                </div>
                            </div>
                        </form>
                        <div className="wrapper_lista">
                            <ul>
                                {
                                    serv.map((serv: any, indice: number) => {
                                        return <li key={indice}>
                                            <CardServ
                                                idServicos={serv.id}
                                                titulo_servico={serv.nome}
                                                descricao={serv.descricao}
                                                valor={"R$" + serv.valor}
                                                listaTechs={serv.techs}
                                            />
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

export default ListaServicos;
