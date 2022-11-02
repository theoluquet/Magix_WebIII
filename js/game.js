let gameInfos;
let gameInfosInitialized = false;

let timerNode;

let opponentNameNode;
let opponentHeroClassNode;
let opponentAvatarNode;
let opponentHpNode;
let opponentMpNode;
let opponentDeckNode;

let playerHeroClassNode;
let playerAvatarNode;
let playerHpNode;
let playerMpNode;
let playerDeckNode;
let playerHandNode;

const updateGameInfos = () => {
    timerNode.innerHTML = gameInfos.remainingTurnTime;

    opponentHpNode.innerHTML = gameInfos.opponent.hp;
    opponentMpNode.innerHTML = gameInfos.opponent.mp;
    opponentDeckNode.innerHTML = gameInfos.opponent.handSize;

    playerHpNode.innerHTML = gameInfos.hp;
    playerMpNode.innerHTML = gameInfos.mp;
    playerDeckNode.innerHTML = gameInfos.handSize;
}

const initializeGameInfos = () => {
    opponentNameNode.innerHTML = gameInfos.opponent.username;
    opponentHeroClassNode.innerHTML = gameInfos.opponent.heroClass;

    playerHeroClassNode.innerHTML = gameInfos.heroClass;
}

const state = () => {

    let formData = new FormData();
    formData.append("game-update", "true");

    fetch("ajax.php", { // Il faut créer cette page et son contrôleur appelle
        method: "POST", // l’API (games/state)
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // contient les cartes/état du jeu.        
            gameInfos = data;

            if (gameInfos != "WAITING") {
                if (!gameInfosInitialized) {
                    initializeGameInfos();
                    gameInfosInitialized = true;
                }                
                updateGameInfos();
            }            

            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}

window.addEventListener("load", () => {
    
    timerNode = document.querySelector(".timer");
    opponentNameNode = document.querySelector(".opponent-name");
    opponentHeroClassNode = document.querySelector(".opponent-hero-class");
    opponentAvatarNode = document.querySelector(".opponent-avatar");
    opponentHpNode = document.querySelector(".opponent-hp");
    opponentMpNode = document.querySelector(".opponent-mp");
    opponentDeckNode = document.querySelector(".opponent-deck");

    playerHeroClassNode = document.querySelector(".player-hero-class");
    playerAvatarNode = document.querySelector(".player-avatar");
    playerHpNode = document.querySelector(".player-hp");
    playerMpNode = document.querySelector(".player-mp");
    playerDeckNode = document.querySelector(".player-deck");
    playerHandNode = document.querySelector(".player-hand");

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});