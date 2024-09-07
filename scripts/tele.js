var WalletSvc

window.onload = function(){
    WalletSvc = new WalletService()
    WalletSvc.initEvent()
}

function WalletService() {
    this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ecraftagency.github.io/tonconnect-manifest.json'
    });
}
WalletService.prototype.initEvent = function() {
    const unsubscribe = this.tonConnectUI.onStatusChange(
        wallet => {
            if (wallet === undefined || wallet == null) {
                return
            }
            Web3Events.onWalletConnected(JSON.stringify(wallet));
        }
    );
    window.addEventListener('connection-completed', (event) => {
        Web3Events.onWalletConnected(JSON.stringify(event));
    });

    window.addEventListener('ton-connect-ui-connection-started', (event) => {
            Web3Events.onWalletConnectStarted(JSON.stringify(event));
        });

    window.addEventListener('ton-connect-ui-disconnection', (event) => {
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

WalletService.prototype.fetch = async function() {
    let resp = await fetch("https://api.doschain.com/game/config");
    let payload = await resp.json()
    return payload
}