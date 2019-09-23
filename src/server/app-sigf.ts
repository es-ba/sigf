"use strict";
import * as backendPlus from "backend-plus";
import {Proceduressigf} from "./procedures-sigf";
import {ContextRoles} from "./types-sigf";
import {defConfig} from "./def-config"

import {usuarios} from "./table-usuarios";
import {parametros} from "./table-parametros";

import { Context, Request, MenuDefinition } from "backend-plus";

export type Constructor<T> = new(...args: any[]) => T;
export function emergeAppsigf<T extends Constructor<backendPlus.AppBackend>>(Base:T){
  return class Appsigf extends Base{
    constructor(...args:any[]){ 
        super(args); 
    }
    addSchrödingerServices(mainApp:backendPlus.Express, baseUrl:string){
        super.addSchrödingerServices(mainApp, baseUrl);
    }
    addLoggedServices(){
        super.addLoggedServices();
    }
    postConfig(){
        super.postConfig();
    }
    configStaticConfig(){
        super.configStaticConfig();
        this.setStaticConfig(defConfig);
    }
    clientIncludes(req:Request, hideBEPlusInclusions:boolean){
        return super.clientIncludes(req, hideBEPlusInclusions).concat([
            {type:'js' , src:'client/client.js' },
            {type:'css', file:'styles.css'},
        ])
    }
    getContextForDump(){
        return {es:{admin:true, gabinete:true, coordinador:true}, ...super.getContextForDump()};
    }
    getContext(req:Request):Context & ContextRoles{
        var context = super.getContext(req);
        var cr:ContextRoles;
        // @ts-ignore // inicializo vacío pero después agrego todo
        var es:typeof cr.es={};
        if(req.user){
            es.admin       = req.user.rol=='admin';
            es.gabinete    = req.user.rol=='gabinete'    || es.admin ;
            es.coordinador = req.user.rol=='coordinador' || es.gabinete ;
        }
        return {es, ...context};
    }
    async getProcedures(){
        var parentProc = await super.getProcedures();
        return parentProc.concat(Proceduressigf);
    }
    getMenu(context:Context&ContextRoles){
        var menus:backendPlus.MenuInfoBase[]=[];
        if(context.es.gabinete){
            menus.push(
                {menuType:'menu', name:'configurar', menuContent:[
                    {menuType:'table', name:'parametros'} ,
                    {menuType:'table', name:'usuario'   } ,
                ]},
            )
        }
        let menu:MenuDefinition = {
            menu:menus
        }
        return <backendPlus.MenuDefinition>menu;
    }
    prepareGetTables(){
        super.prepareGetTables();
        var newList={
            ...this.getTableDefinition,
            usuarios,
            parametros,
        }
        // @ts-ignore // problema con el parámetro de context. 
        this.getTableDefinition=newList;
    };
  }
}