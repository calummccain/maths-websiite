function loadJSON(path) {

    var xhr = new XMLHttpRequest();
    var obj = "";
    xhr.open("GET", path, false);
    //xhr.responseType = "json";
    //xhr.send();
    console.log(xhr);
    //console.log("sent");

    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            console.log(JSON.parse(xhr.response).v);
        }
    } catch (err) { // instead of onerror
        alert("Request failed");
    }

    // xhr.onload = function () {

    //     console.log("Loaded");

    //     if (xhr.status != 200) { // HTTP error?
    //         // handle error
    //         alert('Error: ' + xhr.status);
    //         return;
    //     }

    //     // get the response from xhr.response
    //     console.log(xhr.responseText);

    //     return obj
    // };

    // xhr.onprogress = function (event) {
    //     // report progress
    //     alert(`Loaded ${event.loaded} of ${event.total}`);
    // };

    // xhr.onerror = function () {
    //     // handle non-HTTP error (e.g. network down)
    // };

    console.log(xhr);
    return obj;
}


export { loadJSON }