window.onload = function () {
    console.log("DOM ready!");

    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted!");

        const nom = document.getElementById("nom").value;
        const prenom = document.getElementById("prenom").value;
        const email = document.getElementById("email").value;
        const dateNaissance = document.getElementById("dateNaissance").value;
        const adresse = document.getElementById("adresse").value;

        if (!validateText(nom)) {
            alert("Le nom doit contenir au moins 5 caractères.");
            return;
        }

        if (!validateText(prenom)) {
            alert("Le prénom doit contenir au moins 5 caractères.");
            return;
        }

        if (!validateText(adresse)) {
            alert("L'adresse doit contenir au moins 5 caractères.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Veuillez entrer un email valide.");
            return;
        }

        if (!validateDateNaissance(dateNaissance)) {
            alert("Veuillez entrer une date de naissance valide.");
            return;
        }

        var myModal = new bootstrap.Modal(document.getElementById("myModal"));
        const modalBody = document.getElementById("modalBodyContent");
        modalBody.innerHTML = `
            <h5>Bienvenue ${prenom} ${nom}</h5>
            <p>Vous êtes né(e) le ${dateNaissance} et vous habitez au :</p>
            <p><a href="http://maps.google.com/maps?q=${encodeURIComponent(adresse)}">${adresse}</a></p>
            <img src="https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(adresse)}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" style="width:400px">
        `;
        myModal.show();

    });
};


function validateText(text) {
    return text.length >= 5;
}


function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateDateNaissance(dateNaissance) {
    const birthdayDate = new Date(dateNaissance);
    const birthdayTimestamp = birthdayDate.getTime();
    const nowTimestamp = Date.now();

    return birthdayTimestamp <= nowTimestamp;
}