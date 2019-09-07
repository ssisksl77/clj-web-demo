_.once = function(func) {
    var flag, result;
    return function() {
        if(flag) return result;
        flag = true;
        return result = func.apply(this, arguments);
    }
}

function skip(body) {
    var yes;
    return function() {
        return yes || (yes = body.apply(null, arguments));
    }
}