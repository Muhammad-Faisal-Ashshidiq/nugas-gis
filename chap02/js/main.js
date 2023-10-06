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

// main.js or app.js
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

// Function to initialize and display the map
function initMap() {
    // Create a map view with a center and zoom level
    const view = new View({
        center: [0, 0], // Center coordinates (e.g., longitude, latitude)
        zoom: 10,       // Initial zoom level
    });

    // Create a tile layer with OpenStreetMap as the source
    const osmLayer = new TileLayer({
        source: new OSM(),
    });

    // Create the map with the view and layers
    const map = new Map({
        target: 'map', // The ID of the div where the map will be displayed
        layers: [osmLayer],
        view: view,
    });

    // Add any additional layers or features to your map here

    return map;
}

// Call the initMap function to create and display the map
const map = initMap();
export default map;


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
                src: 'img/icog.png', 
                scale: 0.5, 
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
                        color: 'blue', 
                        width: 2
                    })
                });
            } else {
                
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'red', 
                        width: 3
                    })
                });
            }
        }
    });

    map.addLayer(polylayer);
    map.addLayer(layerpoint);
