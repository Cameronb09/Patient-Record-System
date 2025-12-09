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
         alert("Date of Birth is not in the past or over 120 years ago. ");
        return;
        }

        let age = today.getFullYear() - DOB.getFullYear();
        const m = today.getMonth() - DOB.getMonth();
        if (m < 0 || (m === 0 && today.getDate() <DOB.getDate())){
            age--;
        }

        if (age < 0 || age > 120) {
            alert("Age must be under 120 years. ");
            return;
        }
    });
 });
