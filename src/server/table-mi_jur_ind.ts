"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function mi_jur_ind(context:TableContext):TableDefinition{
    var admin = context.user.rol==='admin';
    return {
        name:'mi_jur_ind',
        tableName: 'jur_ind',
        elementName:'indicador de la jurisdicción',
        editable:admin,
        fields:[
            {name:'jurisdiccion' , typeName:'text' , editable:false, title:'jurisdicción'},
            {name:'indicador'    , typeName:'text' },
            {name:'factibilidad' , typeName:'text' },
            {name:'fte'          , label:'fuente'  , typeName:'text'},
            {name:'observaciones', typeName:'text' },
        ],
        foreignKeys:[
            {references:'jurisdicciones', fields:['jurisdiccion']},
            {references:'indicadores'   , fields:['indicador']},
        ],
        primaryKey:['jurisdiccion','indicador'],
        sql:{
            insertIfNotUpdate:true,
            from:`(
                select *
                from(
                    select jurisdiccion, indicador
                        from jurisdicciones, indicadores
                        where avance is not null
                ) x full outer join jur_ind using(jurisdiccion, indicador)
                where jurisdiccion = ${context.be.db.quoteLiteral(context.user.jurisdiccion)}
            )
            `
        },
        hiddenColumns:['jurisdiccion','jurisdicciones__nombre']
    };
}
