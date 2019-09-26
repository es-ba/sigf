import * as React from "react";
import * as ReactDOM from "react-dom";

type AgrupacionPrincipal = {
    denominacion:string, 
    agrupacion_principal:string, 
    icono:string, 
    color:string
};

const BotonAutonomia = (props:{autonomia:AgrupacionPrincipal}) => (
    <img className="boton-autonomia" src={props.autonomia.icono} />
)

const Botonera = (props:{autonomias:AgrupacionPrincipal[]}) => (
    <div className="botonera">
        <div className="sticky">
            {props.autonomias.map( autonomia =>
                <BotonAutonomia autonomia={autonomia}/>
            )}
        </div>
    </div>
)

const TituloAutonomia = (props:{autonomia:AgrupacionPrincipal})=>(
    <div style={{backgroundColor:props.autonomia.color}}>
        <span className="nombre-autonomia">{props.autonomia.denominacion}</span>
    </div>
)

const SeccionAutonomia = (props:{autonomia:AgrupacionPrincipal})=>(
    <div className="seccion-autonomia">
        <TituloAutonomia autonomia={props.autonomia}/>
        <div>divisiones...</div>
    </div>
)

const ListaIndicadores = (props:{autonomias:AgrupacionPrincipal[]}) => (
    <div className="la-lista">
        {props.autonomias.map( autonomia =>
            <SeccionAutonomia autonomia={autonomia}/>
        )}
    </div>
)

export function mostrar(result:{autonomias:AgrupacionPrincipal[]}){
    var autonomias = result.autonomias;
    ReactDOM.render(
        <div className="matriz-comparacion">
            <Botonera autonomias={autonomias}/>
            <ListaIndicadores autonomias={autonomias}/>
        </div>
        , document.getElementById("main_layout")
    );
}
