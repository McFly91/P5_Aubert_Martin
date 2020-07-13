let request = new XMLHttpRequest();

let url = "http://localhost:3000/api/cameras";

// On test la connection avec l'API et on affiche les caméras
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);

        // Pour chaque caméra, on structure l'affichage sous forme d'une liste
        response.forEach(camera => {
        let li = document.createElement("li");
        li.classList.add("list-group-item", "bg-light");
        document.querySelector(".list-group").append(li);
        li.innerHTML = "<div class='card-body col-12 col-md-6 mx-auto'><h5 class='card-title'>" + camera.name + 
        "</h5><p class='card-text font-weight-bold'>" + camera.price + 
        "</p><a class='card-text text-body stretched-link' id='link_camera' href='produit.html?id=" + camera._id + "'>" + camera.description + 
        "</a><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt='camera'></img></div";
        });

            // Fonction pour garder le nombre d'article dans le panier après un chargement de la page
            const cartNumbers = () => {
                let cameraNumbers = localStorage.getItem("totalInCart");
                if (cameraNumbers) {
                    document.getElementById("number_in_cart").textContent = cameraNumbers;
                }
            };
            cartNumbers();
    };
};

request.open("GET", url);
request.send();