import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
import {tableTemplate, tableRowClass, tableTag} from "../template/template.js"

export function isiRowPoint(value){
    if (value.geometry.type === "Point") {
    let content=tableTemplate.replace("#tipe#",value.geometry.type).replace("#nama#",value.properties.Name).replace("#kordinat#",value.geometry.coordinates);
    // console.log(content);
    addChild("lokasi",tableTag,tableRowClass,content);
    }
}

export function isiRowPolygon(value){
    if (value.geometry.type === "Polygon") {
    let content=tableTemplate.replace("#tipe#",value.geometry.type).replace("#nama#",value.properties.Name).replace("#kordinat#",value.geometry.coordinates);
    // console.log(content);
    addChild("polygon",tableTag,tableRowClass,content);
    }
}

export function isiRowPolyline(value){
    if (value.geometry.type === "LineString") {
    let content=tableTemplate.replace("#tipe#",value.geometry.type).replace("#nama#",value.properties.Name).replace("#kordinat#",value.geometry.coordinates);
    // console.log(content);
    addChild("line",tableTag,tableRowClass,content);
    }
}

export function responseData(results){
    // console.log(results.features);
    results.features.forEach(isiRowPoint);
    results.features.forEach(isiRowPolygon);
    results.features.forEach(isiRowPolyline);
}
export function responseData(results){
    // console.log(results.features);
    results.features.forEach(isiRowPoint);
    results.features.forEach(isiRowPolygon);
    results.features.forEach(isiRowPolyline);
    results.features.forEach(ColorSwitcher);
}

export function ColorSwitcher(value, map, source){
    if (value.geometry.type === "Polygon") {
        const LineLayer = new ol.layer.Vector({
            source: pointSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'Orange',
                    width: 4
                })
            })
        });
        map.addLayer(LineLayer)
}
}