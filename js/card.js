export default function getCard(cardInfos) {    

    const UID = cardInfos.uid;
    const ID = cardInfos.id;
    const MECHANICS = cardInfos.mechanics;
    const COST = cardInfos.cost;
    const ATK = cardInfos.atk;
    const HP = cardInfos.hp;
    const STATE = cardInfos.state;
    const DEDICATED = cardInfos.dedicated;
    let cardImgPath = "assets/cards/default.png";
    let cardType = "default";

    let cardNode = document.createElement("div");

    cardNode.id = `${UID}`;
    cardNode.setAttribute("data-ID", ID);

    if (STATE == "SLEEP") {
        cardNode.style.opacity = 0.75;        
    }
    if (STATE == "CONFUSED") {
        cardNode.style.transform = "scaleX(-1)";
    }


    if ((MECHANICS.length > 0) && (MECHANICS[0] != "")) {
        if (MECHANICS[0].startsWith("Battlecry")) {
            cardImgPath = "assets/cards/battlecry.png";
            cardType = "battlecry";
            cardNode.style.border = "outset rgb(100, 16, 16) 4px";
        }
        else if (MECHANICS[0].startsWith("Charge")) {
            cardImgPath = "assets/cards/charge.png";
            cardType = "charge";
            cardNode.style.border = "ridge rgb(100, 16, 16) 4px";
        }
        else if (MECHANICS[0].startsWith("Deathrattle")) {
            cardImgPath = "assets/cards/deathrattle.png";
            cardType = "deathratlle";
            cardNode.style.border = "inset rgb(100, 16, 16) 4px";
        }
        else if (MECHANICS[0].startsWith("Stealth")) {
            cardImgPath = "assets/cards/stealth.png";
            cardType = "stealth";
            cardNode.style.border = "dashed rgb(100, 16, 16) 2px";
        }
        else if (MECHANICS[0].startsWith("Taunt")) {
            cardImgPath = "assets/cards/taunt.png";
            cardType = "taunt";
            cardNode.style.border = "double rgb(100, 16, 16) 4px";
        }        
    }
    
    cardNode.className = `card ${cardType} clickable`;
    

    cardNode.innerHTML = `
        <div class="card-stats" id="${UID}">
            <div class="card-attack" id="${UID}">${ATK} </div>
            <div class="card-hp" id="${UID}"> ${HP}</div>
            <div class="card-cost-mp" id="${UID}">${COST}</div>
        </div>        
        <div class="card-img-container" id="${UID}">
            <img src="${cardImgPath}" class="card-img" id="${UID}">
        </div>
        <div class="card-mechanic" id="${UID}">${MECHANICS}</div>        
        <div class="card-dedicated" id="${UID}">${DEDICATED}</div>
        `;

    return cardNode;
}