"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function indicadores(context:TableContext):TableDefinition{
    var puedeEditar = context.es.admin;
    return {
        name:'indicadores',
        editable: puedeEditar,
        fields: [
            {name:'dimension'                , label:'Dimensión'                             , typeName:'text' },
            {name:'indicador'                , label:'Código indicador'                      , typeName:'text' ,nullable:false},
            {name:'denominacion'             , label:'Denominación' , isName:true            , typeName:'text' },
            {name:'orden'                    , label:'Orden'                                 , typeName:'integer' },
            {name:'fte'                      , label:'Fuente'                                , typeName:'text'},
            {name:'um'                       , label:'Unidad de medida'                      , typeName:'text'},
            {name:'universo'                 , label:'Universo'                              , typeName:'text'},
            {name:'def_con'                  , label:'Definición conceptual'                 , typeName:'text'},
            {name:'def_ope'                  , label:'Definición operativa'                  , typeName:'text'},
            {name:'cob'                      , label:'Cobertura'                             , typeName:'text'},
            {name:'desagregaciones'          , label:'Desagregaciones'                       , typeName:'text'},
            {name:'uso_alc_lim'              , label:'Uso - Alcance - Limitaciones'          , typeName:'text'},
            {name:'metas'                    , label:'Metas'                                 , typeName:'text'},
            {name:'ods'                      , label:'ODS'                                   , typeName:'text'},
        ],
        primaryKey:['indicador'],
        foreignKeys:[
            // {references:'dimension', fields:['dimension']},
            // {references:'fte'  , fields:['fte']},
            // {references:'um'   , fields:['um']}
        ],
        detailTables:[
            {table: 'jur_ind', fields:['indicador'], abr:'J', label:'jurisdicciones'},
        ]
    };
}
