var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {
    w: 0
  }
});

const W = argv.w;

var items = [[2, 2], [3, 2], [2, 4]];

var m = new Array(W + 1);

m.fill(Infinity);

m[0] = 0;

for (var w = 1; w <= W; w++) {

  for (var i = 0; i < items.length; i++) {

    // item i overflows sack
    var j = 0;

    var wi = items[i][1];

    // item i fits sack
    if (wi <= w) j = w - wi;

    var tc = items[i][0] + m[j];

    m[w] = Math.min(m[w], tc);

  }

}

console.log(m[W]);
