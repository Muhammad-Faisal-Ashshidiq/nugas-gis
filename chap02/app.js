document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];
    const polygonTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];
    const polylineTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let countPoint = 1;
            let countPolygon = 1;
            let countPolyline = 1;

            data.features.forEach(feature => {
                const row = document.createElement("tr");
                const namaCell = document.createElement("td");
                const kordinattesCell = document.createElement("td");
                const tipeCell = document.createElement("td");

                namaCell.innerText = feature.properties.nama;
                kordinattesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                tipeCell.innerText = feature.geometry.type;

                row.appendChild(document.createElement("th"));
                row.appendChild(namaCell);
                row.appendChild(kordinattesCell);
                row.appendChild(tipeCell);

                if (feature.geometry.type === "Point") {
                    row.getElementsByTagName("th")[0].innerText = countPoint;
                    pointTable.appendChild(row);
                    countPoint++;
                } else if (feature.geometry.type === "Polygon") {
                    row.getElementsByTagName("th")[0].innerText = countPolygon;
                    polygonTable.appendChild(row);
                    countPolygon++;
                } else if (feature.geometry.type === "LineString") {
                    row.getElementsByTagName("th")[0].innerText = countPolyline;
                    polylineTable.appendChild(row);
                    countPolyline++;
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

// fungsi pengubahan nama,npm,kelas dan dosen pengampu
document.addEventListener("DOMContentLoaded", () => {
    // Mengambil data dari local storage jika sudah ada
    const storedName = localStorage.getItem("name");
    const storedNpm = localStorage.getItem("npm");
    const storedClass = localStorage.getItem("class");
    const storedLecturer = localStorage.getItem("lecturer");

    // Mengisi input dan teks dengan data yang diambil
    nameElement.textContent = storedName || "Muhammad Faisal Ashshidiq";
    npmInput.value = storedNpm || "";
    classInput.value = storedClass || "";
    lecturerInput.value = storedLecturer || "";

    // ... (kode lainnya) ...

    // Fungsi untuk mengubah nama, NPM, dan dosen pengampu
    settingsMenu.addEventListener("click", () => {
        const currentName = nameElement.textContent.trim();
        const currentNpm = npmInput.value;
        const currentClass = classInput.value;
        const currentLecturer = lecturerInput.value;

        const newName = prompt("Edit your name:", currentName);
        if (newName !== null && newName !== "") {
            nameElement.textContent = newName;

            // Menyimpan nama ke local storage
            localStorage.setItem("name", newName);
        }

        npmInput.value = prompt("Edit NPM:", currentNpm) || currentNpm;
        classInput.value = prompt("Edit Kelas:", currentClass) || currentClass;
        lecturerInput.value = prompt("Edit Dosen Pengampu:", currentLecturer) || currentLecturer;

        // Menyimpan NPM, kelas, dan dosen pengampu ke local storage
        localStorage.setItem("npm", npmInput.value);
        localStorage.setItem("class", classInput.value);
        localStorage.setItem("lecturer", lecturerInput.value);
    });

    // ... (kode lainnya) ...
});


