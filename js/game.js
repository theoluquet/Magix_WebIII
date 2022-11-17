import getCard from "./card.js"

const CLASSPICS = {
    "DemonHunter": {path: "assets/heroes/demonhunter.png"},
    "Druid": {path: "assets/heroes/druid.png"},
    "Hunter": {path: "assets/heroes/hunter.png"},
    "Mage": {path: "assets/heroes/mage.png"},
    "Paladin": {path: "assets/heroes/paladin.png"},
    "Priest": {path: "assets/heroes/priest.png"},
    "Rogue": {path: "assets/heroes/rogue.png"},
    "Shaman": {path: "assets/heroes/shaman.png"},
    "Warlock": {path: "assets/heroes/warlock.png"},
    "Warrior": {path: "assets/heroes/warrior.png"}
}

let pickedCardUID = null;
let targetUID = null;

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

let gameBoardNode;
let playerBoardNode;
let opponentBoardNode;

const updateGameInfos = () => {
    timerNode.innerHTML = gameInfos.remainingTurnTime;

    opponentHpNode.innerHTML = gameInfos.opponent.hp;
    opponentMpNode.innerHTML = gameInfos.opponent.mp;
    opponentDeckNode.innerHTML = gameInfos.opponent.handSize;

    playerHpNode.innerHTML = gameInfos.hp;
    playerMpNode.innerHTML = gameInfos.mp;
    playerDeckNode.innerHTML = gameInfos.handSize;

    
    while (opponentBoardNode.hasChildNodes()) {
        opponentBoardNode.removeChild(opponentBoardNode.firstChild);
      }

    let opponentBoardCards = gameInfos.opponent.board;

    for (let i = 0; i < opponentBoardCards.length; i++) {
        let card = getCard(opponentBoardCards[i])
        card.addEventListener("dblclick", function(){attackTarget(card)});
        opponentBoardNode.append(card);       
    }


    while (playerBoardNode.hasChildNodes()) {
        playerBoardNode.removeChild(playerBoardNode.firstChild);
      }

    let playerBoardCards = gameInfos.board;

    for (let i = 0; i < playerBoardCards.length; i++) {
        let card = getCard(playerBoardCards[i])
        card.addEventListener("dblclick", function(){beginAttack(card)});        
        playerBoardNode.append(card);       
    }


    while (playerHandNode.hasChildNodes()) {
        playerHandNode.removeChild(playerHandNode.firstChild);
      }

    let playerHandCards = gameInfos.hand;
    
    for (let i = 0; i < playerHandCards.length; i++) {
        // let playerHandCardNode = document.createElement("div");
        // playerHandCardNode.classList.add("player-hand-card");
        // playerHandCardNode.innerHTML = getCard(playerHandCards[i]);
        let card = getCard(playerHandCards[i])
        card.addEventListener("dblclick", function(){putOnBoard(card)});
        // element.addEventListener(event, function, useCapture);
        playerHandNode.append(card);       
    }    
}

const initializeGameInfos = () => {
    opponentNameNode.innerHTML = gameInfos.opponent.username;
    opponentHeroClassNode.innerHTML = gameInfos.opponent.heroClass;
    opponentAvatarNode.innerHTML = `        
        <img src="${CLASSPICS[gameInfos.opponent.heroClass].path}" alt="${gameInfos.opponent.heroClass}">
        `;

    playerHeroClassNode.innerHTML = gameInfos.heroClass;
    // playerAvatarNode.innerHTML = `        
    //     <img src="${CLASSPICS[gameInfos.heroClass].path}" alt="${gameInfos.heroClass}">
    //     `;

    let testNode = document.querySelector(".player-data");
    testNode.style.background = `url(${CLASSPICS[gameInfos.heroClass].path}) no-repeat bottom`;
    // testNode.style.backgroundSize = "contain";

}





function putOnBoard(cardNode) {
    if (!pickedCardUID) {
        pickedCardUID = cardNode.id;

        let formData = new FormData();
        formData.append("PLAY", "PLAY");
        formData.append("uid", pickedCardUID);
        fetch("ajax.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST", // l’API (games/state)
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            })    
        updateGameInfos();
        pickedCardUID = null;
    }
}

function beginAttack(cardNode) {
    pickedCardUID = cardNode.id;
}

function attackTarget(targetCardNode) {
    if (!pickedCardUID && !targetUID) {
        targetUID = targetCardNode.id;
        
        // APPEL ATTAQUE
        let formData = new FormData();
        formData.append("ATTACK", "ATTACK");
        formData.append("uid", pickedCardUID);
        formData.append("targetuid", targetUID);
        fetch("ajax.php", { // Il faut créer cette page et son contrôleur appelle
            method: "POST", // l’API (games/state)
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            })    
        updateGameInfos();
        targetUID = null;
    }
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

    gameBoardNode = document.querySelector(".game-board");
    opponentBoardNode = document.querySelector(".opponent-board");
    playerBoardNode = document.querySelector(".player-board");

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});


