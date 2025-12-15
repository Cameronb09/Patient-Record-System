document.addEventListener("DOMContentLoaded", function () {
  const patientList = document.getElementById("patientList");
    const searchInput = document.getElementById("searchInput");

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
        <p><strong>BMI: </strong> ${patient.BMI} (${patient.bmiCategory})</p>
        <p><strong>Patient ID:</strong> ${patient.id}</p>

    `;
    patientList.appendChild(div);
});

});

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = patients.filter(patient =>
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.dob.toLowerCase().includes(query) ||
      patient.height.toLowerCase().includes(query) ||
      patient.weight.toLowerCase().includes(query) ||
      patient.sex.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.info.toLowerCase().includes(query) ||
      patient.BMI.toLowerCase().includes(query) ||
      patient.id.toLowerCase().includes(query)

      );
    displayPatients(filtered);
  });