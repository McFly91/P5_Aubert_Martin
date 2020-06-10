// Fonction création d'un titre
const createTitle = (nameCam, id) => {
    let h5 = document.createElement('h5');
    h5.textContent = nameCam;
    h5.classList.add("card-title");
    document.getElementById(id).prepend(h5);
};

export {createTitle};