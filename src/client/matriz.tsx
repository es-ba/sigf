import * as React from "react";
import * as ReactDOM from "react-dom";

const Autonomia = (props:{nombre:string, codigo:string})=>(
    <div>
        <b className={props.codigo}>*</b>
        <span className="nombre_autonomia">{props.nombre}</span>
    </div>
)

type AgrupacionPrincipal = {denominacion:string, agrupacion_principal:string};

export function mostrar(result:{autonomias:AgrupacionPrincipal[]}){
    var autonomias = result.autonomias;
    ReactDOM.render(
        <div>
            <h1>Nuestra matriz</h1>
            {autonomias.map( autonomia =>
                <Autonomia codigo={autonomia.agrupacion_principal} nombre={autonomia.denominacion}></Autonomia>
            )}
        </div>
        , document.getElementById("main_layout")
    );
}
