let request = new XMLHttpRequest();
      
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let responseCamera = response[0];
        console.log(responseCamera);
        // Création de la personnalisation des lentilles
        let selectLenses = document.createElement("select");
        selectLenses.id = "lenses"
        selectLenses.classList.add("my-2", "browser-default", "custom-select");
        document.getElementById('camera').prepend(selectLenses);
        let optionMenu = document.createElement("option");
        optionMenu.value = "selected";
        document.getElementById("lenses").prepend(optionMenu);
        optionMenu.textContent = "Lentilles :"
        responseLenses = responseCamera.lenses;
        responseLenses.forEach(lense => {
        let optionLenses = document.createElement("option");
        document.getElementById("lenses").append(optionLenses);
        optionLenses.textContent = lense;
        });
        // Nom et prix de la caméra
        let divNamePrice = document.createElement("div");
        divNamePrice.classList.add("card-body");
        document.getElementById('camera').prepend(divNamePrice);
        divNamePrice.innerHTML = "<h5 class='card-title'>" + responseCamera.name + 
        "</h5><p class='card-text font-weight-bold'>" + responseCamera.price + 
        "</p>";
        // Description et image de la caméra
        let divDescriptionImage = document.createElement("div");
        divDescriptionImage.classList.add("card-body");
        document.getElementById('camera').append(divDescriptionImage);
        divDescriptionImage.innerHTML = "<p class='card-text'>" + responseCamera.description + 
        "</p><img class='card-img-bottom py-2' src=" + responseCamera.imageUrl + " alt=camera></img></div";
    };
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();

// Ajout au panier

    let addToCart = document.getElementById("add-to-cart");

    // Ajout d'un article au clic
    addToCart.addEventListener("click", () => {
        cameraInCart();
    });

    // Fonction pour ajouter un article dans le panier
    const cameraInCart = () => {
        let cameraNumbers = localStorage.getItem("cameraInCart"); 
        cameraNumbers = parseInt(cameraNumbers); // On définit le nombre de caméra comme étant un chiffre
        console.log(typeof cameraNumbers);

        if (cameraNumbers){ // On rajoute une camera dès qu'il y en a une dans le panier
            localStorage.setItem("cameraInCart", cameraNumbers + 1)
            document.getElementById("number_in_cart").textContent = cameraNumbers + 1;
        }
        else { // On ajoute une première camera dans le panier
            localStorage.setItem("cameraInCart", 1);
            document.getElementById("number_in_cart").textContent = 1;
        }
    };

    // Fonction pour garder le nombre d'article dans le panier après un chargement de la page
    const cartNumbers = () => {
        let cameraNumbers = localStorage.getItem("cameraInCart");
        if (cameraNumbers) {
            document.getElementById("number_in_cart").textContent = cameraNumbers;
        }
    };

    // Appel de la fonction pour garder le nombre
    cartNumbers();

