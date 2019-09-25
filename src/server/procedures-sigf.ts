"use strict";

import { ProcedureDef } from "./types-sigf";
import { ProcedureContext, CoreFunctionParameters } from "backend-plus";
export * from "./types-sigf";
import * as fs from "fs-extra";

import * as bestGlobals from "best-globals";
import * as likeAr from 'like-ar';

function json(sql:string, orderby:string){
    return `(SELECT jsonb_agg(to_jsonb(j.*) ORDER BY ${orderby}) from (${sql}) as j)`
}

export const Proceduressigf : ProcedureDef[] = [
    {
        action:'matriz_traer',
        parameters:[],
        coreFunction:async function(context:ProcedureContext,_parameters:CoreFunctionParameters){
            var sql4=`
                SELECT jurisdiccion, jur_ind.factibilidad, jur_ind.fte, jur_ind.observaciones
                    FROM (
                        SELECT * 
                            FROM indicadores i, jurisdicciones j
                            WHERE avance is not null
                    ) ji_total LEFT JOIN jur_ind USING (indicador, jurisdiccion)
                    WHERE i.indicador = ji_total.indicador
            `;
            var sql3=`
                SELECT *, ${json(sql4,'jurisdiccion')} as jurisdicciones 
                    FROM indicadores i 
                    WHERE i.dimension = d.dimension
            `;
            var sql2=`
                SELECT *, ${json(sql3,'orden, indicador')} as indicadores
                    FROM dimensiones d 
                    WHERE a.agrupacion_principal = d.agrupacion_principal
            `;
            var sql1=`
                SELECT *, ${json(sql2,'orden, dimension')} as dimensiones
                    FROM agrupacion_principal a
            `;
            var sql=json(sql1, 'orden, agrupacion_principal')
            fs.writeFile('local-sql-core.sql',sql);
            var result = await context.client.query(sql).fetchUniqueValue();
            var resultj = await context.client.query(json(`
                SELECT *
                    FROM jurisdicciones j
                        WHERE avance is not null
            `,'jurisdiccion')).fetchUniqueValue();
            return {autonomias:result.value, jurisdicciones:resultj.value};
        }
    }
];
