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

let isYourTurnBackground = "linear-gradient( rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1) )";
let isNotYourTurnBackground = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9) )";

let pickedCardUID = null;
let targetUID = null;
let attackInitiated = false;

let gameInfos;
let gameInfosInitialized = false;

let splashNode;
let messageNode;
let timerNode;

let opponentInfoNode;
let opponentDataNode;
let opponentNameNode;
let opponentHeroClassNode;
let opponentAvatarNode;
let opponentHpNode;
let opponentMpNode;
let opponentDeckNode;

let playerInfoNode;
let playerData2Node;
let playerNameNode;
let playerHeroClassNode;
let playerAvatarNode;
let playerHpNode;
let playerMpNode;
let playerDeckNode;
let playerHandNode;
let heroPowerNode;
let endTurnNode;

let gameBoardNode;
let playerBoardNode;
let opponentBoardNode;



function putOnBoard(cardNode) {
    pickedCardUID = cardNode.id;
    let formData = new FormData();
    formData.append("PLAY", "PLAY");
    formData.append("uid", pickedCardUID);
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (typeof data !== "object") {
                displayMessage(data);
            }
            else {
                let playedCardID = cardNode.getAttribute("data-ID");
                let formDataCardPlayed = new FormData();
                formDataCardPlayed.append("cardPlayed", playedCardID);
                fetch("ajax.php", { 
                    method: "POST", 
                    body: formDataCardPlayed
                })
                    .then(response => response.json())
                    .then(data => {})    
            }
        })    
    // setTimeout(updateGameInfos, 500);
    updateGameInfos();    
}


function beginAttack(cardNode) {
    pickedCardUID = cardNode.id;
    attackInitiated = true;
}


function attackTarget(targetNode) {
    
    if (attackInitiated == true) {   
        targetUID = targetNode.id;

        let formData = new FormData();
        formData.append("ATTACK", "ATTACK");
        formData.append("uid", pickedCardUID);
        formData.append("targetuid", targetUID);
        fetch("ajax.php", { 
            method: "POST", 
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (typeof data !== "object") {
                    displayMessage(data);
                }
                else {
                    console.log("Attaque réussie");
                    console.log(data);
                }
            })
        pickedCardUID = null;    
        targetUID = null;
        attackInitiated = false;
        updateGameInfos();
    }
}


function useHeroPower() {
    let formData = new FormData();
    formData.append("HERO_POWER", "HERO_POWER");
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (typeof data !== "object") {
                displayMessage(data);
            }
            else {
            }
        })
        updateGameInfos();

    // let formDataResetStats = new FormData();
    // formDataResetStats.append("resetStats", "resetStats");
    // fetch("ajax.php", { 
    //     method: "POST", 
    //     body: formDataResetStats
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.clear();
    //         console.log(data);
    //     })
        
    // let formDataGetStats = new FormData();
    // formDataGetStats.append("getStats", "getStats");
    // fetch("ajax.php", { 
    //     method: "POST", 
    //     body: formDataGetStats
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.clear();
    //         console.log(data);
    //     }) 
}


function endTurn() {
    let formData = new FormData();
    formData.append("END_TURN", "END_TURN");
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {displayMessage(data);})    
    //updateGameInfos();
}


function displayMessage(data) {
    let message = "";
    switch(data) {
        case "WAITING":
            message = "Waiting for the opponent ...";
            break;

        case "LAST_GAME_WON":
            message = "Victory !";
            break;
        
        case "LAST_GAME_LOST":
            message = "Defeat ...";
            break;

        case "INVALID_ACTION":
            message = "You can't do that.";
            break;

        case "NOT_ENOUGH_ENERGY":
            message = "Insufficient MP !";
            break;
        
        case "BOARD_IS_FULL":
            message = "The board is already full !";
            break;

        case "CARD_NOT_IN_HAND":
            message = "The card isn't in your hand.";
            break;

        case "CARD_IS_SLEEPING":
            message = "Wait for the next turn to play this card.";
            break;

        case "MUST_ATTACK_TAUNT_FIRST":
            message = "You must attack the Taunt card first.";
            break;

        case "OPPONENT_CARD_HAS_STEALTH":
            message = "Wait until it lost its stealth.";
            break;

        case "HERO_POWER_ALREADY_USED":
            message = "You already used your Hero Power during this turn.";
            break;
    }
    
    messageNode.innerHTML = message;
    setTimeout(function(){messageNode.innerHTML = ""}, 5000);
}


