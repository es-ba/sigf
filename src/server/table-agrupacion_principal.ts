"use strict";

import {TableDefinition, TableContext} from "./types-sigf"

export function agrupacion_principal(context:TableContext):TableDefinition{
    var admin = context.user.rol==='admin';
    return {
        name:'agrupacion_principal',
        editable: admin,
        fields: [
            {name: 'agrupacion_principal' ,typeName:'text'          ,nullable:false         },
            {name: 'denominacion'         ,typeName:'text'                                  },
            {name: 'orden'                ,typeName:'integer'                               },
            {name: 'descripcion'          ,typeName:'text'                                  },
            {name: 'leyes'                ,typeName:'text'          ,label:'Leyes asociadas'},
            {name: 'ocultar'              ,typeName:'boolean'                               },
            {name: 'color'                ,typeName:'text'                                  },
            {name: 'icono'                ,typeName:'text'                                  },
        ],
        primaryKey:['agrupacion_principal'],
        detailTables:[
            {table: 'dimensiones', fields:['agrupacion_principal'], abr:'D', label:'dimensiones'}
        ]
    }
}
