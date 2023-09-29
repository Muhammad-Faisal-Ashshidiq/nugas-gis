document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("data.json") 
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinattesCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.Name;
                    kordinattesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Err:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinattesCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.Name;
                    kordinattesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Err:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const namaCell = row.insertCell(0);
                    const kordinattesCell = row.insertCell(1);
                    const tipeCell = row.insertCell(2);
                    namaCell.innerText = feature.properties.Name;
                    kordinattesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    tipeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Err:", error));
});