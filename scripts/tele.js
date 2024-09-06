var tonConnectUI

window.onload = function(){
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json'
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