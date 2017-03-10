module.exports = (table, items, x) => {

  return (function backtrack (x) {

    var os = [];

    // clamp
    x = (x > 0) ? x : 0;

    if (x < 1) os.push([]);
    
    else {

      for (var i = 0; i < table[x].length; i++) {

        var j = table[x][i][1];

        var bs = backtrack(x - items[j][1]);

        bs.forEach((b) => { b.push(j); os.push(b); });

      }

    }

    return os;

  })(x);

}
