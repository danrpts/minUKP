module.exports = (table, items, x, y) => {

  return (function backtrack (x, y) {

    var os = [];

    // clamp
    x = (x > 0) ? x : 0;
    y = (y > 0) ? y : 0;

    if (x + y < 1) os.push([]);

    else {

      /* convention: items are stored [cost, idx, idx ...], so skip first */

      for (var i = 1; i < table[x][y].length; i++) {

        var j = table[x][y][i];

        var bs = backtrack(x - items[j][1], y - items[j][2]);

        bs.forEach((b) => { 
          
          b.push(j); 

          os.push(b);
        
        });

      }

    }

    return os;

  })(x, y);

}
