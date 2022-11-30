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


const isYourTurnBackground = "linear-gradient( rgba(230, 230, 230, 0.9), rgba(230, 230, 230, 0.3) )";
const isNotYourTurnBackground = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9) )";

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
let playerAvatarNode;
let playerHpNode;
let playerMpNode;
let playerDeckNode;
let playerHandNode;
let heroPowerNode;
let endTurnNode;

let playerBoardNode;
let opponentBoardNode;



window.addEventListener("load", () => {

    splashNode = document.querySelector(".splash");
    messageNode = document.querySelector(".message");    
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


    playerInfoNode = document.querySelector(".player-info");
    playerData2Node = document.querySelector(".player-data2");
    playerAvatarNode = document.querySelector(".player-data");
    playerHpNode = document.querySelector(".player-hp");
    playerMpNode = document.querySelector(".player-mp");
    playerDeckNode = document.querySelector(".player-deck");
    playerHandNode = document.querySelector(".player-hand");

    heroPowerNode  = document.querySelector(".hero-power");
    heroPowerNode.addEventListener("click", function(){useHeroPower()});
    endTurnNode  = document.querySelector(".end-turn");
    endTurnNode.addEventListener("click", function(){endTurn()});


    opponentBoardNode = document.querySelector(".opponent-board");
    playerBoardNode = document.querySelector(".player-board");

    setTimeout(state, 1000);
});


const state = () => {

    let formData = new FormData();
    formData.append("game-update", "true");

    fetch("ajax.php", { 
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {       
            gameInfos = data;

            if (typeof gameInfos !== "object") {
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
            setTimeout(state, 1000); // [PROF] Attendre 1 seconde avant de relancer l’appel
        })
}


const initializeGameInfos = () => {
    
    playerData2Node.innerHTML = localStorage.getItem("username") + "<br> (" + gameInfos.heroClass + ")";
    playerAvatarNode.style.background = `url(${CLASSPICS[gameInfos.heroClass].path}) no-repeat bottom`;

    opponentNameNode.innerHTML = gameInfos.opponent.username;
    opponentHeroClassNode.innerHTML = gameInfos.opponent.heroClass;
    opponentAvatarNode.innerHTML = `<img src="${CLASSPICS[gameInfos.opponent.heroClass].path}">`;
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
    opponentDeckNode.innerHTML = gameInfos.opponent.handSize + "/" + gameInfos.opponent.remainingCardsCount;

    playerHpNode.innerHTML = gameInfos.hp;
    playerMpNode.innerHTML = gameInfos.mp;
    playerDeckNode.innerHTML = gameInfos.hand.length + "/" + gameInfos.remainingCardsCount;

    
    while (opponentBoardNode.hasChildNodes()) {
        opponentBoardNode.removeChild(opponentBoardNode.firstChild);
      }
    let opponentBoardCards = gameInfos.opponent.board;
    for (let i = 0; i < opponentBoardCards.length; i++) {
        let card = getCard(opponentBoardCards[i]);
        card.addEventListener("click", function(){attackTarget(card)});

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
        card.addEventListener("click", function(){beginAttack(card)});

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
        let card = getCard(playerHandCards[i]);
        card.addEventListener("click", function(){putOnBoard(card)});

        if (gameInfos.mp < playerHandCards[i].cost) {
            card.style.opacity = "0.75";
        }

        let cardChildNodes = card.childNodes;
        cardChildNodes.forEach(node => {
            node.addEventListener("click", function(){putOnBoard(card)});
        });
        playerHandNode.append(card);       
    }    
}



function putOnBoard(cardNode) {
    pickedCardUID = cardNode.id;
    console.log(pickedCardUID);
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
                // Tell the database that this card was played
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
                displayMessage("HERO_POWER");
            }
        })
        updateGameInfos();
}


function endTurn() {
    let formData = new FormData();
    formData.append("END_TURN", "END_TURN");
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (typeof data !== "object") {
                displayMessage(data);
            }
        })
        updateGameInfos();
}


function displayMessage(data) {
    let message = "";
    messageNode.style.fontSize = "1.8rem"
    messageNode.style.color = "whitesmoke";
    messageNode.style.fontFamily = 'ReggaeOne';
    switch(data) {
        case "LAST_GAME_WON":
            message = "Victory !";
            messageNode.style.fontSize = "5rem";
            messageNode.style.color = "gold";
            messageNode.style.fontFamily = 'Triforce';
            break;
        
        case "LAST_GAME_LOST":
            message = "Defeat ...";
            messageNode.style.fontSize = "5rem";
            messageNode.style.color = "crimson";
            messageNode.style.fontFamily = 'Triforce';
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

        case "CARD_IS_SLEEPING":
            message = "Wait for the next turn to play this card.";
            break;

        case "MUST_ATTACK_TAUNT_FIRST":
            message = "You must attack the Taunt card first.";
            break;

        case "OPPONENT_CARD_HAS_STEALTH":
            message = "Wait until it lost its stealth.";
            break;

        case "HERO_POWER":
            message = "Hero Power used !";
            break;

        case "HERO_POWER_ALREADY_USED":
            message = "You already used it during this turn !";
            break;
    }
    
    messageNode.innerHTML = message;
    setTimeout(function(){messageNode.innerHTML = ""}, 5000);
}