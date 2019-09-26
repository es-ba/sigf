"use strict";

import {TableDefinition, TableContext} from "./types-sigf"
import { FieldDefinition } from "backend-plus";

export function matriz_jur_ind(context:TableContext):TableDefinition{
    var admin = context.es.admin;
    var fields:FieldDefinition[] = [
            {name:'autonomia'      , typeName:'text'    ,title:'autonomía', inTable:false},
            {name:'orden_autonomia', typeName:'integer' ,inTable:false},
            {name:'dimension'      , typeName:'text'    ,title:'dimensión', inTable:false},
            {name:'orden_dimension', typeName:'integer' ,inTable:false},
            {name:'indicador'      , typeName:'text'    },
            {name:'denominacion'   , typeName:'text'    ,title:'indicador'},
            {name:'orden'          , typeName:'integer' ,inTable:false},
    ];
    var selectFields:string[]=[];
    if(context.be.jurisdicciones){
        context.be.jurisdicciones.forEach(function(j){
            if(j.avance){
                fields.push({name:`j_${j.jurisdiccion}`, label:j.nombre, typeName:'text'});
                selectFields.push(`, (select factibilidad from jur_ind where jur_ind.indicador=i    .indicador and jurisdiccion=${context.be.db.quoteLiteral(j.jurisdiccion)}) as ${context.be.db.quoteIdent('j_'+j.jurisdiccion)}`)
            }
        })
    }
    return {
        name:'matriz_jur_ind',
        elementName:'indicador de la jurisdicción',
        editable:false,
        fields:fields,
        foreignKeys:[
            {references:'indicadores'   , fields:['indicador'], displayFields:[]},
        ],
        primaryKey:['indicador'],
        sql:{
            from:`(
                select indicador, i.denominacion, i.orden, a.denominacion as autonomia, a.orden as orden_autonomia, d.orden as orden_dimension, d.denominacion as dimension
                    ${selectFields.join('\n')}
                    from indicadores i inner join dimensiones d using (dimension) inner join agrupacion_principal a using (agrupacion_principal)
            )
            `
        },
        hiddenColumns:['indicador','orden_autonomia', 'orden_dimension','agrupacion_principal','orden'],
        sortColumns:[{column:'orden_autonomia'},{column:'orden_dimension'},{column:'orden'}]
    };
}
