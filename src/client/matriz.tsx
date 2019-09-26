import * as React from "react";
import * as ReactDOM from "react-dom";

type Jurisdiccion = {
    jurisdiccion:string,
    nombre:string
}

type Indicador = {
    indicador:string,
    denominacion:string,
    fte:string,
    um:string
}

type Dimension = {
    dimension:string,
    denominacion:string,
    indicadores:Indicador[]
}

type AgrupacionPrincipal = {
    denominacion:string, 
    agrupacion_principal:string, 
    icono:string, 
    color:string,
    dimensiones:Dimension[]
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

const TituloIndicador = (props:{indicador:Indicador})=>(
    <tr className="titulo-indicador">
        <td className="nombre-indicador">{props.indicador.denominacion}</td>
    </tr>
)

const SeccionIndicador = (props:{indicador:Indicador})=>(
    <TituloIndicador indicador={props.indicador}/>
)

const TituloDimension = (props:{dimension:Dimension, autonomia:AgrupacionPrincipal})=>(
    <tr className="titulo-dimension">
        <td className="nombre-dimension"    style={{color:props.autonomia.color}}>{props.dimension.denominacion}</td>
    </tr>
)

const SeccionDimension = (props:{dimension:Dimension, autonomia:AgrupacionPrincipal})=>(
    <>
        <TituloDimension dimension={props.dimension} autonomia={props.autonomia}/>
        {props.dimension.indicadores.map( indicador =>
            <SeccionIndicador indicador={indicador}/>
        )}
    </>
)

const TituloAutonomia = (props:{autonomia:AgrupacionPrincipal})=>(
    <tr>
        <td style={{backgroundColor:props.autonomia.color}} auto-codigo-x={props.autonomia.agrupacion_principal} className="nombre-autonomia" colSpan={99}>{props.autonomia.denominacion}</td>
    </tr>
)

const SeccionAutonomia = (props:{autonomia:AgrupacionPrincipal})=>(
    <>
        <TituloAutonomia autonomia={props.autonomia}/>
        {props.autonomia.dimensiones.map( dimension =>
            <SeccionDimension dimension={dimension} autonomia={props.autonomia}/>
        )}
    </>
)

const ListaIndicadores = (props:{autonomias:AgrupacionPrincipal[], jurisdicciones:Jurisdiccion[]}) => (
    <table className="la-lista">
        <thead>
            <tr>
                <th rowSpan={2}>autonomía / dimensión / indicador</th>
                {props.jurisdicciones.map( jurisdiccion =>
                    <th className="jurisdiccion">{jurisdiccion.jurisdiccion}</th>
                )}
            </tr> 
            <tr>
                {props.jurisdicciones.map( jurisdiccion =>
                    <th className="jurisdiccion-nombre">{jurisdiccion.nombre}</th>
                )}
            </tr> 
        </thead>
        <tbody>
        {props.autonomias.map( autonomia =>
            <SeccionAutonomia autonomia={autonomia}/>
        )}
        </tbody>
    </table>
)

export function mostrar(result:{autonomias:AgrupacionPrincipal[], jurisdicciones:Jurisdiccion[]}){
    var autonomias = result.autonomias;
    ReactDOM.render(
        <div className="matriz-comparacion">
            <Botonera autonomias={autonomias}/>
            <ListaIndicadores autonomias={autonomias} jurisdicciones={result.jurisdicciones}/>
        </div>
        , document.getElementById("main_layout")
    );
}
