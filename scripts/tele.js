var tonConnectUI

window.onload = function(){
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ecraftagency.github.io/tonconnect-manifest.json'
    });
}

async function connectOpenFort(evt) {
    resp = await fetch("https://api.doschain.com/game/config");
    payload = await resp.json()
    evt(JSON.stringify(payload))
}

async function openTonModal() {

    await tonConnectUI.openModal();
}