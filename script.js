// FORMULARIO 1
document.getElementById("ppsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const departamento = document.getElementById("departamento").value;
  const edad = parseInt(document.getElementById("edad").value);
  const puntualidad = parseFloat(document.getElementById("puntualidad").value);
  const productividad = parseFloat(document.getElementById("productividad").value);
  const trabajoEquipo = parseFloat(document.getElementById("trabajoEquipo").value);
  const resultadoDiv = document.getElementById("resultadoContenido");

  if (!nombre || !departamento || isNaN(edad) || edad < 18) {
    resultadoDiv.textContent = "Datos inválidos o incompletos. Verifique e intente nuevamente.";
    resultadoDiv.style.color = "red";
    return;
  }

  const promedio = ((puntualidad + productividad + trabajoEquipo) / 3).toFixed(2);
  let evaluacion = promedio >= 8 ? "Excelente" : promedio >= 6 ? "Bueno" : "Deficiente";

  resultadoDiv.innerHTML = `
    <h3>Resultado de Evaluación</h3>
    <p><strong>Empleado:</strong> ${nombre}</p>
    <p><strong>Departamento:</strong> ${departamento}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Promedio:</strong> ${promedio}</p>
    <p><strong>Evaluación:</strong> ${evaluacion}</p>
  `;
  resultadoDiv.style.color = "#006600";

  const ctx = document.getElementById("graficoDesempeno").getContext("2d");
  if (window.grafico) window.grafico.destroy();
  window.grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Puntualidad", "Productividad", "Trabajo en equipo"],
      datasets: [{
        data: [puntualidad, productividad, trabajoEquipo],
        backgroundColor: ["#0074D9", "#2ECC40", "#FF851B"]
      }]
    },
    options: {
      scales: { y: { beginAtZero: true, max: 10 } },
      plugins: {
        legend: { display: false },
        title: { display: true, text: `Desempeño de ${nombre}` }
      }
    }
  });
});

// FORMULARIO 2
document.getElementById("formCapacitacion").addEventListener("submit", function (e) {
  e.preventDefault();
  const curso = document.getElementById("curso").value.trim();
  const instructor = document.getElementById("instructor").value.trim();
  const satisfaccion = document.getElementById("satisfaccion").value;

  if (!curso || !instructor || !satisfaccion) return;

  const lista = document.getElementById("listaCapacitaciones");
  const item = document.createElement("li");
  item.textContent = `Curso: ${curso} | Instructor: ${instructor} | Satisfacción: ${satisfaccion}/5`;
  lista.appendChild(item);

  this.reset();
});

// FORMULARIO 3
document.getElementById("formAsistencia").addEventListener("submit", function (e) {
  e.preventDefault();
  const empleado = document.getElementById("empleadoAsistencia").value.trim();
  const fecha = document.getElementById("fecha").value;
  const entrada = document.getElementById("horaEntrada").value;
  const salida = document.getElementById("horaSalida").value;

  if (!empleado || !fecha || !entrada || !salida) return;

  const lista = document.getElementById("listaAsistencia");
  const item = document.createElement("li");
  item.textContent = `${empleado} | Fecha: ${fecha} | Entrada: ${entrada} | Salida: ${salida}`;
  lista.appendChild(item);

  this.reset();
});
