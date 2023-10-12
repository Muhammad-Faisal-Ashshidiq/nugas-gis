// import { get } from "https://jscroot.github.io/api/croot.js";
// import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
// export let URLGeoJson "";
export let tableTag= "tr";

import { tableRowClass, tableTag } from "../chap02/js/template/template";

export let tableRowClass= "content is-small";
export let tableTemplate= `
<td>#TIPE#</td>
<td>#NAMA#</td>
<td>#KORDINAT#</td>`

export function responseData(result){
    console.log(result);
    results.forEach(isi);
}

export function isi(value){
    let konten = tableTemplate
    .replace("#TIPE#",value.geometry.type)
    .replace("#NAMA#",value.properties.nama)
    .replace("#KORDINAT#",value.geometry.coordinates);
console.log(konten);
addChild("lokasi",tableTag,tableRowClass,konten);
}
