"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function mi_jurisdiccion(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    if(context.forDump){
        context.user.jurisdiccion = context.user.jurisdiccion || '00';
    }
    return {
        name:'mi_jurisdiccion',
        elementName:'jurisdicción',
        tableName:'jurisdicciones',
        allow:{
            update:context.es.coordinador,
        },
        fields:[
            {name:'jurisdiccion', typeName:'text' ,editable:admin , title:'jurisdicción'},
            {name:'nombre'      , typeName:'text' ,editable:admin , isName:true},
            {name:'iso3166_2'   , typeName:'text' ,editable:admin },
            {name:'avance'      , typeName:'text' },
        ],
        detailTables:[
            {table: 'mi_jur_ind', fields:['jurisdiccion'], abr:'I', label:'indicadores'},
        ],
        primaryKey:['jurisdiccion'],
        sql:{
            where:`jurisdiccion = ${context.be.db.quoteLiteral(context.user.jurisdiccion)}`
        }
    };
}
