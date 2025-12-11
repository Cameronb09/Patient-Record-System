document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("new");
    const dobInput = document.getElementById("DOB");

    form.addEventListener("submit", function (event) {
          event.preventDefault();


        const dobValue = dobInput.value;
        if (!dobValue) return;

        const DOB = new Date(dobValue);
        const today = new Date();

        if (DOB >= today) {
         alert("Date of Birth is not in the past. ");
        return;
        }
// over 120 years
        let age = today.getFullYear() - DOB.getFullYear();
        const m = today.getMonth() - DOB.getMonth();
        if (m < 0 || (m === 0 && today.getDate() <DOB.getDate())){
            age--;
        }

        if (age < 0 || age > 120) {
            alert("Age must be under 120 years. ");
            return;
        }

       const patient = {
       firstName: document.getElementById("fName").value,
       lastName: document.getElementById("lName").value,
       dob: document.getElementById("DOB").value,
       height: document.getElementById("height").value,
       weight: document.getElementById("weight").value,
       sex: document.getElementById("sex").value,
       phone: document.getElementById("phone").value,
       email: document.getElementById("email").value,
       info: document.getElementById("info").value
       }

       const patients = JSON.parse(localStorage.getItem("patients")) || [];
         patients.push(patient);
         localStorage.setItem("patients", JSON.stringify(patients));

         console.log("New patient added: ", patient);
         this.reset();

        window.location.href="success.html"
    });
 });
