// Ruta relativa del archivo Excel que deseas cargar automáticamente.
const filePath = 'LIBRES SEM 41.xlsx';

// Simulamos la selección del archivo automáticamente.
fetch(filePath)
  .then(response => response.arrayBuffer())
  .then(data => {
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const table = document.getElementById("scheduleTable");
    table.innerHTML = XLSX.utils.sheet_to_html(sheet);

    // Aplicar estilo a todas las celdas que contienen "libre"
    const cellsWithLibre = table.querySelectorAll("td");
    cellsWithLibre.forEach(cell => {
        if (cell.textContent.trim().toLowerCase() === "libre") {
            cell.style.backgroundColor = "#FFC000"; // Color de fondo para celdas "libre"
            cell.style.color = "#000000"; // Color del texto en celdas "libre"
        }
    });

    // Aplicar estilo a celdas específicas
    const cellsToStyle = table.querySelectorAll("td");
    cellsToStyle.forEach(cell => {
        const cellText = cell.textContent.trim().toLowerCase();
        if (cellText === "domingo" || cellText === "lunes" || cellText === "martes" || 
            cellText === "miércoles" || cellText === "jueves" || cellText === "viernes" || 
            cellText === "sábado" || cellText === "codigo" || cellText === "nombres") {
            cell.style.backgroundColor = "#006699"; // Color de fondo para celdas específicas
            cell.style.color = "#f5f5f5"; // Color del texto en celdas específicas
            cell.style.fontWeight = "bold"; // Otros estilos según sea necesario
        }
    });

    // Mostrar la tabla después de cargar el archivo y aplicar los estilos
    table.style.display = "table";

  });

  document.getElementById("searchInput").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();
    const table = document.getElementById("scheduleTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName("td")[0]; // Cambiado el índice a 0 para buscar en la primera columna de nombres
        if (nameCell) {
            const nameText = nameCell.textContent.toLowerCase();
            if (nameText.includes(searchValue)) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
});

const table = document.getElementById("scheduleTable");
const headerRows = table.querySelectorAll("thead tr");

function updateHeaderWidths() {
    const dataRows = table.querySelectorAll("tbody tr:first-child td");
    headerRows.forEach((headerRow, index) => {
        const cells = headerRow.querySelectorAll("th");
        cells.forEach((cell, cellIndex) => {
            const dataCell = dataRows[cellIndex];
            cell.style.width = getComputedStyle(dataCell).width;
        });
    });
}

// Llamada inicial para establecer los anchos de las columnas de encabezado
updateHeaderWidths();

window.addEventListener("resize", updateHeaderWidths);

