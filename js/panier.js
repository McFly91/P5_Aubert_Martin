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
    if (cartTable && cameraInCart) {
        Object.values(cameraInCart).map(camerasInCart => {
            let total = camerasInCart.inCart * camerasInCart.price;
            console.log(camerasInCart)
            cartTable.innerHTML += "<tr><td><img class='w-25 px-2' src=" + camerasInCart.image + ">" + camerasInCart.name + "</td><td>" + camerasInCart.price + 
            "</td><td>" + camerasInCart.inCart + "</td><td>" + total + "</td></tr>";
        });
    };
};
cart();