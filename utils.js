exports.find = function(xs, fn){
    for (var i=0; i<xs.length; i++){
       if (fn(xs[i], i, xs)) return xs[i];
    }
}

