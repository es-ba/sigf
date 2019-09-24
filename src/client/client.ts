import {html} from "js-to-html";
import * as TypedControls from "typed-controls";
import * as bestGlobals from "best-globals";
import * as likeAr from "like-ar";
// import * as React from "react";
// import * as ReactDOM from "react-dom";

var datetime=bestGlobals.datetime;
var changing=bestGlobals.changing;

myOwn.wScreens.matriz=function(addrParams:any){
    ReactDOM.render(React.createElement('h1',{},["Matriz de comparación"]), document.getElementById("main_layout"));
};

myOwn.clientSides.color_pick={
    update:function update(depot, fieldName){
        depot.rowControls[fieldName].childNodes[0].value=depot.rowControls['color'].getTypedValue()
        return; 
    },
    prepare:function prepare(depot, fieldName){
        var colorPicker=html.input({type:'color'}).create();
        colorPicker.value=depot.rowControls['color'].getTypedValue();
        depot.rowControls[fieldName].innerHTML='';
        depot.rowControls[fieldName].appendChild(
            colorPicker
        );
        colorPicker.onchange=function(){
            depot.rowControls['color'].setTypedValue(colorPicker.value,true)
        }
    }
};


myOwn.autoSetupFunctions.push(
    async function getReferences(){
        if(my.config.config['background-img']){
            document.body.style.backgroundImage='url("'+my.path.img+my.config.config['background-img']+'")';
        }
        if(myOwn.offline && myOwn.offline.mode){
            // @ts-ignore // por alguna razón showLupa figura como readonly
            TypedControls.showLupa=false;
        }else{
            myOwn.cache=myOwn.cache||{};
            // myOwn.cache.tabla1 = likeAr.createIndex(await myOwn.getReference('tabla1').dataReady,'tabla1');
            // @ts-ignore // por alguna razón showLupa figura como readonly
            TypedControls.showLupa=0.5;
        }
    }
);

