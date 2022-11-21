export default function getCard(cardInfos) {    

    const UID = cardInfos.uid;
    const ID = cardInfos.id;
    const MECHANICS = cardInfos.mechanics;
    const COST = cardInfos.cost;
    const ATK = cardInfos.atk;
    const HP = cardInfos.hp;
    const DEDICATED = cardInfos.dedicated;
    let cardImg = "assets/cards/default.png";
    let cardType = "default";

    if ((MECHANICS.length > 0) && (MECHANICS[0] != "")) {
        if (MECHANICS[0].startsWith("Battlecry")) {
            cardImg = "assets/cards/battlecry.png";
            cardType = "battlecry";

        }
        else if (MECHANICS[0].startsWith("Charge")) {
            cardImg = "assets/cards/charge.png";
            cardType = "charge";
        }
        else if (MECHANICS[0].startsWith("Deathratlle")) {
            cardImg = "assets/cards/deathratlle.png";
            cardType = "deathratlle";
        }
        else if (MECHANICS[0].startsWith("Stealth")) {
            cardImg = "assets/cards/stealth.png";
            cardType = "stealth";
        }
        else if (MECHANICS[0].startsWith("Taunt")) {
            cardImg = "assets/cards/taunt.png";
            cardType = "taunt";
        }
    }
    
    let cardNode = document.createElement("div");
    cardNode.className = `card ${cardType}`;
    cardNode.id = `${UID}`;

    cardNode.innerHTML = `        
        <div class="card-img-container" id="${UID}">
            <img src="${cardImg}" class="card-img" id="${UID}">
        </div>
        <div class="card-mechanic" id="${UID}">${MECHANICS}</div>
        <div class="card-stats" id="${UID}">
        <div class="card-attack" id="${UID}">${ATK}</div>
        <div class="card-hp" id="${UID}">${HP}</div>
            <div class="card-cost-mp" id="${UID}">${COST}</div>
        </div>
        <div class="card-dedicated" id="${UID}">${DEDICATED}</div>
        `;
        
    //cardNode.querySelectorAll("div, img").id = `${UID}`;

    return cardNode;
}