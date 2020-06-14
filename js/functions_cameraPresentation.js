// Création d'une fonction de présentation de produit
const cameraPresentation = (n) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            let responseCamera = response[n];
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
};

export {cameraPresentation};