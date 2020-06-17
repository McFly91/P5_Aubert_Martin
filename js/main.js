let request = new XMLHttpRequest();
      
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);

        // Creation d'une fonction pour la présentation des caméras une par une
        const presentationCamera = (numArray) => {
            let responseCamera = response[numArray];
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
        
        let n = 0;

        if (document.location.href.indexOf("index.html") != -1) {
            response.forEach(camera => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light");
            document.querySelector(".list-group").append(li);
            li.innerHTML = "<div class='card-body col-12 col-md-6 mx-auto'><h5 class='card-title'>" + camera.name + 
            "</h5><p class='card-text font-weight-bold'>" + camera.price + 
            "</p><a class='card-text text-body stretched-link' href=" + camera.name.replace(/ /g, "") + ".html>" + camera.description + 
            "</a><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt=camera></img></div";
            console.log("href=" + camera.name.replace(/ /g, "") + ".html");
            });
        }
        else if (document.location.href.indexOf(response[n].name.replace(/ /g, "") + ".html") != -1) {
            presentationCamera(n);
        }
        else if (document.location.href.indexOf(response[++n].name.replace(/ /g, "") + ".html") != -1) {
            presentationCamera(n);
        }
        else if (document.location.href.indexOf(response[++n].name.replace(/ /g, "") + ".html") != -1) {
            presentationCamera(n);
        }
        else if (document.location.href.indexOf(response[++n].name.replace(/ /g, "") + ".html") != -1) {
            presentationCamera(n);
        }
        else if (document.location.href.indexOf(response[++n].name.replace(/ /g, "") + ".html") != -1) {
            presentationCamera(n);
        }

            // Ajout au panier

            let addToCart = document.getElementById("add-to-cart");

            // Ajout d'un article au clic
            if (addToCart) {
                addToCart.addEventListener("click", () => {
                cameraInCart();
                });
            };

            // Fonction pour ajouter un article dans le panier
            const cameraInCart = () => {
                let cameraNumbers = localStorage.getItem("totalInCart"); 
                cameraNumbers = parseInt(cameraNumbers); // On définit le nombre de caméra comme étant un chiffre
                console.log(typeof cameraNumbers);

                if (cameraNumbers){ // On rajoute une camera dès qu'il y en a une dans le panier
                    localStorage.setItem("totalInCart", cameraNumbers + 1)
                    document.getElementById("number_in_cart").textContent = cameraNumbers + 1;
                }
                else { // On ajoute une première camera dans le panier
                    localStorage.setItem("totalInCart", 1);
                    document.getElementById("number_in_cart").textContent = 1;
                }
                cameraInStorage();
            };
            
            // Fonction pour obtenir le nombre et la description d'articles dans le panier
            const cameraInStorage = () => {
                let cameraStorageInCart = localStorage.getItem("cameraInCart");
                cameraStorageInCart = JSON.parse(cameraStorageInCart);
                let inCart = 0;
                cameraStorageInCart = {[response[n].name]: response[n], inCart};
                console.log(cameraStorageInCart);
                
                if (cameraStorageInCart !== null) { // Si il y a un article dans le panier, on rajoute +1 à inCart
                    cameraStorageInCart.inCart++;
                    console.log(cameraStorageInCart.inCart);
                }
                else { // Si il n'y a rien dans le panier on ajoute 1 à inCart lors du premier ajout
                    cameraStorageInCart.inCart = 1;
                    cameraStorageInCart = {[response[n].name]: response[n]};
                    console.log(cameraStorageInCart.inCart);
                }

                localStorage.setItem("cameraInCart", JSON.stringify(cameraStorageInCart));
                console.log("cameraInCart", cameraStorageInCart);
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

            // Fonction pour ajouter les éléments sur la page panier
            const cart = () => {
                let cameraInCart = localStorage.getItem("cameraInCart");
                cameraInCart = JSON.parse(cameraInCart);
                let cartTable = document.getElementById("cart_table");
                console.log(cameraInCart);
                if (cartTable && cameraInCart) {
                    Object.values(cameraInCart).map(cameraInCart => {
                        cartTable.innerHTML = "<tr><td><img class='w-25 px-2' src=" + cameraInCart.imageUrl + ">" + cameraInCart.name + "</td><td>" + cameraInCart.price + 
                        "</td><td>" + cameraInCart.inCart + "</td></tr>";
                    });
                };
            };
            cart();
    };
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();