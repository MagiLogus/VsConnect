//estilização
import "./style.css";
import { Link } from "react-router-dom";

function CardServ(props: any) {
    return (
        <div className="servico">
            <div className="topo_servico">
                <Link to={"/servicos/" + props.idServicos}><h3>{props.titulo_servico}</h3> </Link>
                <span>{props.valor}</span>
            </div>
            <p>{props.descricao}</p>
            <div className="techs">
                {
                    props.listaTechs.map((tech: string, indice: number) => {
                        return <span key={indice}>{tech}</span>
                    })
                }

            </div>
        </div>
    );
}

export default CardServ;


