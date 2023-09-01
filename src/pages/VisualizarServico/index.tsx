//rotas
import { useParams } from "react-router-dom";
//estilização
import "./style.css";
import { useState, useEffect } from "react";
import api from "../../utils/api";


function VisualizarServico() {

    const { idServicos } = useParams();
    
    const [nome, setNome] = useState<string>("");
    const [valor, setValor] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [listaTechs, setListaTechs] = useState<string[]>([]);

    function buscarServicosPorID() {
        api.get("servicos/" + idServicos)
            .then((response: any) => {
                setNome(response.data.nome);
                setValor(response.data.valor);
                setDescricao(response.data.descricao);
                setListaTechs(response.data.techs);
            })

            .catch((error: any) => {
                console.log("Erro ao realizar uma requisicao:", error);

            })

    }

    useEffect(() => {
        buscarServicosPorID();
    }, [])

    return (
        <main id="main_visualizarservico">
            <div className="container">
                <h1>Serviço</h1>
                <div className="servico">
                    <div className="topo_servico">
                        <h2>{nome}</h2>
                        <span>R${valor}</span>
                    </div>
                    <p>{descricao}</p>
                    <div className="techs">
                        {
                            listaTechs.map((techs: string, index: number) => {
                                return <span key={index}>{techs}</span>
                            })
                        }
                    </div>
                </div>
            </div>

        </main>);
}

export default VisualizarServico;