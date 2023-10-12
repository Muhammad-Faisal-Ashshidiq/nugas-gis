import { get } from "https://jscroot.github.io/api/croot.js";
import { URLGeoJson } from "./template/template.js";
import { responseData } from "./controller/controller.js";
import {map} from './config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';

onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
get(URLGeoJson,responseData); 


    //download data point, polygon, dan polyline
    const pointSource = new ol.source.Vector({
        url: URLGeoJson,
        format: new ol.format.GeoJSON()
    });

    //buat layer untuk point, polygon, dan polyline
    const layerpoint = new ol.layer.Vector({
        source: pointSource,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'img/lokasi.png', 
                scale: 0.6, 
                opacity: 1
            })
        })
    });
    
    const polylayer = new ol.layer.Vector({
        source: pointSource,
        style: function (feature) {
            const featureType = feature.getGeometry().getType();
            
           
            if (featureType === 'Polygon') {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'Orange', 
                        width: 2
                    })
                });
            } else {
                
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'Black', 
                        width: 3
                    })
                });
            }
        }
    });

    map.addLayer(polylayer);
    map.addLayer(layerpoint);

    // Fetch the GeoJSON data
fetch('https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/data.json')
.then(response => response.json())
.then(data => {
    // Process the GeoJSON data and populate the tables
    populateTables(data);
})
.catch(error => console.error("Error fetching GeoJSON data:", error));

// Function to populate the point table with GeoJSON data
function populateTables(data) {
const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];
const polygonTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];
const polylineTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

let pointCounter = 1;
let polygonCounter = 1;
let polylineCounter = 1;

data.features.forEach(feature => {
    const row = document.createElement("tr");
    const namaCell = document.createElement("td");
    const koordinatCell = document.createElement("td");
    const tipeCell = document.createElement("td");

    namaCell.innerText = feature.properties.nama || '';
    koordinatCell.innerText = JSON.stringify(feature.geometry.coordinates);
    tipeCell.innerText = feature.geometry.type;

    row.appendChild(document.createElement("th"));
    row.appendChild(namaCell);
    row.appendChild(koordinatCell);
    row.appendChild(tipeCell);

    switch (feature.geometry.type) {
        case 'Point':
            row.getElementsByTagName("th")[0].innerText = pointCounter;
            pointTable.appendChild(row);
            pointCounter++;
            break;
        case 'Polygon':
            row.getElementsByTagName("th")[0].innerText = polygonCounter;
            polygonTable.appendChild(row);
            polygonCounter++;
            break;
        case 'LineString':
            row.getElementsByTagName("th")[0].innerText = polylineCounter;
            polylineTable.appendChild(row);
            polylineCounter++;
            break;
    }
});
}

