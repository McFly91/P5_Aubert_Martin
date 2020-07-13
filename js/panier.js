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
            let totalCost = 0;
            for (i = 0; i < tdTotal.length; i++) {
                totalCost = totalCost + parseFloat(tdTotal[i].innerText);
            }
            totalCart.innerHTML = totalCost;

            // On stock le prix total dans le local storage
            localStorage.setItem("prixTotal", totalCost);

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
let submit = document.getElementById("form_submit");
let contact = {};

// On vérifie que les valeurs saisies du formulaire correspondent aux restrictions de champs et on empêche l'envoi du formaulaire dans le cas contraire
form.addEventListener("keyup", () => {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].validity.typeMismatch == true || inputs[i].validity.patternMismatch == true || inputs[i].value == "") {
            inputs[i].style.border = "2px solid #dc3545";
            submit.disabled = true;
        }
        else {
            inputs[i].style.border = "none";
            submit.disabled = false;
        }
    }
});

// On récupère les produits de la page panier
let product = localStorage.getItem("cameraInCart");
product = JSON.parse(product);
let products = [];

// On récupère l'ID des caméras qu'on insère dans un tableau products
if (product !== null) {
    for (let i =0; i < product.length; i++) {
    products.push(product[i]._id);
    };
};

// On crée une fonction pour envoyer le formulaire et le tableau de produits en utilisant une Promesse
const post = (contact) => {
    // On crée une Promesse qui va se résoudre si la connexion avec l'API est OK ou retourner une erreur dans le cas contraire
    return new Promise ((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/cameras/order");
    
        // On vérifie l'état de la requête et on récupère l'ID de confirmation
        request.onreadystatechange = function () {
                if (this.status >= 200 && this.status < 400) {
                    let response = JSON.parse(this.responseText);
                    let orderId = response.orderId;
                    resolve(localStorage.setItem("orderId", orderId));
                }
                else {
                    reject(console.error(request.statusText));
                }
        };
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({contact, products}));
    });
};

// On envoie le formulaire dès l'appui sur le bouton passer commande
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // On crée un objet contact qui récupère toutes les infos saisies dans les champs du formulaire
    let contact = {
        firstName : document.getElementById("validationServer01").value,
        lastName : document.getElementById("validationServer02").value,
        address : document.getElementById("validationServer03").value,
        city : document.getElementById("validationServer04").value,
        email : document.getElementById("validationServer05").value
    };

    // On appelle la fonction et on lui chaine un message puis une redirection vers la page confirmation si la promesse est résolue ou alors on capture l'erreur 
    post(contact)
        .then(console.log("Formulaire envoyé sous le numéro :" + localStorage.getItem("orderId")))
        .then(setTimeout(function() {
            window.location.href = "confirmation.html";
        }, 500))
    .catch(console.error);
});