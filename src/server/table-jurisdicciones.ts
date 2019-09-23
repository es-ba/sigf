"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function jurisdicciones(context:TableContext):TableDefinition{
    var admin = context.user.rol==='admin';
    return {
        name:'jurisdicciones',
        elementName:'jurisdicción',
        editable:admin,
        fields:[
            {name:'jurisdiccion', typeName:'text' , title:'jurisdicción'},
            {name:'nombre'      , typeName:'text' , isName:true},
            {name:'iso3166_2'   , typeName:'text' },
            {name:'avance'      , typeName:'text' },
        ],
        detailTables:[
            {table: 'jur_ind', fields:['jurisdiccion'], abr:'I', label:'indicadores'},
        ],
        primaryKey:['jurisdiccion'],
    };
}
