const elements = ["💧", "🔥", "🪨", "⚡️", "🌱", "☁️"];

document.getElementById("spawnButton").addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let element = document.getElementById("type").value;
    let lineColour = document.getElementById("lineColour").value;
    let petImage = document.getElementById("petImage").value;
    let worldImage = document.getElementById("worldImage").value;
    let backgroundIMage = document.getElementById("backgroundImage").value;

    let frame = `https://lumilovesyou.github.io/giphypet/giphy/giphy.html?name=${name ? name : "Mildew"}&linecolour=${lineColour ? lineColour.replace("#", "%23") : "#ffffff"}&petimg=${petImage ? petImage : "https://lumilovesyou.github.io/lumiverse/assets/images/giphypet/mildew.gif"}&worldimg=${worldImage ? worldImage : "https://lumilovesyou.github.io/giphypet/giphy/assets/images/giphypet/world.webp"}&bgimg=${backgroundIMage ? backgroundIMage : "https://lumilovesyou.github.io/giphypet/giphy/assets/images/giphypet/background.png"}&element=${parseInt(element)}&born=${Date.now()}"}`;

    document.getElementById("iframe").src = frame;
    document.getElementById("output").innerHTML = frame;
});