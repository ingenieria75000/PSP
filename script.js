document.getElementById("ppsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Preparación
  const nombre = document.getElementById("nombre").value.trim();
  const departamento = document.getElementById("departamento").value;
  const edad = parseInt(document.getElementById("edad").value);
  const puntualidad = parseFloat(document.getElementById("puntualidad").value);
  const productividad = parseFloat(document.getElementById("productividad").value);
  const trabajoEquipo = parseFloat(document.getElementById("trabajoEquipo").value);
  const resultadoDiv = document.getElementById("resultadoContenido");

  // Validación
  if (!nombre || !departamento || isNaN(edad) || edad < 18) {
    resultadoDiv.textContent = "Datos inválidos o incompletos. Verifique e intente nuevamente.";
    resultadoDiv.style.color = "red";
    return;
  }

  // Procesamiento
  const promedio = ((puntualidad + productividad + trabajoEquipo) / 3).toFixed(2);
  let evaluacion = "";
  if (promedio >= 8) evaluacion = "Excelente";
  else if (promedio >= 6) evaluacion = "Bueno";
  else evaluacion = "Deficiente";

  // Salida textual
  resultadoDiv.innerHTML = `
    <h3>Resultado de Evaluación</h3>
    <p><strong>Empleado:</strong> ${nombre}</p>
    <p><strong>Departamento:</strong> ${departamento}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Promedio de Desempeño:</strong> ${promedio}</p>
    <p><strong>Evaluación:</strong> ${evaluacion}</p>
  `;
  resultadoDiv.style.color = "#006600";

  // Salida gráfica con Chart.js
  const ctx = document.getElementById("graficoDesempeno").getContext("2d");

  // Elimina gráfico anterior si existe
  if (window.grafico) window.grafico.destroy();

  window.grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Puntualidad", "Productividad", "Trabajo en equipo"],
      datasets: [{
        label: "Puntaje (0-10)",
        data: [puntualidad, productividad, trabajoEquipo],
        backgroundColor: ["#0074D9", "#2ECC40", "#FF851B"]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10
        }
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: `Desempeño de ${nombre}`
        }
      }
    }
  });
});
