const request = new XMLHttpRequest();
request.open("GET", "scripts/wasm");
request.responseType = "arraybuffer";
request.send();

request.onload = () => {
    const bytes = request.response;
    const go = new Go();
    WebAssembly.instantiate(bytes, go.importObject).then((result) => {
        go.run(result.instance);
    });
};