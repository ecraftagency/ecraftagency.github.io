var WalletSvc
//var url = "http://localhost:9091/triplematch"
var url = "https://test-api.doschain.com/triplematch"

window.onload = function(){
    WalletSvc = new WalletService()
    WalletSvc.initEvent()
}

function WalletService() {
    this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://ecraftagency.github.io/tonconnect-manifest.json'
    });
}

var handleStatusChange = async function(wl) {
    if (wl === undefined || wl == null) {
        Web3Events.onEvent(JSON.stringify({
            event: "wallet_disconnected"
        }));
        try {
            const resp = await fetch(url + "/disconnect_wallet", {
                method: "POST",
                headers: {
                    "X-Authorization": WalletSvc.getTeleUserData(),
                },
            });
            const json = await resp.json()
        }
        catch(err) {
            console.error(err.message);
        }
        return
    }

    try {
        const resp = await fetch(url + "/connect_wallet", {
            method: "POST",
            body: JSON.stringify(wl),
            headers: {
                "X-Authorization": WalletSvc.getTeleUserData(),
            },
        });
        const json = await resp.json()
    }
    catch(err) {
        console.error(err.message);
    }

    Web3Events.onEvent(JSON.stringify({
        event: "wallet_connected",
        wallet: wl
    }));
}

WalletService.prototype.initEvent = function() {
    const unsubscribe = this.tonConnectUI.onStatusChange(handleStatusChange);
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

WalletService.prototype.disconnectWallet = function() {
    return this.tonConnectUI.disconnect()
}

WalletService.prototype.isConnected = function() {
    return this.tonConnectUI.connected
}

WalletService.prototype.getTeleUserData = function() {
    if (window.Telegram == null || window.Telegram == undefined || window.Telegram.WebApp.initData == '') {
        return "query_id=AAF7SMZKAAAAAHtIxkrawHln&user=%7B%22id%22%3A1254508667%2C%22first_name%22%3A%22V%C5%A9%22%2C%22last_name%22%3A%22Nguy%E1%BB%85n%22%2C%22username%22%3A%22vu_nguyenhoang%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725765431&hash=04f2865306dc216d0cb08e6748e046a169f7e14a993edf3cb827f1f96b4fb9f1"
    }
    return window.Telegram.WebApp.initData
}

WalletService.prototype.getUserUrl = function() {
    return url + "/user/" + window.telegramId
}

WalletService.prototype.getTelegramId = function() {
    if (window.Telegram == null || window.Telegram == undefined || window.Telegram.WebApp.initData == '') {
        return "query_id=AAF7SMZKAAAAAHtIxkrawHln&user=%7B%22id%22%3A1254508667%2C%22first_name%22%3A%22V%C5%A9%22%2C%22last_name%22%3A%22Nguy%E1%BB%85n%22%2C%22username%22%3A%22vu_nguyenhoang%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725765431&hash=04f2865306dc216d0cb08e6748e046a169f7e14a993edf3cb827f1f96b4fb9f1"
    }
    return window.Telegram.WebApp.initData
}

window.getPlayerData = async function (key, callback) {
    try {
        const resp = await fetch(url + "/get_play_data", {
            method: "GET",
            headers: {
                "X-Authorization": WalletSvc.getTeleUserData(),
            },
        });
        const json = await resp.json();
        window.telegramId = json.msg
        callback(JSON.stringify(json.data))
    }
    catch(err) {
        console.error(err.message);
        callback('')
    }
}

window.setPlayerData = async function(key, data) {
    try {
        const resp = await fetch(url + "/set_play_data", {
            method: "POST",
            body: data,
            headers: {
                "X-Authorization": WalletSvc.getTeleUserData(),
            },
        });
        const json = await resp.json()
    }
    catch(err) {
        console.error(err.message);
    }
}