document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("new");

    // no digits in first name
    const fNameInput = document.getElementById("fName");
    const errorDiv = document.getElementById("fError");

    fNameInput.addEventListener("input", function () {
        if (/[^A-Za-z]/.test(this.value)) {
            errorDiv.textContent = "Numbers and special characters cannot be used in the first name";
            this.value = this.value.replace(/[^A-Za-z]/g, "");
        } else {
            errorDiv.textContent = "";
        }


    });
//lastname
const lNameInput = document.getElementById("lName");
const lError = document.getElementById("lError");

lNameInput.addEventListener("input", function () {
    const value = this.value;


    if (!/^[A-Za-z'-]+$/.test(value)) {
        lError.textContent = "Only letters, one hyphen, and up to two quotes allowed.";
        return;
    }


    if (/^['-]|['-]$/.test(value)) {
        lError.textContent = "Hyphen/quotes cannot be at start or end.";
        return;
    }


    if (/['-]{2}/.test(value)) {
        lError.textContent = "Hyphen/quotes cannot be adjacent.";
        return;
    }


    if ((value.match(/-/g) || []).length > 1) {
        lError.textContent = "Only one hyphen allowed.";
        return;
    }


    if ((value.match(/'/g) || []).length > 2) {
        lError.textContent = "Only up to two quotes allowed.";
        return;
    }


    lError.textContent = "";
});



    // date of birth
    const dobInput = document.getElementById("DOB");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const dobValue = dobInput.value;
        if (!dobValue) return;

        const DOB = new Date(dobValue);
        const today = new Date();

        if (DOB >= today) {
            alert("Date of Birth is not in the past.");
            return;
        }

        // over 120 years
        let age = today.getFullYear() - DOB.getFullYear();
        const m = today.getMonth() - DOB.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) {
            age--;
        }

        if (age < 0 || age > 120) {
            alert("Age must be under 120 years.");
            return;
        }

        // BMI
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        function BMIcalc(weight, height) {
            if (height <= 0) return null;
            return weight / ((height / 100) ** 2);
        }

        const BMI = BMIcalc(weight, height);
        const roundedBMI = BMI ? parseFloat(BMI.toFixed(2)) : null;
        const bmiCategory = getBMIcategory(roundedBMI);

        const patient = {
            firstName: document.getElementById("fName").value,
            lastName: document.getElementById("lName").value,
            dob: document.getElementById("DOB").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            sex: document.getElementById("sex").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            BMI: roundedBMI,
            bmiCategory: bmiCategory,
            info: document.getElementById("info").value,
            id: genUniqueID()
        };

        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        patients.push(patient);
        localStorage.setItem("patients", JSON.stringify(patients));

        console.log("New patient added: ", patient);
        this.reset();

        window.location.href = "success.html";
    });

    //phone
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    phoneInput.addEventListener("input", function () {
        if (!/^07\d{0,9}$/.test(this.value)) {
            phoneError.textContent = "Phone number must start with 07";
        } else {
            phoneError.textContent = "";
        }
    });

// unique id:
     function genUniqueID() {
        return Math.random().toString(36).substring(2, 8);
      }

// find the bmi category
function getBMIcategory(bmi) {
    if(bmi<18.5) return "Underweight";
    if(bmi>=18.5 && bmi <24.9) return "Normal";
    if(bmi>=25.0 && bmi <29.9) return "Overweight";
    return "Obese";
}


//delete a patient

//function deletePatient(id) {
//    let patients = JSON.parse(localStorage.getItem("patients")) || [];
//    patients = patients.filter(p=> p.id !== id);
//    localStorage.setItem("patients", JSON.stringify(patients));
//    displayPatients(patients);
//}
});