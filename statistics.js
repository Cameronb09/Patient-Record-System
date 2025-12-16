//count all patients

document.addEventListener("DOMContentLoaded", function () {
  const allPatients = JSON.parse(localStorage.getItem("patients")) || [];

  const totalPatient = allPatients.length;
  const countDiv = document.getElementById("patientCount");
  if (countDiv) {
    countDiv.textContent = "Total Patients: " + totalPatient;
  }

  let underweight = 0;
  let normal = 0;
  let overweight = 0;
  let obese = 0;

  allPatients.forEach(p => {
    switch (p.bmiCategory) {
        case "Underweight":
            underweight++
            break;
        case "Normal":
            normal++
            break;
        case "Overweight":
            overweight++
            break;
        case "Obese":
            obese++
            break;
    }
  })

const bmiNumbers = document.getElementById("patientCount");
bmiNumbers.innerHTML = `
    <p>Total Patients: ${totalPatient}</p>
    <p>Number of Patients Underweight: ${underweight}</p>
    <p>Number of Patients with Normal BMI: ${normal}</p>
    <p>Number of Patients Overweight: ${overweight}</p>
    <p>Number of Patients Obese: ${obese}</p>
`;

const femalePatients = allPatients.filter(p => p.sex && p.sex.toLowerCase() === "female");
console.log(allPatients.map(p => p.sex));

let averageFBMI = 0;
if (femalePatients.length > 0) {
    const totalBMI = femalePatients.reduce((sum, p) => sum + (p.BMI), 0);
    averageFBMI = totalBMI / femalePatients.length;
    }
console.log(femalePatients);
console.log(allPatients);
    const patientCount = document.getElementById("patientCount");
patientCount.innerHTML += `<p>Average BMI for female patients: ${averageFBMI.toFixed(2)}</p>`;
});

