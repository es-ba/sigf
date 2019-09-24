"use strict";

import {TableDefinition, TableContext} from "./types-sigf"
import { FieldDefinition } from "backend-plus";

export function matriz_jur_ind(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    var fields:FieldDefinition[] = [
        {name:'indicador'    , typeName:'text' },
    ];
    var selectFields:string[]=[];
    if(context.be.jurisdicciones){
        context.be.jurisdicciones.forEach(function(j){
            if(j.avance){
                fields.push({name:`j_${j.jurisdiccion}`, label:j.nombre, typeName:'text'});
                selectFields.push(`(select factibilidad from jur_ind where jur_ind.indicador=indicadores.indicador and jurisdiccion=${context.be.db.quoteLiteral(j.jurisdiccion)}) as ${context.be.db.quoteIdent('j_'+j.jurisdiccion)}`)
            }
        })
    }
    return {
        name:'matriz_jur_ind',
        elementName:'indicador de la jurisdicción',
        editable:admin,
        fields:fields,
        foreignKeys:[
            {references:'indicadores'   , fields:['indicador']},
        ],
        primaryKey:['indicador'],
        sql:{
            from:`(
                select indicador, denominacion,
                    ${selectFields.join(',\n')}
                    from indicadores
                    order by dimension, orden
            )
            `
        }
    };
}
