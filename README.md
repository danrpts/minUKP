# One dimension
## Problem
Given a set of items each with cost c_i and weight w_i, add 0 or more of each item to a knapsack such that total weight is at least W and total cost is minimized.

## Solution
Let x be the weight constraint of some arbitrary knapsack and define M[x] to be its minimum cost. Using dynamic programming, M[x] = min_{i=1}^{n} (c_i + m[x - w_i]). The optimal cost is then given by M[W]. Using a backtracking algorithm the optimal solution can also be found.