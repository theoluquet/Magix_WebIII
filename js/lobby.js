let deckVisible;
let deckFrameNode;
let deckMenuNode;
let deckTextNode;


window.onload = () => {
    deckVisible = false;
    deckFrameNode = document.querySelector(".deck-frame");
    deckMenuNode = document.querySelector(".deck");
    deckTextNode = document.querySelector(".deck-text");

    deckMenuNode.onclick = manageDeck;
    
    // Saves the user name in localStorage
    let username = document.querySelector(".username").innerHTML
    localStorage.setItem("username", username);
};


function manageDeck() {
    if (deckVisible == false) {
        deckFrameNode.style.display = "inherit";
        deckTextNode.innerHTML = "Close<br>Deck";
        deckTextNode.style.cursor = "pointer";
        deckTextNode.onclick = manageDeck;
        deckVisible = true;
    }
    else if (deckVisible == true) {
        deckFrameNode.style.display = "none";
        deckTextNode.innerHTML = "Open<br>Deck";
        deckTextNode.style.cursor = "default";
        deckTextNode.onclick = null;
        deckVisible = false;
    }
}