const updateGameInfos = () => {
    timerNode.innerHTML = gameInfos.remainingTurnTime;
    
    if (gameInfos.yourTurn == true) {
        playerInfoNode.style.background = isYourTurnBackground;
        opponentInfoNode.style.background = isNotYourTurnBackground;
    }
    else {
        playerInfoNode.style.background = isNotYourTurnBackground;
        opponentInfoNode.style.background = isYourTurnBackground;
    }

    opponentHpNode.innerHTML = gameInfos.opponent.hp;
    opponentMpNode.innerHTML = gameInfos.opponent.mp;
    opponentDeckNode.innerHTML = gameInfos.opponent.handSize;

    playerHpNode.innerHTML = gameInfos.hp;
    playerMpNode.innerHTML = gameInfos.mp;
    playerDeckNode.innerHTML = gameInfos.hand.length;

    
    while (opponentBoardNode.hasChildNodes()) {
        opponentBoardNode.removeChild(opponentBoardNode.firstChild);
      }
    let opponentBoardCards = gameInfos.opponent.board;
    for (let i = 0; i < opponentBoardCards.length; i++) {
        let card = getCard(opponentBoardCards[i])
        let cardChildNodes = card.childNodes;
        cardChildNodes.forEach(node => {
            node.addEventListener("click", function(){attackTarget(card)});
        });        
        opponentBoardNode.append(card);       
    }


    while (playerBoardNode.hasChildNodes()) {
        playerBoardNode.removeChild(playerBoardNode.firstChild);
      }
    let playerBoardCards = gameInfos.board;
    for (let i = 0; i < playerBoardCards.length; i++) {
        let card = getCard(playerBoardCards[i])
        let cardChildNodes = card.childNodes;
        cardChildNodes.forEach(node => {
            node.addEventListener("click", function(){beginAttack(card)});
        });        
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
        let card = getCard(playerHandCards[i]);
        /////////////////////////////////////////////
        //card.setAttribute(data-cardID);
        ////////////////////////////////////////////
        let cardChildNodes = card.childNodes;
        cardChildNodes.forEach(node => {
            node.addEventListener("click", function(){putOnBoard(card)});
        });
        playerHandNode.append(card);       
    }    
}


const initializeGameInfos = () => {
    
    playerData2Node.innerHTML = localStorage.getItem("username") + "<br> (" + gameInfos.heroClass + ")";

    opponentNameNode.innerHTML = gameInfos.opponent.username;
    opponentHeroClassNode.innerHTML = gameInfos.opponent.heroClass;
    opponentAvatarNode.innerHTML = `        
        <img src="${CLASSPICS[gameInfos.opponent.heroClass].path}" alt="${gameInfos.opponent.heroClass}">
        `;

    //playerHeroClassNode.innerHTML = gameInfos.heroClass;

    let playerAvatarNode = document.querySelector(".player-data");
    playerAvatarNode.style.background = `url(${CLASSPICS[gameInfos.heroClass].path}) no-repeat bottom`;
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
            gameInfos = data;
            console.log(gameInfos);

            if (gameInfos == "WAITING") {
                console.log(gameInfos);
            }
            else if (typeof gameInfos !== "object") {
                displayMessage(gameInfos);
            }
            else {
                if (!gameInfosInitialized) {
                    initializeGameInfos();
                    splashNode.style.animation = "fadeOut 1s linear";
                    setTimeout(function() {splashNode.remove()}, 1000)
                    gameInfosInitialized = true;                
                }
                updateGameInfos();              
            }  
            setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
        })
}


window.addEventListener("load", () => {

    splashNode = document.querySelector(".splash");
    
    timerNode = document.querySelector(".timer");

    opponentInfoNode = document.querySelector(".opponent-info");

    opponentDataNode = document.querySelector(".opponent-data");
    opponentDataNode.id = 0;
    opponentDataNode.addEventListener("click", function(){attackTarget(opponentDataNode)});
    let opponentDataNodes = opponentDataNode.childNodes;
    opponentDataNodes.forEach(node => {
            node.id = 0;
            node.addEventListener("click", function(){attackTarget(node)});
        });
    
    opponentNameNode = document.querySelector(".opponent-name");
    opponentHeroClassNode = document.querySelector(".opponent-hero-class");
    opponentAvatarNode = document.querySelector(".opponent-avatar");
    opponentHpNode = document.querySelector(".opponent-hp");
    opponentMpNode = document.querySelector(".opponent-mp");
    opponentDeckNode = document.querySelector(".opponent-deck");

    messageNode = document.querySelector(".message");

    playerInfoNode = document.querySelector(".player-info");
    playerData2Node = document.querySelector(".player-data2");
    playerNameNode = document.querySelector(".player-name");
    playerHeroClassNode = document.querySelector(".player-hero-class");
    playerHpNode = document.querySelector(".player-hp");
    playerMpNode = document.querySelector(".player-mp");
    playerDeckNode = document.querySelector(".player-deck");
    playerHandNode = document.querySelector(".player-hand");
    heroPowerNode  = document.querySelector(".hero-power");
    heroPowerNode.addEventListener("click", function(){useHeroPower()});
    endTurnNode  = document.querySelector(".end-turn");
    endTurnNode.addEventListener("click", function(){endTurn()});

    gameBoardNode = document.querySelector(".game-board");
    opponentBoardNode = document.querySelector(".opponent-board");
    playerBoardNode = document.querySelector(".player-board");

    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});