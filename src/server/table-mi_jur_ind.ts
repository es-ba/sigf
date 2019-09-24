"use strict";

import {TableDefinition, TableContext} from "./types-sigf"
import {jur_ind} from "./table-jur_ind";

export function mi_jur_ind(context:TableContext):TableDefinition{
    if(context.forDump){
        context.user.jurisdiccion = context.user.jurisdiccion || '00';
    }
    var tableDef = jur_ind(context);
    tableDef.name='mi_jur_ind';
    tableDef.tableName='jur_ind';
    tableDef.allow={update:context.es.coordinador};
    tableDef.fields.forEach(function(fieldDef){
        if(fieldDef.name!=='jurisdiccion' && fieldDef.name!=='indicador'){
            fieldDef.editable=context.es.coordinador;
        }
    })
    tableDef.sql!.isTable=false,
    tableDef.sql!.from=`(
                select *
                from(
                    select jurisdiccion, indicador
                        from jurisdicciones, indicadores
                        where avance is not null
                ) x full outer join jur_ind using(jurisdiccion, indicador)
                where jurisdiccion = ${context.be.db.quoteLiteral(context.user.jurisdiccion)}
            )
            `;
    tableDef.hiddenColumns=['jurisdiccion'];
    return tableDef;
}
