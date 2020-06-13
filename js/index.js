let request = new XMLHttpRequest();
      
request.onreadystatechange = function() {
if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    let response = JSON.parse(this.responseText); 
    response.forEach(camera => {
        let li = document.createElement("li");
        li.classList.add("list-group-item", "bg-light");
        document.querySelector(".list-group").append(li);
        li.innerHTML = "<div class='card-body col-12 col-md-6 mx-auto'><h5 class='card-title'>" + camera.name + 
        "</h5><p class='card-text font-weight-bold'>" + camera.price + 
        "</p><a class='card-text text-body stretched-link' href=" + camera._id + ".html>" + camera.description + 
        "</a><img class='card-img-bottom py-2' src=" + camera.imageUrl + " alt=camera></img></div";
        console.log("href=" + camera._id + ".html");
        });
    };
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();