// On récupère les paramètres dans l'url ////////////////
let idUrl= new URLSearchParams(document.location.search);

// On récupère l'ID de la caméra /
let idCamera = idUrl.get("id");

// On affecte l'ID à l'url pour afficher la caméra ciblée /
let url = "http://localhost:3000/api/cameras/" + idCamera;

// On crée une fonction pour afficher la caméra en utilisant une Promesse ////////
const productPresentation = new Promise((resolve,reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            request.onload = () => resolve (this.statusText);

        // Appel des fonctions pour présenter la caméra et ajouter au panier ////
            presentationCamera(response);
            addCart(response);
        }
        else {
            request.onerror = () => reject(this.statusText);
        };
    };
    request.send();
});

// On appelle la fonction et on lui chaine un message si la promesse est résolue ou alors on capture l'erreur /
productPresentation
    .then(console.log)
.catch(function(error){
    console.log(error, "Problème de communication avec l'API");
});

// Creation d'une fonction pour la présentation des caméras une par une ///////////////////////
const presentationCamera = (response) => {
    // On récupère les informations de la caméra et de la personnalisation des lentilles /////
    let camera = response;
    let lenses = response.lenses;

    // Création de la personnalisation des lentilles /////////////////////////////////////////
    let selectLenses = document.createElement("select");
    selectLenses.id = "lenses"
    selectLenses.classList.add("my-2", "browser-default", "custom-select");
    document.getElementById("camera").prepend(selectLenses);
    let optionMenu = document.createElement("option");
    optionMenu.value = "selected";
    document.getElementById("lenses").prepend(optionMenu);
    optionMenu.textContent = "Lentilles :"
    lenses.forEach(lense => {
    let optionLenses = document.createElement("option");
    document.getElementById("lenses").append(optionLenses);
    optionLenses.textContent = lense;
    });

    // Nom et prix de la caméra //////////////////////////////////////////////////////////////
    let divNamePrice = document.createElement("div");
    divNamePrice.classList.add("card-body");
    document.getElementById('camera').prepend(divNamePrice);
    divNamePrice.innerHTML = "<h2 class='card-title'>" + camera.name + 
    "</h2><p class='card-text'>Prix : " + camera.price + "</p>";

    // Description et image de la caméra //////////////////////////////////////////////////////
    let divDescriptionImage = document.createElement("div");
    divDescriptionImage.classList.add("card-body");
    document.getElementById("camera").append(divDescriptionImage);
    divDescriptionImage.innerHTML = "<p class='card-text'>" + camera.description + 
    "</p><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt=camera></img></div";

    // Title et <meta> description ////////////////////////////////////////////////////////////
    document.getElementsByTagName("title")[0].textContent = camera.name;
    document.getElementsByTagName("meta")[1].content = camera.description;
};

// Fonction pour obtenir le nombre et la description d'articles dans le panier /////////////
const cameraInStorage = (cameraStorage) => {
    if (localStorage.getItem("cameraInCart")) {
        cameraInCart = JSON.parse(localStorage.getItem("cameraInCart"));
        let newCamera = true;
    // On fait une boucle pour vérifier les caméras présentent dans le panier ////////////
        cameraInCart.forEach(cameraStorage => {
        // On vérifie si la caméra est déjà présente dans le pnaier et on incrémente ////
            if (cameraStorage._id === idCamera) { 
                newCamera = false;
                cameraStorage.inCart +=1;
            };
        });
    /// Si c'est une nouvelle caméra, on l'ajoute dans le tableau cameraInCart ////////
        if (newCamera) {
            cameraStorage.inCart = 1;
            cameraInCart.push(cameraStorage);
        };
    };
    localStorage.setItem("cameraInCart", JSON.stringify(cameraInCart));
};

// Fonction pour ajouter un article dans le panier ////////////////////////////////
const numberInCart = () => {
    let cameraNumbers = localStorage.getItem("totalInCart");
    cameraNumbers = parseInt(cameraNumbers); 
    // On rajoute une camera dès qu'il y en a une dans le panier //////////////////
    if (cameraNumbers){ 
        localStorage.setItem("totalInCart", cameraNumbers + 1)
        document.getElementById("number_in_cart").textContent = cameraNumbers + 1;
    }
    // On ajoute une première camera dans le panier ///////////////////////////////
    else { 
        localStorage.setItem("totalInCart", 1);
        document.getElementById("number_in_cart").textContent = 1;
    }
};

// Fonction pour ajouter au panier ///////////////////////////////////////////////
const addCart = (response) => {
    let addToCart = document.getElementById("add-to-cart");
    // Ajout d'un article au clic ////////////////////////////////////////////////
    if (addToCart) {
        addToCart.addEventListener("click", () => {                
            numberInCart();
                
        //// Si il n'y a pas d'article dans Local Storage, on crée un tableau ////
            if (localStorage.getItem("cameraInCart") === null) {
                let cameraInCart = [];
                localStorage.setItem("cameraInCart", JSON.stringify(cameraInCart));
            };

        //// Création d'un objet contenant les informations à retourner au panier /
            let cameraStorage = {
            name : response.name, 
            price : response.price,
            image : response.imageUrl,
            _id : response._id,
            inCart : 0
            };

            cameraInStorage(cameraStorage);
        });
    };
};