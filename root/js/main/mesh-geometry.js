function meshGeometry(schlafli) {

    var location;

    if (["353", "435", "534", "535"].includes(schlafli)) {

        alert("compact");
        location = "../data/compact/".concat(schlafli, ".js");
        alert(location);

    } else if (["336", "344", "436", "536"].includes(schlafli)) {

        alert("paracompact");
        location = "../data/paracompact/".concat(schlafli, ".js");
        alert(location);

    } else {

        alert("will do this later");

    }

    //import(location).then(module => { f = module.f; });

    import(location).then(m => alert(m.f));

    // let myFirstPromise = new Promise((resolve, reject) => {
    //     setTimeout(function () { resolve("Success!") }, 250)
    // })

}

export { meshGeometry };