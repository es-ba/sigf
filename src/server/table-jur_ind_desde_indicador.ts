"use strict";

import {TableDefinition, TableContext} from "./types-sigf"
import {jur_ind} from "./table-jur_ind";

export function jur_ind_desde_indicador(context:TableContext):TableDefinition{
    var tableDef = jur_ind(context,{desdeIndicadores:true});
    tableDef.sql!.isTable=false;
    return tableDef;
}
