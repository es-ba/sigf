"use strict";

import {TableDefinition, TableContext} from "./types-sigf"
import {jurisdicciones} from "./table-jurisdicciones";

export function mi_jurisdiccion(context:TableContext):TableDefinition{
    if(context.forDump){
        context.user.jurisdiccion = context.user.jurisdiccion || '00';
    }
    var tableDef = jurisdicciones(context);
    tableDef.name='mi_jurisdiccion';
    tableDef.tableName='jurisdicciones';
    tableDef.allow={
        update:context.es.coordinador,
    }
    tableDef.detailTables=[
        {table: 'mi_jur_ind', fields:['jurisdiccion'], abr:'I', label:'indicadores'},
    ];
    tableDef.sql={
        isTable: false,
        where:`jurisdiccion = ${context.be.db.quoteLiteral(context.user.jurisdiccion)}`
    }
    return tableDef
}
