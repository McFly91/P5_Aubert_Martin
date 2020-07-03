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
    if (cartTable && cameraInCart) {
        Object.values(cameraInCart).map(camerasInCart => {
            let total = camerasInCart.inCart * camerasInCart.price;
            cartTable.innerHTML += "<tr><td><img class='w-25 px-2' src=" + camerasInCart.image + ">" + camerasInCart.name + "</td><td>" + camerasInCart.price + 
            "</td><td>" + camerasInCart.inCart + "</td><td class='total'>" + total + "</td></tr>";
            tdTotal = document.getElementsByClassName("total");

            // Boucle qui vient récupérer le prix total de chaque caméra pour les envoyer vers le prix total
            let totalCameras = 0;
            for (i = 0; i < tdTotal.length; i++) {
                totalCameras = totalCameras + parseFloat(tdTotal[i].innerText);
            }
            totalCart.textContent = totalCameras;
        });
    };
};
cart();

let form = document.getElementById("form");
let inputs = document.getElementsByClassName("form-control");

// On vérifie que les valeurs saisies du formulaire correspondent aux restrictions de champs
form.addEventListener("keyup", () => {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].validity.typeMismatch == true || inputs[i].validity.patternMismatch == true) {
            inputs[i].style.border = "2px solid red";
            console.log("erreur");        
        }
        else {
            inputs[i].style.border = "none";
        }
    }
});

let request = new XMLHttpRequest();
request.open("POST", "http://localhost:3000/api/cameras/order");
request.setRequestHeader("Content-Type", "application/json");
console.log(localStorage.getItem("cameraInCart"));

products = localStorage.getItem("cameraInCart");

request.send(JSON.stringify(products));













/*const formValidation = () => {
    window.addEventListener("load", function () {

        let request = new XMLHttpRequest();

        const sendData = () => {

            contact = new FormData(form);
            contact = JSON.stringify(contact);

            request.open("POST", "http://localhost:3000/api/cameras/order");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(contact);
        };
        
        let form = document.getElementById("formulaire");

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            request.onreadystatechange = function () {

                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status != 200) {
                    let errors = JSON.parse(request.responseText)
                    console.log(errors);
                    }
                    console.log("ok");
                }
                else {
                    console.error(request.status + " " + request.statusText + " http://localhost:3000/api/cameras/order");
                };
            }; 
        
            sendData();
            console.log(JSON.parse(contact));
        });
    
    });
};

formValidation();*/

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