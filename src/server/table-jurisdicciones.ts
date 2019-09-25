"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function jurisdicciones(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    return {
        name:'jurisdicciones',
        elementName:'jurisdicción',
        editable:admin,
        fields:[
            {name:'jurisdiccion', typeName:'text' , title:'jurisdicción'},
            {name:'nombre'      , typeName:'text' , isName:true},
            {name:'iso3166_2'   , typeName:'text' },
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
