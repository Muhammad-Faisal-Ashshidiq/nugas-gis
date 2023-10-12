import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
import {tableTemplate, tableRowClass, tableTag} from "../template/template.js"

export function isiRowPoint(value){
    if (value.geometry.type === "Point") {
    let content=tableTemplate.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.Name).replace("#KORDINAT#",value.geometry.coordinates);
    // console.log(content);
    addChild("lokasi",tableTag,tableRowClass,content);
    }
}

export function isiRowPolygon(value){
    if (value.geometry.type === "Polygon") {
    let content=tableTemplate.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.Name).replace("#KORDINAT#",value.geometry.coordinates);
    // console.log(content);
    addChild("polygon",tableTag,tableRowClass,content);
    }
}

export function isiRowPolyline(value){
    if (value.geometry.type === "LineString") {
    let content=tableTemplate.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.Name).replace("#KORDINAT#",value.geometry.coordinates);
    // console.log(content);
    addChild("line",tableTag,tableRowClass,content);
    }
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

// Create layers for different feature types
const pointLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/data.json',
        format: new ol.format.GeoJSON(),
    }),
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({ color: 'Green' }),
            stroke: new ol.style.Stroke({ color: 'Grey', width: 2 }),
        }),
    }),
});

const polylineLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/data.json',
        format: new ol.format.GeoJSON(),
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'Yellow',
            width: 3,
        }),
    }),
});

const polygonLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/data.json',
        format: new ol.format.GeoJSON(),
    }),
    style: new ol.style.Style({
        fill: new ol.style.Fill({ color: 'green' }),
        stroke: new ol.style.Stroke({
            color: 'Green',
            width: 2,
        }),
    }),
});


