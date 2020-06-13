let request = new XMLHttpRequest();
      
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let responseCamera = response[0];
        console.log(responseCamera);

        let divLenses = document.createElement("div");
        divLenses.id = "lenses"
        divLenses.classList.add("dropdown");
        document.getElementById('camera').prepend(divLenses);
        divLenses.innerHTML = "<button class='my-2 btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown'>Lentilles</button>";
        let divMenuLenses = document.createElement("div");
        divMenuLenses.id = "lenses-menu"
        divMenuLenses.classList.add("dropdown-menu");
        document.getElementById("lenses").append(divMenuLenses);
        responseLenses = responseCamera.lenses;
        responseLenses.forEach(lense => {
            let pItemLenses = document.createElement("p");
            pItemLenses.classList.add("dropdown-item");
            document.getElementById("lenses-menu").append(pItemLenses);
            pItemLenses.textContent = lense;
        });

        let divNamePrice = document.createElement("div");
        divNamePrice.classList.add("card-body");
        document.getElementById('camera').prepend(divNamePrice);
        divNamePrice.innerHTML = "<h5 class='card-title'>" + responseCamera.name + 
        "</h5><p class='card-text font-weight-bold'>" + responseCamera.price + 
        "</p>";
        let divDescriptionImage = document.createElement("div");
        divDescriptionImage.classList.add("card-body");
        document.getElementById('camera').append(divDescriptionImage);
        divDescriptionImage.innerHTML = "<p class='card-text'>" + responseCamera.description + 
        "</p><img class='card-img-bottom py-2' src=" + responseCamera.imageUrl + " alt=camera></img></div";
    };
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
