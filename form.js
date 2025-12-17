document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("new");
  let patients = JSON.parse(localStorage.getItem("patients")) || [];

  const urlParams = new URLSearchParams(window.location.search);
  const patientId = urlParams.get("id");
  if (patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      document.getElementById("fName").value = patient.firstName;
      document.getElementById("lName").value = patient.lastName;
      document.getElementById("DOB").value = patient.dob;
      document.getElementById("height").value = patient.height;
      document.getElementById("weight").value = patient.weight;
      document.getElementById("sex").value = patient.sex;
      document.getElementById("phone").value = patient.phone;
      document.getElementById("email").value = patient.email;
      document.getElementById("info").value = patient.info;
    }
  }

    // no digits in first name
  const fNameInput = document.getElementById("fName");
  const fError = document.getElementById("fError");
  fNameInput.addEventListener("input", function () {
    if (/[^A-Za-z]/.test(this.value)) {
      fError.textContent = "Numbers and special characters cannot be used in the first name";
      this.value = this.value.replace(/[^A-Za-z]/g, "");
    } else {
      fError.textContent = "";
    }
  });

//lastname
  const lNameInput = document.getElementById("lName");
  const lError = document.getElementById("lError");
  lNameInput.addEventListener("input", function () {
    const value = this.value;
    if (!/^[A-Za-z'-]+$/.test(value)) { lError.textContent = "Only letters, one hyphen, and up to two quotes allowed."; return; }
    if (/^['-]|['-]$/.test(value)) { lError.textContent = "Hyphen/quotes cannot be at start or end."; return; }
    if (/['-]{2}/.test(value)) { lError.textContent = "Hyphen/quotes cannot be adjacent."; return; }
    if ((value.match(/-/g) || []).length > 1) { lError.textContent = "Only one hyphen allowed."; return; }
    if ((value.match(/'/g) || []).length > 2) { lError.textContent = "Only up to two quotes allowed."; return; }
    lError.textContent = "";
  });

//phone
  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  phoneInput.addEventListener("input", function () {
    if (!/^07\d{9}$/.test(this.value)) {
      phoneError.textContent = "Phone number must start with 07 and be 11 digits long.";
    } else {
      phoneError.textContent = "";
    }
  });

//unique id
  function genUniqueID() {
    return Math.random().toString(36).substring(2, 8);
  }

  //find bmi category
  function getBMIcategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi <= 24.9) return "Normal";
    if (bmi <= 29.9) return "Overweight";
    return "Obese";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

//stop submission if error in lastname
  const lastName = document.getElementById("lName").value;
  if (!/^[A-Za-z'-]+$/.test(lastName) ||
      /^['-]|['-]$/.test(lastName) ||
      /['-]{2}/.test(lastName) ||
      (lastName.match(/-/g) || []).length > 1 ||
      (lastName.match(/'/g) || []).length > 2) {
    alert(lError.textContent);
    return;
    }

//stop submission if error in phone no
 const phoneValue = document.getElementById("phone").value;
 const phoneError = document.getElementById("phoneError");

 if (!/^07\d{9}$/.test(phoneValue)) {
   alert(phoneError.textContent);
   return;
 } else {
   phoneError.textContent = "";
 }


//date of birth
    const dobValue = document.getElementById("DOB").value;
    if (!dobValue) { alert("Please enter Date of Birth."); return; }
    const DOB = new Date(dobValue);
    const today = new Date();
    if (DOB >= today) { alert("Date of Birth is not in the past."); return; }
    //over 120 years
    let age = today.getFullYear() - DOB.getFullYear();
    const m = today.getMonth() - DOB.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) age--;
    if (age < 0 || age > 120) { alert("Age must be under 120 years."); return; }
    const patientAge = age;

    // BMI calculation
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    if (!height || !weight || height <= 0 || weight <= 0) { alert("Please enter valid height and weight."); return; }
    const BMI = weight / ((height / 100) ** 2);
    const roundedBMI = parseFloat(BMI.toFixed(2));
    const bmiCategory = getBMIcategory(roundedBMI);

    if (patientId) {
      // modify patient
      const index = patients.findIndex(p => p.id === patientId);
      if (index !== -1) {
        patients[index] = {
          ...patients[index],
          firstName: document.getElementById("fName").value,
          lastName: document.getElementById("lName").value,
          dob: dobValue,
          height: document.getElementById("height").value,
          weight: document.getElementById("weight").value,
          sex: document.getElementById("sex").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          info: document.getElementById("info").value,
          BMI: roundedBMI,
          bmiCategory: bmiCategory
        };
      }
    } else {
//new patient
      const patient = {
        firstName: document.getElementById("fName").value,
        lastName: document.getElementById("lName").value,
        dob: dobValue,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        sex: document.getElementById("sex").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        info: document.getElementById("info").value,
        BMI: roundedBMI,
        bmiCategory: bmiCategory,
        id: genUniqueID()
      };
      patients.push(patient);
    }

    localStorage.setItem("patients", JSON.stringify(patients));
    window.location.href = "success.html";
  });
});