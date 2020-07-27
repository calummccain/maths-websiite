function layer(n, basics) {

    var words = [];
    
    if (n == 1) {
        var start = [''];
    } else {
        var start = layer(n - 1, basics);
    }

    for (var i = 0; i < start.length; i++) {
        for (var j = 0; j < basics.length; j++) {
            words.push(basics[j] + 'd' + start[i]);
        }
    }
    return words;
}

export { layer };