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
        <div class="card-img-container" id="${ID}">
            <img src="${cardImg}" class="card-img" id="${ID}">
        </div>
        <div class="card-mechanic">${MECHANICS}</div>
        <div class="card-stats">
            <div class="card-cost-mp">${COST}</div>
            <div class="card-attack">${ATK}</div>
            <div class="card-hp">${HP}</div>
        </div>
        <div class="card-dedicated">${DEDICATED}</div>
        `;    

    return cardNode;
}