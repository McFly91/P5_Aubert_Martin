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

// Envoi du formulaire
/*const formValidation = () => {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //callback(request.responseText);
            console.log("ok");
        }
        else {
            console.error(request.status + " " + request.statusText + " http://localhost:3000/api/cameras/order");
        };        

        request.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + "http://localhost:3000/api/cameras/order");
        });
    };
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(contact));
};
*/
let submit = document.getElementById("btn_submit");

submit.addEventListener("submit", () => { 
    let form = document.getElementsByClassName("needs-validation");
    let contact = new FormData(form);
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //callback(request.responseText);
            console.log("ok 2");
        }
    }               
    formValidation();
    console.log("formulaire " + JSON.stringify(contact) + " a été envoyé au serveur");
});


