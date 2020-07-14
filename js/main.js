let url = "http://localhost:3000/api/cameras";

// On crée une fonction pour afficher l'ensemble des caméras en utilisant une Promesse ///////////////////////////////////////////////////////////
const presentation = new Promise ((resolve,reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);
            request.onload = () => resolve (this.statusText);
        // Pour chaque caméra, on structure l'affichage sous forme d'une liste ////////////////////////////////////////////////////////////////
            response.forEach(camera => {
            let li = document.createElement("li");
            li.classList.add("list-group-item", "bg-light");
            document.querySelector(".list-group").append(li);
            li.innerHTML = "<div class='card-body col-12 col-md-6 mx-auto'><h5 class='card-title'>" + camera.name + 
            "</h5><p class='card-text font-weight-bold'>" + camera.price + 
            "</p><a class='card-text text-body stretched-link' id='link_camera' href='produit.html?id=" + camera._id + "'>" + camera.description + 
            "</a><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt='camera'></img></div";
            });
        }
        else {
            request.onerror = () => reject(this.statusText);
        }
    };
    request.send();
});

// On appelle la fonction et on lui chaine un message si la promesse est résolue ou alors on capture l'erreur /
presentation
    .then(console.log)
.catch(function(error){
    console.log(error, "Problème de communication avec l'API");
});