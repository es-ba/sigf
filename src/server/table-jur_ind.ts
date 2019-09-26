"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function jur_ind(context:TableContext, opciones?:{desdeIndicadores?:boolean, laPlana?:boolean}):TableDefinition{
    opciones=opciones||{};
    var admin = context.es.admin;
    var otrosOcultos = opciones.desdeIndicadores?['autonomia']:[];
    return {
        name:'jur_ind',
        elementName:'indicador de la jurisdicción',
        editable:admin,
        fields:[
            {name:'autonomia'      , typeName:'text'   , editable:false, title:'autonomía', inTable:false},
            {name:'orden_autonomia', typeName:'integer', editable:false, inTable:false},
            {name:'dimension'      , typeName:'text'   , editable:false, title:'dimensión', inTable:false},
            {name:'orden_dimension', typeName:'integer', editable:false, inTable:false},
            {name:'jurisdiccion'   , typeName:'text'   , editable:false, title:'jurisdicción'},
            {name:'indicador'      , typeName:'text'   , editable:false},
            {name:'orden'          , typeName:'integer', editable:false, inTable:false},
            {name:'factibilidad'   , typeName:'text'   },
            {name:'fte'            , typeName:'text'   , title:'fuente'  },
            {name:'observaciones'  , typeName:'text'   },
        ],
        foreignKeys:[
            {references:'jurisdicciones', fields:['jurisdiccion']},
            {references:'indicadores'   , fields:['indicador'], displayFields:['denominacion']},
        ],
        primaryKey:['jurisdiccion','indicador'],
        sql:{
            isTable:true,
            insertIfNotUpdate:true,
            from:`(
                select *
                from(
                    select jurisdiccion, indicador, i.orden, d.denominacion as dimension, a.denominacion as autonomia, a.orden as orden_autonomia, d.orden as orden_dimension
                        from jurisdicciones,
                             indicadores i inner join dimensiones d using (dimension) inner join agrupacion_principal a using (agrupacion_principal)
                        where avance is not null
                ) x full outer join jur_ind using(jurisdiccion, indicador)
            )
            `
        },
        hiddenColumns:opciones.laPlana?[]:['indicador','orden_autonomia', 'orden_dimension','agrupacion_principal','orden', ...otrosOcultos],
        sortColumns:[{column:'orden_autonomia'},{column:'orden_dimension'},{column:'orden'}]
    };
}
