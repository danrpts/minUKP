module.exports = (table, items, x) => {

  return (function backtrack (x) {

    var os = [];

    // clamp
    x = (x > 0) ? x : 0;

    if (x < 1) os.push([]);
    
    else {

      /* convention: items are stored [cost, idx, idx ...], so skip first */

      for (var i = 1; i < table[x].length; i++) {

        var j = table[x][i];

        var bs = backtrack(x - items[j][1]);

        bs.forEach((b) => { 
          
          b.push(j); 

          os.push(b);
        
        });

      }

    }

    return os;

  })(x);

}
