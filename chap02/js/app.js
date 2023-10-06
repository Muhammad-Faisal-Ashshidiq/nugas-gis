import {map} from './config/configMaps.js';
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



document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];
    const polygonTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];
    const polylineTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const features = geoJSONToFeatures(data);

            // Loop through the features and add them to the appropriate vector layer.
        features.forEach(feature => {
            if (feature.getGeometry().getType() === 'Point') {
                // Add the feature to the point layer
                layerpoint.getSource().addFeature(feature);
            } else if (feature.getGeometry().getType() === 'Polygon' || feature.getGeometry().getType() === 'LineString') {
                // Add the feature to the polyline or polygon layer
                polylayer.getSource().addFeature(feature);
            }
        });
    })
    .catch(error => console.error("Err:", error));
});


// this is active status profile in realtime
// Simulasi perubahan status aktif (misalnya ketika tombol di klik)
let isActive = true;

// Fungsi untuk mengubah status aktif dan memperbarui teks
function toggleActiveStatus() {
    isActive = !isActive; // Toggle status aktif
    const activeStatusElement = document.getElementById("activeStatus");

    if (isActive) {
        activeStatusElement.textContent = "Online";
    } else {
        activeStatusElement.textContent = "Offline";
    }
}

// Panggil fungsi ini ketika status aktif berubah (misalnya saat tombol di klik)
toggleActiveStatus();


