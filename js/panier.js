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
});

// On récupère les produits de la page panier
let product = localStorage.getItem("cameraInCart");
product = JSON.parse(product);
let products = [];

// On récupère l'ID des caméras qu'on insère dans un tableau products
for (let i =0; i < product.length; i++) {
    products.push(product[i]._id);
};
console.log(products);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let request = new XMLHttpRequest();
    console.log(request);
    request.open("POST", "http://localhost:3000/api/cameras/order");
    request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE) {
        let status = request.status;
        console.log(status);
        if (status === 0 || (status >= 200 && status < 400)) {
          let response = JSON.parse(this.responseText);
          let orderId = response.orderId;
          localStorage.setItem("orderId", orderId);
          console.log(orderId);
        } 
        else {
          console.log("There has been an error with the request!");
        }
      }
    }

    // On crée un objet contact qui récupère toutes les infos saisies dans les champs du formulaire
    let contact = {
        firstName : document.getElementById("validationServer01").value,
        lastName : document.getElementById("validationServer02").value,
        address : document.getElementById("validationServer03").value,
        city : document.getElementById("validationServer04").value,
        email : document.getElementById("validationServer05").value
    };

    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({contact, products}));

    if (localStorage.getItem("orderId")) {
        window.location.href = 'confirmation.html';
    };
});

