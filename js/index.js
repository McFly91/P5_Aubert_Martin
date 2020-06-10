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
    document.getElementById(id).append(p);
};

// Fonction création d'une description
const createDescription = (descriptionCam, id) => {
    let p = document.createElement('p');
    p.textContent = "Description : " + descriptionCam;
    p.classList.add("card-text");
    document.getElementById(id).append(p);
};

// Fonction création d'une image
const createImg = (imageCam, id) => {
    let img = document.createElement('img');
    img.src = imageCam;
    img.classList.add("card-img-bottom");
    document.getElementById(id).append(img);
};

// Fonction création d'une carte
const createCard = (request, nameCam, priceCam, descriptionCam, imageCam, id, url) => {
    
        var request = new XMLHttpRequest();
      
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


const cardCamera1 = createCard (this.request1, this.nameCam1, this.priceCam1, this.descriptionCam1, this.imageCam1, id[0], url[0]);
const cardCamera2 = createCard (this.request2, this.nameCam2, this.priceCam2, this.descriptionCam2, this.imageCam2, id[1], url[1]);
const cardCamera3 = createCard (this.request3, this.nameCam3, this.priceCam3, this.descriptionCam3, this.imageCam3, id[2], url[2]);
const cardCamera4 = createCard (this.request4, this.nameCam4, this.priceCam4, this.descriptionCam4, this.imageCam4, id[3], url[3]);
const cardCamera5 = createCard (this.request5, this.nameCam5, this.priceCam5, this.descriptionCam5, this.imageCam5, id[4], url[4]);


