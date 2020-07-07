// Fonction pour garder le nombre d'article dans le panier après un chargement de la page
const cartNumbers = () => {
    let cameraNumbers = localStorage.getItem("totalInCart");
    if (cameraNumbers) {
        document.getElementById("number_in_cart").textContent = cameraNumbers;
    }
};

cartNumbers();

// Fonction pour ajouter les éléments sur la page panier
const cart = () => {
    let cameraInCart = localStorage.getItem("cameraInCart")
    cameraInCart = JSON.parse(cameraInCart);
    let cartTable = document.getElementById("cart_table");
    let totalCart = document.getElementById("total");
    let clearCart = document.getElementById("clear");

    // Si il y a des articles dans le panier, on les ajoute sur la page panier
    if (cartTable && cameraInCart) {
        Object.values(cameraInCart).map(camerasInCart => {
            let total = camerasInCart.inCart * camerasInCart.price;
            cartTable.innerHTML += "<tr><td><img class='d-none d-md-inline w-25 px-2' src=" + camerasInCart.image + ">" + camerasInCart.name + "</td><td class='text-center'>" + camerasInCart.price + 
            "</td><td class='text-center'>" + camerasInCart.inCart + "</td><td class='text-right px-0 total'>" + total + "</td></tr>"

            tdTotal = document.getElementsByClassName("total");

            // Boucle qui vient récupérer le prix total de chaque caméra pour les envoyer vers le prix total
            let totalCameras = 0;
            for (i = 0; i < tdTotal.length; i++) {
                totalCameras = totalCameras + parseFloat(tdTotal[i].innerText);
            }
            totalCart.innerHTML = totalCameras;

            // Fonction pour vider la panier
            clearCart.addEventListener("click", () => {
                localStorage.clear();
                document.location.reload(true);
            });
        });
    };
};
cart();

let form = document.getElementById("form");
let inputs = document.getElementsByClassName("form-control");
let contact = {};

// On vérifie que les valeurs saisies du formulaire correspondent aux restrictions de champs
form.addEventListener("keyup", () => {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].validity.typeMismatch == true || inputs[i].validity.patternMismatch == true) {
            inputs[i].style.border = "2px solid #dc3545";
            console.log("erreur");        
        }
        else {
            inputs[i].style.border = "none";
        }
    }

    // On récupère les valeurs saisies dans les champs du formualire
    let firstName = document.getElementById("validationServer01").value;
    let lastName = document.getElementById("validationServer02").value;
    let adress = document.getElementById("validationServer03").value;
    let city = document.getElementById("validationServer04").value;
    let email = document.getElementById("validationServer05").value;

    // On crée un objet contact qui récupère toutes les infos saisies
    contact = {
        firstName,
        lastName,
        adress,
        city,
        email
    };
    console.log(contact);
});

let products = localStorage.getItem("cameraInCart");
products = JSON.stringify(products);

console.log(products);

let request = new XMLHttpRequest();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    request.open("POST", "http://localhost:3000/api/cameras/order", true);
    request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE) {
        let status = request.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          console.log(request.responseText);
        } 
        else {
          console.log("There has been an error with the request!");
        };
      };
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(contact + products);

    console.log("envoyé");
});












/*

// Envoi du formulaire
/*const formValidation = (contact) => {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState >= XMLHttpRequest.DONE && this.status < 200) {
            //callback(request.responseText);
            console.log("ok");
        }
        else {
            console.error(request.status + " " + request.statusText + " http://localhost:3000/api/cameras/order");
        };        
        
        let contact = new FormData(form);   
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(contact));

        request.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + "http://localhost:3000/api/cameras/order");
        });
    };

    submit.addEventListener("submit", (e) => { 
        e.preventDefault;
    });
    
};

let submit = document.getElementById("btn_submit");

let form = document.getElementsByClassName("needs-validation");
            
    formValidation(contact);
    console.log("formulaire " + JSON.stringify(contact) + " a été envoyé au serveur");
    console.log(submit);
});*/