module.exports = (table, items, x, y, z) => {

  return (function backtrack (x, y, z) {

    var os = [];

    // clamp
    x = (x > 0) ? x : 0;
    y = (y > 0) ? y : 0;
    z = (z > 0) ? z : 0;

    if (x + y + z < 1) os.push([]);

    else {

      /* convention: items are stored [cost, idx, idx ...], so skip first */

      for (var i = 1; i < table[x][y][z].length; i++) {

        var j = table[x][y][z][i];

        var bs = backtrack(x - items[j][1], y - items[j][2], z - items[j][3]);

        bs.forEach((b) => { 
          
          b.push(j); 

          os.push(b);
        
        });

      }

    }

    return os;

  })(x, y, z);

}
