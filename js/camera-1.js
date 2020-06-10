// Fonction création d'un titre
const createTitle = (nameCam, id) => {
    let h5 = document.createElement('h5');
    h5.textContent = nameCam;
    h5.classList.add("card-title");
    document.getElementById(id).prepend(h5);
};

// Fonction création d'un prix
const createPrice = (priceCam, id) => {
    let p = document.createElement('p');
    p.textContent = "Price : " + priceCam;
    p.classList.add("card-text");
    p.classList.add("font-weight-bold");
    p.style.color = "red";
    document.getElementById(id).append(p);
};

// Fonction création d'une description avce lien étendu sur l'ensemble de la carte
const createDescription = (descriptionCam, id) => {
    let a = document.createElement('a');
    a.href = id + ".html";
    a.innerHTML = "<Strong>Description : </Strong>" + descriptionCam;
    a.classList.add("card-text");
    a.style.color = "black";
    document.getElementById(id).append(a);
};

// Fonction création d'une image
const createImg = (imageCam, id) => {
    let img = document.createElement('img');
    img.src = imageCam;
    img.classList.add("card-img-bottom");
    img.style.maxWidth = "50%";
    document.getElementById(id).append(img);
};

// Fonction création d'une carte
let request;

const createCard = (request, nameCam, priceCam, descriptionCam, imageCam, id, url) => {
    
        request = new XMLHttpRequest();
      
        request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            nameCam = response.name;
            priceCam = response.price;
            descriptionCam = response.description;
            imageCam = response.imageUrl;
            createTitle (nameCam, id);
            createPrice (priceCam, id);
            createDescription (descriptionCam, id);
            createImg (imageCam, id);
        }
    };
    request.open("GET", url);
    request.send();
};

let id = ["camera-1", "camera-2", "camera-3", "camera-4", "camera-5"];
let url = ["http://localhost:3000/api/cameras/5be1ed3f1c9d44000030b061", "http://localhost:3000/api/cameras/5be1ef211c9d44000030b062", "http://localhost:3000/api/cameras/5be9bc241c9d440000a730e7", "http://localhost:3000/api/cameras/5be9c4471c9d440000a730e8", "http://localhost:3000/api/cameras/5be9c4c71c9d440000a730e9"];

// Création d'une carte par produit
const cardCamera1 = createCard (this.request1, this.nameCam1, this.priceCam1, this.descriptionCam1, this.imageCam1, id[0], url[0]);
