"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function indicadores(context:TableContext):TableDefinition{
    var puedeEditar = context.es.admin;
    return {
        name:'indicadores',
        editable: puedeEditar,
        fields: [
            {name:'autonomia'                , title:'Autonomía'                             , typeName:'text'      , isName:true,nullable:false},
            {name:'orden_autonomia'                                                          , typeName:'integer' },
            {name:'orden_dimension'                                                          , typeName:'integer' },
            {name:'dimension'                , title:'Dimensión'                             , typeName:'text' },
            {name:'indicador'                , title:'Código indicador'                      , typeName:'text' ,nullable:false},
            {name:'denominacion'             , title:'indicador'                             , typeName:'text' , isName:true},
            {name:'orden'                    , title:'Orden'                                 , typeName:'integer' },
            {name:'fte'                      , title:'Fuente'                                , typeName:'text'},
            {name:'um'                       , title:'Unidad de medida'                      , typeName:'text'},
            {name:'universo'                 , title:'Universo'                              , typeName:'text'},
            {name:'def_con'                  , title:'Definición conceptual'                 , typeName:'text'},
            {name:'def_ope'                  , title:'Definición operativa'                  , typeName:'text'},
            {name:'cob'                      , title:'Cobertura'                             , typeName:'text'},
            {name:'desagregaciones'          , title:'Desagregaciones'                       , typeName:'text'},
            {name:'uso_alc_lim'              , title:'Uso - Alcance - Limitaciones'          , typeName:'text'},
            {name:'metas'                    , title:'Metas'                                 , typeName:'text'},
            {name:'ods'                      , title:'ODS'                                   , typeName:'text'},
        ],
        primaryKey:['indicador'],
        foreignKeys:[
            {references:'dimensiones', fields:['dimension']},
            // {references:'fte'  , fields:['fte']},
            // {references:'um'   , fields:['um']}
        ],
        detailTables:[
            {table: 'jur_ind', fields:['indicador'], abr:'J', label:'jurisdicciones'},
        ],
        sql:{
            from: `(
                select i.*, a.denominacion as autonomia, a.orden as orden_autonomia, d.orden as orden_dimension
                    from indicadores i inner join dimensiones d using (dimension) inner join agrupacion_principal a using (agrupacion_principal)
            )`
        },
        hiddenColumns:['indicador','orden_autonomia', 'orden_dimension','agrupacion_principal','dimension','orden'],
        sortColumns:[{column:'orden_autonomia'},{column:'orden_dimension'},{column:'orden'}]
    };
}
