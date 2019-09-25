"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function jurisdicciones(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    var coordinador = context.es.coordinador;
    return {
        name:'jurisdicciones',
        elementName:'jurisdicción',
        allow: {
            delete: admin,
            update: coordinador,
            insert: admin
        },
        fields:[
            {name:'jurisdiccion', typeName:'text', editable:admin, title:'jurisdicción'},
            {name:'nombre'      , typeName:'text', editable:admin, isName:true},
            {name:'iso3166_2'   , typeName:'text', editable:admin},
            {name:'avance'      , typeName:'text' },
            {name:'responsables', typeName:'text' },
            {name:'telefono'    , typeName:'text' },
            {name:'mail'        , typeName:'text' },
        ],
        detailTables:[
            {table: 'jur_ind', fields:['jurisdiccion'], abr:'I', label:'indicadores'},
        ],
        primaryKey:['jurisdiccion'],
    };
}
