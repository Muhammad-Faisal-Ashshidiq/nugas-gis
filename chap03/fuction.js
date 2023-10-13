import { get } from "https://jscroot.github.io/api/croot.js";
import { setInner, addChild } from "https://jscroot.github.io/element/croot.js";

export let URLGeoJson = "https://asia-southeast2-faisal-401823.cloudfunctions.net/function-1";
export let tableTag = "tr";

import { tableRowClass } from "../template/template.js";

export let tableTemplate = `
<td>#TIPE#</td>
<td>#NAMA#</td>
<td>#KORDINAT#</td>`;

export function responseData(result) {
    console.log(result);
    result.forEach(isi);
}

export function isi(value) {
    let konten = tableTemplate
        .replace("#TIPE#", value.geometry.type)
        .replace("#NAMA#", value.properties.nama)
        .replace("#KORDINAT#", value.geometry.coordinates);
    console.log(konten);
    addChild("lokasi", tableTag, tableRowClass, konten);
}
