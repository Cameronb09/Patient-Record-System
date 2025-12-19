document.addEventListener("DOMContentLoaded", function () {
  const patientList = document.getElementById("patientList");
  const searchInput = document.getElementById("searchInput");
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  function displayPatients(list) {
    patientList.innerHTML = "";
    if (list.length === 0) {
      patientList.innerHTML = "<p>No patients found.</p>";
      return;
    }
    list.forEach(patient => {
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
        <button class="deleteButton" data-id="${patient.id}">Delete</button>
        <button class="modifyButton" data-id="${patient.id}">Modify</button>
        `;
      patientList.appendChild(div);
    });

    document.querySelectorAll(".deleteButton").forEach(button => {
      button.addEventListener("click", function () {
        const patientDelete = this.getAttribute("data-id");
        deletePatient(patientDelete);
      });
    });

    document.querySelectorAll(".modifyButton").forEach(button => {
          button.addEventListener("click", function () {
            const patientMod = this.getAttribute("data-id");
            modifyPatient(patientMod);
          });
        });
  }

  displayPatients(patients);

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = patients.filter(patient =>
      (patient.firstName && patient.firstName.toLowerCase().includes(query)) ||
      (patient.lastName && patient.lastName.toLowerCase().includes(query)) ||
      (patient.dob && String(patient.dob).toLowerCase().includes(query)) ||
      (patient.height && String(patient.height).toLowerCase().includes(query)) ||
      (patient.weight && String(patient.weight).toLowerCase().includes(query)) ||
      (patient.sex && patient.sex.toLowerCase().includes(query)) ||
      (patient.phone && String(patient.phone).toLowerCase().includes(query)) ||
      (patient.email && patient.email.toLowerCase().includes(query)) ||
      (patient.info && patient.info.toLowerCase().includes(query)) ||
      (patient.BMI && String(patient.BMI).toLowerCase().includes(query)) ||
      (patient.bmiCategory && patient.bmiCategory.toLowerCase().includes(query)) ||
      (patient.id && patient.id.toLowerCase().includes(query))
    );

    displayPatients(filtered);
  });

function deletePatient(id) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients = patients.filter(p => p.id !== id);
    localStorage.setItem("patients", JSON.stringify(patients));
    displayPatients(patients);
    alert("Patient deleted");
}

function modifyPatient(id){
    window.location.href = `index.html?id=${id}`;
}

//sort patients
const sort = document.getElementById("sort");

sort.addEventListener("change", function () {
  const sortBy = this.value;
  let sorted = [...patients];

  if (sortBy) {
    sorted.sort((a, b) => {
      if (sortBy === "dob") {
        return new Date(a.dob) - new Date(b.dob);
      }
      if (sortBy === "BMI") {
        return a.BMI - b.BMI;
      }
      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    });
  }

  displayPatients(sorted);
});

//filter patients

const filter = document.getElementById("filter");

filter.addEventListener("change", function () {
  const filterBy = this.value.toLowerCase();
  let filtered = patients;

  if (filterBy) {
    filtered = patients.filter(p =>
      p.sex.toLowerCase() === filterBy || p.bmiCategory.toLowerCase() === filterBy
    );
  }

  displayPatients(filtered);
});

});