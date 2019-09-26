import * as React from "react";
import * as ReactDOM from "react-dom";

type JurInd = {
    jurisdiccion:string,
    factibilidad:string,
    fte:string,
    observaciones:string,
}

type Jurisdiccion = {
    jurisdiccion:string,
    nombre:string
}

type Indicador = {
    indicador:string,
    denominacion:string,
    fte:string,
    um:string,
    jurisdicciones:JurInd[]
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

const TdJurInd = (props:{jurind:JurInd}) =>
    <td className="jurind" jurind-factibilidad={props.jurind.factibilidad} title={props.jurind.jurisdiccion+": "+(props.jurind.fte||'')+" "+(props.jurind.observaciones||'')}>
        {props.jurind.factibilidad}
    </td>

const TituloIndicador = (props:{indicador:Indicador})=>(
    <td className="nombre-indicador">{props.indicador.denominacion}</td>
)

const SeccionIndicador = (props:{indicador:Indicador})=>(
    <tr className="titulo-indicador">
        <TituloIndicador indicador={props.indicador}/>
        {props.indicador.jurisdicciones.map( jurind=>
            <TdJurInd jurind={jurind}/>
        )}
    </tr>
)

const TituloDimension = (props:{dimension:Dimension, autonomia:AgrupacionPrincipal, jurisdicciones:Jurisdiccion[]})=>(
    <tr className="titulo-dimension">
        <td className="nombre-dimension"    style={{color:props.autonomia.color}}>{props.dimension.denominacion}</td>
        {props.jurisdicciones.map( _ =>
            <td className="jurind"></td>
        )}
    </tr>
)

const SeccionDimension = (props:{dimension:Dimension, autonomia:AgrupacionPrincipal, jurisdicciones:Jurisdiccion[]})=>(
    <>
        <TituloDimension dimension={props.dimension} autonomia={props.autonomia} jurisdicciones={props.jurisdicciones}/>
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

const SeccionAutonomia = (props:{autonomia:AgrupacionPrincipal, jurisdicciones:Jurisdiccion[]})=>(
    <>
        <TituloAutonomia autonomia={props.autonomia}/>
        {props.autonomia.dimensiones.map( dimension =>
            <SeccionDimension dimension={dimension} autonomia={props.autonomia} jurisdicciones={props.jurisdicciones}/>
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
            <SeccionAutonomia autonomia={autonomia} jurisdicciones={props.jurisdicciones}/>
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
