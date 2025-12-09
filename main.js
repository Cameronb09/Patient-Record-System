document.addEventListener("DOMContentLoaded", function () {
  const patientList = document.getElementById("patientList");
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  if (patients.length === 0) {
    patientList.innerHTML = "<p>No patients added. </p>";
    return;
  }

patients.forEach(patient => {
    const div = document.createElement("div");
    div.className = "patientDetails";
    div.innerHTML = `
        <h3>${patient.firstName} ${patient.lastName}</h3>
        <p><strong>DOB: </strong> ${patient.dob}</p>
        <p><strong>Height: </strong> ${patient.height}</p>
        <p><strong>Weight: </strong> ${patient.weight}</p>
        <p><strong>Sex: </strong> ${patient.sex}</p>
        <p><strong>Phone:</strong> ${patient.phone}</p>
        <p><strong>Email:</strong> ${patient.email}</p>
        <p><strong>Health info: </strong> ${patient.info}</p>
    `;
    patientList.appendChild(div);
});

  patientList.innerHTML = html;
});
