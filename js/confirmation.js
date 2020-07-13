// On récupère le prix total et le numéro de confirmation stockés dans local Storage
document.getElementById("total").textContent = localStorage.getItem("prixTotal");
document.getElementById("id_confirm").textContent = localStorage.getItem("orderId");

// Au clic on redirige sur la page d'Acceuil et on vide le local storage
document.getElementById("clear").addEventListener("click", () => {
  localStorage.clear();
});

// Sans interaction de la part de l'utilisateur, on retourne sur la page d'acceuil dans 5s et on vide le local storage
setTimeout(function(){
  window.location.href = "index.html";
  localStorage.clear();
}, 5000);