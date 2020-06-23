let idUrl= new URLSearchParams(document.location.search);
let idCamera = idUrl.get("id");
console.log(idCamera);

let url = "http://localhost:3000/api/cameras" + "/" + idCamera;

let cameraInCart = []; // Création d'un tableau qui recupère chaque ajout dans le panier
localStorage.setItem("cameraInCart", JSON.stringify(cameraInCart));

let request = new XMLHttpRequest();

request.open("GET", url);
request.send();
      
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response._id)
        // Creation d'une fonction pour la présentation des caméras une par une
        const presentationCamera = () => {
            let camera = response;
            let lenses = response.lenses;
                    // Création de la personnalisation des lentilles
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
                    // Nom et prix de la caméra
                    let divNamePrice = document.createElement("div");
                    divNamePrice.classList.add("card-body");
                    document.getElementById('camera').prepend(divNamePrice);
                    divNamePrice.innerHTML = "<h2 class='card-title'>" + camera.name + 
                    "</h2><p class='card-text'>Prix : " + camera.price + "</p>";
                    // Description et image de la caméra
                    let divDescriptionImage = document.createElement("div");
                    divDescriptionImage.classList.add("card-body");
                    document.getElementById("camera").append(divDescriptionImage);
                    divDescriptionImage.innerHTML = "<p class='card-text'>" + camera.description + 
                    "</p><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt=camera></img></div";
                    // Title et <meta> description
                    document.getElementsByTagName("title")[0].textContent = camera.name;
                    document.getElementsByTagName("meta")[1].content = camera.description;

        };
        presentationCamera();

            // Ajout au panier

            let addToCart = document.getElementById("add-to-cart");
            console.log(response);

            // Ajout d'un article au clic
            if (addToCart) {
                addToCart.addEventListener("click", () => {
                
                    numberInCart();  

                // Création d'un objet contenant les informations à retourner à la page
                    let cameraStorage = {
                    name : response.name, 
                    price : response.price,
                    image : response.imageUrl,
                    _id : response._id,
                    inCart : 0
                    };

                cameraInStorage(cameraStorage);
                saveCart(cameraInCart);
            });
        }

            // Fonction pour ajouter un article dans le panier
            const numberInCart = () => {
                let cameraNumbers = localStorage.getItem("totalInCart"); 
                cameraNumbers = parseInt(cameraNumbers); // On définit le nombre de caméra comme étant un chiffre
                if (cameraNumbers){ // On rajoute une camera dès qu'il y en a une dans le panier
                    localStorage.setItem("totalInCart", cameraNumbers + 1)
                    document.getElementById("number_in_cart").textContent = cameraNumbers + 1;
                }
                else { // On ajoute une première camera dans le panier
                    localStorage.setItem("totalInCart", 1);
                    document.getElementById("number_in_cart").textContent = 1;
                }
            };
            
            // Fonction pour obtenir le nombre et la description d'articles dans le panier
            const cameraInStorage = (cameraStorage) => {
                if (localStorage.getItem("cameraInCart")) {
                    cameraInCart = JSON.parse(localStorage.getItem("cameraInCart"));
                    let newCamera = true;
                    console.log(idCamera);
                    cameraInCart.forEach(cameraStorage => {
                        if (cameraStorage._id === idCamera) {
                            newCamera = false;
                            cameraStorage.inCart +=1;
                            console.log("boucle if");
                        };
                    });
                        if (newCamera) {
                            cameraStorage.inCart = 1;
                            console.log("boucle else"); 
                            cameraInCart.push(cameraStorage);
                        };
                        localStorage.setItem("cameraInCart", JSON.stringify(cameraInCart));
                };
            };

            const saveCart = (cameraInCart) => {
                localStorage.setItem("cameraInCart", JSON.stringify(cameraInCart));
            };

            // Fonction pour garder le nombre d'article dans le panier après un chargement de la page
            const cartNumbers = () => {
                let cameraNumbers = localStorage.getItem("totalInCart");
                if (cameraNumbers) {
                    document.getElementById("number_in_cart").textContent = cameraNumbers;
                }
            };

            // Appel de la fonction pour garder le nombre
            cartNumbers();
    };
};
