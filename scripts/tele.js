var WalletSvc

window.onload = function(){
    WalletSvc = new WalletService()
    WalletSvc.initEvent()
}

async function connectOpenFort() {
    resp = await fetch("https://api.doschain.com/game/config");
    payload = await resp.json()
    return evt(JSON.stringify(payload))
}

function WalletService() {
    this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ecraftagency.github.io/tonconnect-manifest.json'
    });
}
WalletService.prototype.initEvent = function() {
    window.addEventListener('ton-connect-ui-connection-completed', (event) => {
        console.log('wallet connected', event);
        Web3Events.onWalletConnected(JSON.stringify(event));
    });

    window.addEventListener('ton-connect-ui-connection-started', (event) => {
            console.log('wallet connected', event);
            Web3Events.onWalletConnectStarted(JSON.stringify(event));
        });

    window.addEventListener('ton-connect-ui-disconnection', (event) => {
        console.log('wallet disconnected', event);
        Web3Events.onWalletDisconnected(JSON.stringify(event));
    });
}

WalletService.prototype.openConnectPopup = async function() {
    await this.tonConnectUI.openModal();
}

WalletService.prototype.wallet = function() {
    if (this.tonConnectUI.wallet == null) {
        return ""
    }
    return JSON.stringify(this.tonConnectUI.wallet)
}

WalletService.prototype.isConnected = function() {
    return this.tonConnectUI.connected
}