window.onload = function () {
    console.log("DOM ready!");

    document.getElementById("gpsButton").addEventListener("click", function () {
        getLocation();
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            document.getElementById("map").innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
        }
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var latlon = lat + "," + lon;

        document.getElementById("adresse").value = latlon;

        var img_url = `https://maps.googleapis.com/maps/api/staticmap?center=${latlon}&markers=${latlon}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;

        document.getElementById("map").innerHTML = `<img src="${img_url}" alt="Google Map" style="width:400px;">`;
    }

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

        const form = document.getElementById("contactForm");
        form.addEventListener("submit", addContact);

        const resetButton = document.getElementById("resetButton");
        resetButton.addEventListener("click", resetContacts);

        /*var myModal = new bootstrap.Modal(document.getElementById("myModal"));
        const modalBody = document.getElementById("modalBodyContent");
        modalBody.innerHTML = `
            <h5>Bienvenue ${prenom} ${nom}</h5>
            <p>Vous êtes né(e) le ${dateNaissance} et vous habitez au :</p>
            <p><a href="http://maps.google.com/maps?q=${encodeURIComponent(adresse)}">${adresse}</a></p>
            <img src="https://maps.googleapis.com/maps/api/staticmap?markers=${encodeURIComponent(adresse)}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" style="width:400px">
        `;

        myModal.show();*/});





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

function calcNbChar(id) {
    document.querySelector(`#${id} + span`).textContent = document.querySelector(
        `#${id}`
    ).value.length;
}

function displayContactList() {
    const contactListString = localStorage.getItem('contactList'); // ici on va récupérer la liste en forme de chaine de caractère (string)
    const contactList = contactListString ? JSON.parse(contactListString) : [];

    for (const contact of contactList) {
        document.querySelector("table tbody").innerHTML +=
            `<tr>
    <td>${contact.name}</td>
    <td> ${contact.firstName} </td>
    <td> ${contact.date} </td>
    <td> ${contact.adress} </td>
    <td> ${contact.mail} </td>
    <tr>`;
    }
}

