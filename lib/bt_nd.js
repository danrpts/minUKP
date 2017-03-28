module.exports = function (table, items, ...ws) {

  const backtrack = ws => {

    var os = [];

    // clamp weights
    ws = ws.map(w => (w > 0) ? w : 0)

    if (ws.reduce((w, a) => w + a) < 1) os.push([]);

    else {

      /* convention: items are stored [cost, idx, idx ...], so skip first */

      var choices = table.get(...ws);

      for (var i = 1; i < choices.length; i++) {

        var j = choices[i];

        var bs = backtrack(ws.map((w, l) => w - items[j][l + 1]));

        bs.forEach(b => { 
          
          b.push(j); 

          os.push(b);
        
        });

      }

    }

    return os;

  }

  return backtrack(ws);

}
