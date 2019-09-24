"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function dimensiones(context:TableContext):TableDefinition{
    var admin = context.user.rol==='admin';
    return {
        name:'dimensiones',
        editable: admin,
        fields: [
            {name: 'dimension'              ,typeName:'text'      ,nullable:false},
            {name: 'agrupacion_principal'   ,typeName:'text'      ,nullable:false},
            {name: 'denominacion'           ,typeName:'text'      },
            {name: 'orden'                  ,typeName:'integer'   },
            {name: 'ocultar'                ,typeName:'boolean'   },
            {name: 'icono'                  ,typeName:'text'      },
        ],
        primaryKey:['dimension'],
        foreignKeys:[{references:'agrupacion_principal', fields:['agrupacion_principal']}],
        detailTables:[
            {table: 'indicadores', fields:['dimension'], abr:'I', label:'indicadores'}
        ]
    }
}
