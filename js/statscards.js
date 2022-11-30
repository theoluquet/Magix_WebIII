import getCard from "./card.js"

let allCards;
let allStats;
let statsContainerNode;
let buttonNode;


window.addEventListener("load", () => {

    statsContainerNode = document.querySelector(".stats-container");
    buttonNode = document.querySelector("button");
    buttonNode.onclick = resetStats;

    let formData = new FormData();
    formData.append("getStats", "getStats");
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            
                allStats = data["stats"]; // List of all the played cards & their statistics (from by the database)
                allCards = data["cards"]; // List all the Magix cards (from the Magix API)

                // When there's no statistics to display
                if (data["stats"].length == 0) {
                    let noStatsNode = document.createElement("div");
                    noStatsNode.classList.add("no-stats");
                    noStatsNode.innerHTML = "No data available, come back after a few games !";
                    statsContainerNode.append(noStatsNode);
                }
                else {
                    // Display each played card :
                    allStats.forEach(card => {

                        let cardInfoNode = document.createElement("div");
                        cardInfoNode.classList.add("card-info");

                        let cardNode = getCard(allCards[card["cardid"]-1]);

                
                        let cardDataNode = document.createElement("div");
                        cardDataNode.classList.add("card-data");

                        let cardTimesPlayedNode = document.createElement("div");
                        cardTimesPlayedNode.classList.add("card-times-played");
                        cardTimesPlayedNode.innerHTML = "Played " + card.times_played + " times through all games";
                        cardDataNode.append(cardTimesPlayedNode);

                        let cardPopularityNode = document.createElement("div");
                        cardPopularityNode.classList.add("card-opularity");
                        cardPopularityNode.innerHTML = "(" + Math.round(card.popularity) + "% of all played cards)";
                        cardDataNode.append(cardPopularityNode);
                
                
                        cardInfoNode.append(cardNode);
                        cardInfoNode.append(cardDataNode);

                        statsContainerNode.append(cardInfoNode);        
                    });
                    buttonNode.style.display = "initial";
                }
        }) 
});


function resetStats() {
    let formData = new FormData();
    formData.append("resetStats", "resetStats");
    fetch("ajax.php", { 
        method: "POST", 
        body: formData
    })
        .then(response => response.json())
        .then(data => {})
    
    window.location.reload(true);
    buttonNode.style.display = "none";
}