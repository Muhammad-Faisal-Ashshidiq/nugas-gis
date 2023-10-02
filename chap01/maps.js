const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([107.6922831473251,-6.908922429775714]),
        zoom: 2
    })
});

const tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});
map.addLayer(tileLayer);

function addGeoJSONToMapAndTable(geoJSONUrl, map, table) {
    fetch(geoJSONUrl)
        .then(response => response.json())
        .then(data => {
            const vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(data)
            });
            const vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            map.addLayer(vectorLayer);

            let rowNum = 1;

            const tableBody = document.getElementById('geojson-table');

            data.features.forEach(feature => {
                const row = tableBody.insertRow();
                const noCell = row.insertCell(0);
                const namaCell = row.insertCell(1);
                const kordinatCell = row.insertCell(2);
                const tipeCell = row.insertCell(3);
                noCell.innerHTML = rowNum;
                namaCell.innerHTML = feature.properties.nama;
                kordinatCell.innerHTML = feature.properties.nama;
                tipeCell.innerHTML = feature.properties.nama;

                const kordinat = feature.geometry.kordinat;
                let kordinatString = "";

                if (feature.geometry.type === "Point") {
                    const lat = coordinates[1];
                    const long = coordinates[0];
                    coordinateString = `${lat}, ${long}`;

                    // Extract the icon URL from GeoJSON properties
                    const iconUrl = feature.properties.icon; // Replace 'icon' with the actual property name
                    const iconUrl2 = feature.properties.icon; 
                    const iconUrl3 = feature.properties.icon;
                    // Replace 'icon' with the actual property name
                    // Add a marker to the map for Point features
                    const marker = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat]))
                    });

                    if (iconUrl) {
                        const markerStyle = new ol.style.Style({
                            image: new ol.style.Icon({
                                src: iconUrl,
                                scale: 0.1 // Adjust the scale as needed
                            }),
                            imagee: new ol.style.Icon({
                                src: iconUrl2,
                                scale: 0.1 // Adjust the scale as needed
                            }),
                            imageee: new ol.style.Icon({
                                src: iconUrl3,
                                scale: 0.1 // Adjust the scale as needed
                            })
                        });
                        marker.setStyle(markerStyle);
                    }

                    vectorSource.addFeature(marker);
                } else if (feature.geometry.type === "LineString" || feature.geometry.type === "Polygon") {
                    // Create a feature for LineString and Polygon
                    const geometry = new ol.geom[feature.geometry.type](coordinates);
                    const featureGeom = new ol.Feature({
                        geometry: geometry
                    });
                    vectorSource.addFeature(featureGeom);
                }

                coordinates.forEach(coordinate => {
                    const lat = coordinate[1];
                    const long = coordinate[0];
                    coordinateString += `${lat}, ${long}<br>`;
                });

                coordCell.innerHTML = coordinateString;
                typeCell.innerHTML = feature.geometry.type;
                rowNum++;
            });
        })
        .catch(error => {
            console.error('Error fetching GeoJSON:', error);
        });
}

// Call the function for each GeoJSON URL
addGeoJSONToMapAndTable('https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap01/geojsonLinestring.json', map, document.querySelector('table'));
addGeoJSONToMapAndTable('https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap01/geojsonPloygon.json', map, document.querySelector('table'));
addGeoJSONToMapAndTable('https://raw.githubusercontent.com/muhammad-faisal-ashshidiq/nugas-gis/main/chap01/goejsondrawPoint.json', map, document.querySelector('table'));

// Mendapatkan elemen tombol zoom-in dan zoom-out
const zoomOutButton = document.getElementById('zoom-out');
const zoomInButton = document.getElementById('zoom-in');

// Menambahkan event listener untuk zoom-out
zoomOutButton.addEventListener('click', function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom - 1);
});

// Menambahkan event listener untuk zoom-in
zoomInButton.addEventListener('click', function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
});
