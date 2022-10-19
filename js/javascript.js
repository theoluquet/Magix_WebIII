window.addEventListener("load", () => {
    setInterval(() => {
        updateGame();
    }, 1000);
})

function updateGame() {

    let formData = new FormData();
    formData.append("game-update", "true");

    fetch("ajax.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json()) // prend le JSON, transforme en structure native JS
    .then(result => {

    })
}