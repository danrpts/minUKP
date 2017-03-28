var parseArgs = require('minimist');

var argv = parseArgs(process.argv.slice(2), { 
  default: {

    /* inputs */
    a: 0, // first weight constraint
    b: 0, // second weight constraint
    c: 0, // third weight constraint

    //TODO
    e: false, // explicit dimension (testing purpose)
    p: false, // prevent exponential blowup (do not store all possibilities)

    /* switches */
    o: false, // cost only

  }
});

const W1 = argv.a;
const W2 = argv.b;
const W3 = argv.c;

/* note: higher-dimensional DP w/ a zeroed-dimension reduces to its lower-dimensional analog */
const USE_IMPLICIT_LOWER_DIMENSION = !argv.e;
const PREVENT_BLOWUP = !argv.p;
const RETURN_COST_ONLY = argv.o;

// TODO: input from file and tokenize
/* note: costs and weights are strictly positive */
/* convention: items are stored [cost, w1, w2, ..., wm]  */
const ITEMS = [[2, 2, 1, 1], [3, 2, 1, 1], [2, 4, 1, 1]];

const M = require('./lib/dp_nd.js')(ITEMS, W1, W2, W3);

var cost = M.get(W1, W2, W3)[0];

//var cost = M[W1][W2][W3][0];

if (RETURN_COST_ONLY) {

  console.log(cost);

}

else {

  console.log(cost, require('./lib/bt_nd.js')(M, ITEMS, W1, W2, W3));

}