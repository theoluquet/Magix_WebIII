const state = () => {

    let formData = new FormData();
    formData.append("game-update", "true");

    fetch("ajax.php", { // Il faut créer cette page et son contrôleur appelle
    method : "POST", // l’API (games/state)
    body : formData
    })
   .then(response => response.json())
   .then(data => {
   console.log(data.heroClass); // contient les cartes/état du jeu.
   
   setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
   }

   window.addEventListener("load", () => {
   setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
   });