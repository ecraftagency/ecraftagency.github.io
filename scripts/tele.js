async function connectOpenFort(evt) {
    /*
    const fetchPromise = fetch("https://api.doschain.com/game/config");
    fetchPromise.then(response => {
      response.json().then(a => {
        evt(JSON.stringify(a))
      })
    });
    */

    resp = await fetch("https://api.doschain.com/game/config");
    payload = await resp.json()
    evt(JSON.stringify(payload))
}