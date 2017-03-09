var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {
    x: 0
  }
});

// minimum weight
var W = argv.x;

var items = [[2, 2], [3, 2], [2, 4]];

// optimal costs
var m = new Array(W + 1);

// optimal choices (backtrack for optimal solution)
var k = Array.from(m);

k[0] = NaN;

m.fill(Infinity);

m[0] = 0;

// optimal weights
var s = Array.from(m);

// pseudo-poly O(nW)
for (var w = 1; w <= W; w++) {

  // try to fit each item
  for (var i = 0; i < items.length; i++) {

    // assume item i overflows sack
    var j = 0;

    // item i weight
    var wi = items[i][1];

    // otherwise, item i fits sack
    if (wi <= w) j = w - wi;

    // total weight of sack
    var tw = wi + s[j];

    // total cost of sack
    var tc = items[i][0] + m[j];

    // if weight and cost of sack is competitive
    if (tw <= s[w] && tc <= m[w]) {

      // update minimum weight
      s[w] = tw;

      // update minimum cost
      m[w] = tc;

      // update choice item
      k[w] = i;
    
    }

  }

}

// optimal solution
var o = [];

var w = W;

while (w > 0) {

  // choice item
  var j = k[w];

  o.push(j);

  // update weight
  w -= items[j][1];

}

console.log("; cost:", m[W], "weight:", s[W], "; optimal solution: ", o);