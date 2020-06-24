// Fonction pour garder le nombre d'article dans le panier après un chargement de la page
const cartNumbers = () => {
    let cameraNumbers = localStorage.getItem("totalInCart");
    if (cameraNumbers) {
        document.getElementById("number_in_cart").textContent = cameraNumbers;
    }
};

// Appel de la fonction pour garder le nombre
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
            console.log(camerasInCart)
            cartTable.innerHTML += "<tr><td><img class='w-25 px-2' src=" + camerasInCart.image + ">" + camerasInCart.name + "</td><td>" + camerasInCart.price + 
            "</td><td>" + camerasInCart.inCart + "</td><td>" + total + "</td></tr>";
            totalCart.textContent = total;
        });
    };
};
cart();

// Envoi du formulaire
let request = new XMLHttpRequest();

const formValidation = () => {
    //'use strict';
    window.addEventListener('load', function() {
        request.open("POST", "http://localhost:3000/api/cameras");
        request.setRequestHeader("Content-Type", "application/json");
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
        request.send(JSON.stringify(validation));
    }, false);
};

formValidation();

