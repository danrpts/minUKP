var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {

    /* inputs */
    a: 0, // first weight constraint
    b: 0, // second weight constraint
    c: 0, // third weight constraint

    /* switches */
    o: false, // cost only

    //TODO
    e: false, // explicit dimension (testing purpose)
    p: false // prevent exponential blowup (do not store all possibilities)

  }
});

const W1 = argv.a;

const W2 = argv.b;

const W3 = argv.c;

const RETURN_COST_ONLY = argv.o;

/* note: higher-dimension DP w/ a zeroed-dimension reduces to lower-dimension analog */
const USE_IMPLICIT_LOWER_DIMENSION = !argv.e;

const PREVENT_BLOWUP = !argv.s;

// TODO: input from file and tokenize
/* note: costs and weights are strictly positive */
const ITEMS = [[2, 2, 1, 1], [3, 2, 1, 1], [2, 4, 1, 1]];

const M = require('./lib/dp_3nd.js')(ITEMS, W1, W2, W3);

var cost = M.get(W1, W2, W3)[0];

if (RETURN_COST_ONLY) {

  console.log(cost);

}

else {

  console.log(cost, require('./lib/bt_3nd.js')(M, ITEMS, W1, W2, W3));

}