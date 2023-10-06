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

// ...

// Fungsi untuk menampilkan detail fitur yang dipilih di tabel
function displayFeatureInfo(evt) {
    const coordinate = evt.coordinate;
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });

    if (feature) {
        const name = feature.get('name');
        const type = feature.getGeometry().getType();
        const coordinates = feature.getGeometry().getCoordinates();
        document.getElementById('popupinfo-title').textContent = name;
        document.getElementById('popupinfo-content').textContent = `Type: ${type}, Coordinates: ${JSON.stringify(coordinates)}`;
    } else {
        document.getElementById('popupinfo-title').textContent = '';
        document.getElementById('popupinfo-content').textContent = '';
    }
}

map.on('click', displayFeatureInfo);

// ...


// table
document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("point-table").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugasi-gis/main/chap02/geojson/point.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinatCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.name;
                    kordinatCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const polygonTable = document.getElementById("polygon-table").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/geojson/polygon.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = polygonTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinatCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.name;
                    kordinatCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const polylineTable = document.getElementById("polyline-table").getElementsByTagName('tbody')[0];

    fetch("https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugasi-gis/main/chap02/geojson/linestring.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = polylineTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinatCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.name;
                    kordinatCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([106.83303856987703, -6.479261060743909]),
            zoom: 15.3
        })
    });

    // Mendownload data waypoint, line string, dan polyline
    const waypointSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/geojson/point.json',
        format: new ol.format.GeoJSON()
    });

    const lineStringSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/geojson/polygon.json',
        format: new ol.format.GeoJSON()
    });

    const polylineSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/geojson/linestring.json',
        format: new ol.format.GeoJSON()
    });

    // Membuat layer untuk point, line string, dan polygon
    const waypointLayer = new ol.layer.Vector({
        source: waypointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'Orange'
                })
            })
        })
    });

    const lineStringLayer = new ol.layer.Vector({
        source: lineStringSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'Yellow',
                width: 2
            })
        })
    });

    const polylineLayer = new ol.layer.Vector({
        source: polylineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2

            })
        })
    });

    // Menambahkan layer ke peta
    map.addLayer(poitLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polygonLayer);

    // Mendapatkan koordinat dari GeoJSON
    const getCoordinates = (source) => {
        const features = source.getFeatures();
        const coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    };

    // Menampilkan koordinat di dalam tabel
    waypointSource.once('change', () => {
        const waypointCoords = getCoordinates(waypointSource);
        document.getElementById('nama').textContent = 'Point';
        document.getElementById('tipe').textContent = 'Point';
        document.getElementById('kordinat').textContent = waypointCoords.toString();
    });

    lineStringSource.once('change', () => {
        const lineStringCoords = getCoordinates(lineStringSource);
        document.getElementById('featureName').textContent = 'Line String';
        document.getElementById('featureType').textContent = 'Line String';
        document.getElementById('featureCoords').textContent = lineStringCoords.toString();
    });

    polylineSource.once('change', () => {
        const polylineCoords = getCoordinates(polylineSource);
        document.getElementById('featureName').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = polylineCoords.toString();
    });
});


// Menambahkan layer ke peta
map.addLayer(waypointLayer);
map.addLayer(lineStringLayer);
map.addLayer(polylineLayer);

// Mendapatkan koordinat dari GeoJSON
function getCoordinates(source) {
    var features = source.getFeatures();
    var coordinates = features[0].getGeometry().getCoordinates();
    return coordinates;
}

// Menampilkan koordinat di dalam tabel
waypointSource.once('change', function () {
    var waypointCoords = getCoordinates(waypointSource);
    document.getElementById('featurename').textContent = 'Waypoint';
    document.getElementById('featureType').textContent = 'Point';
    document.getElementById('featureCoords').textContent = waypointCoords.toString();
});

lineStringSource.once('change', function () {
    var lineStringCoords = getCoordinates(lineStringSource);
    document.getElementById('featurename').textContent = 'Line String';
    document.getElementById('featureType').textContent = 'Line String';
    document.getElementById('featureCoords').textContent = lineStringCoords.toString();
});

polylineSource.once('change', function () {
    var polylineCoords = getCoordinates(polylineSource);
    document.getElementById('nama').textContent = 'Polyline';
    document.getElementById('tipe').textContent = 'Polyline';
    document.getElementById('kordinat').textContent = polylineCoords.toString();
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

// fungsi pengubahan nama,npm,kelas dan dosen pengampu
// 


document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([106.83303856987703, -6.479261060743909]),
            zoom: 15.3
        })
    });

    // Mendownload data waypoint, line string, dan polyline
    const waypointSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/point.json',
        format: new ol.format.GeoJSON()
    });

    const lineStringSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/polygon.json',
        format: new ol.format.GeoJSON()
    });

    const polylineSource = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap02/linestring.json',
        format: new ol.format.GeoJSON()
    });

    // Membuat layer untuk waypoint, line string, dan polyline
    const waypointLayer = new ol.layer.Vector({
        source: waypointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'Orange'
                })
            })
        })
    });

    const lineStringLayer = new ol.layer.Vector({
        source: lineStringSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'Yellow',
                width: 2
            })
        })
    });

    const polylineLayer = new ol.layer.Vector({
        source: polylineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            })
        })
    });

    // Menambahkan layer ke peta
    map.addLayer(waypointLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polylineLayer);

    // Menampilkan koordinat di dalam tabel
    const displayFeatureInfo = (evt) => {
        const coordinate = evt.coordinate;
        const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
        });

        if (feature) {
            const name = feature.get('name');
            const type = feature.getGeometry().getType();
            const coordinates = feature.getGeometry().getCoordinates();
            document.getElementById('featureName').textContent = name;
            document.getElementById('featureType').textContent = type;
            document.getElementById('featureCoords').textContent = JSON.stringify(coordinates);
        } else {
            document.getElementById('featureName').textContent = '';
            document.getElementById('featureType').textContent = '';
            document.getElementById('featureCoords').textContent = '';
        }
    };

    map.on('click', displayFeatureInfo);

    // ... (kode lainnya) ...
});








