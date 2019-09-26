import * as React from "react";
import * as ReactDOM from "react-dom";

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
    <div className="titulo-indicador">
        <span className="nombre-indicador">{props.indicador.denominacion}</span>
    </div>
)

const SeccionIndicador = (props:{indicador:Indicador})=>(
    <div className="seccion-dimension">
        <TituloIndicador indicador={props.indicador}/>
    </div>
)

const TituloDimension = (props:{dimension:Dimension})=>(
    <div className="titulo-dimension">
        <span className="nombre-dimension">{props.dimension.denominacion}</span>
    </div>
)

const SeccionDimension = (props:{dimension:Dimension})=>(
    <div className="seccion-dimension">
        <TituloDimension dimension={props.dimension}/>
        <div className="seccion-indicadores">
            {props.dimension.indicadores.map( indicador =>
                <SeccionIndicador indicador={indicador}/>
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
        <div className="seccion-dimensiones">
            {props.autonomia.dimensiones.map( dimension =>
                <SeccionDimension dimension={dimension}/>
            )}
        </div>
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
