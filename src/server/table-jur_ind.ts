"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function jur_ind(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    return {
        name:'jur_ind',
        elementName:'indicador de la jurisdicción',
        editable:admin,
        fields:[
            {name:'jurisdiccion' , typeName:'text' , editable:false, title:'jurisdicción'},
            {name:'indicador'    , typeName:'text' , editable:false},
            {name:'factibilidad' , typeName:'text' },
            {name:'fte'          , typeName:'text' , label:'fuente'  },
            {name:'observaciones', typeName:'text' },
        ],
        foreignKeys:[
            {references:'jurisdicciones', fields:['jurisdiccion']},
            {references:'indicadores'   , fields:['indicador']},
        ],
        primaryKey:['jurisdiccion','indicador'],
        sql:{
            isTable:true,
            insertIfNotUpdate:true,
            from:`(
                select *
                from(
                    select jurisdiccion, indicador
                        from jurisdicciones, indicadores
                        where avance is not null
                ) x full outer join jur_ind using(jurisdiccion, indicador)
            )
            `
        }
    };
}
