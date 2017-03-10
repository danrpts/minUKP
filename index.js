var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {
    a: 0, // first weight constraint
    b: 0, // second weight constraint
    c: 0, // third weight constraint
    no: false, // do not backtrack
    strict: false // testing purposes
  }
});

const W1 = argv.a;

const W2 = argv.b;

const W3 = argv.c;

const RETURN_COST_ONLY = argv.no;

/* note: higher-dimension DP w/ a zeroed-dimension reduces to lower-dimension analog */
const USE_IMPLICIT_LOWER_DIMENSION = !argv.strict;

// TODO: input from file and tokenize
const ITEMS = [[2, 2, 1, 1], [3, 2, 1, 1], [2, 4, 1, 1]];


if (USE_IMPLICIT_LOWER_DIMENSION) {

  // build the dp table
  const M = require('./lib/dp_3d.js')(ITEMS, W1, W2, W3);

  var cost = M[W1][W2][W3][0][0];

  if (RETURN_COST_ONLY) {
    console.log(cost);
  }

  else {

    console.log(cost, require('./lib/backtrack_3d.js')(M, ITEMS, W1, W2, W3));
  }

}