
## Description
Given a set of items each with a weight w_i and cost c_i, add 0 or more of each item to a knapsack such that the total weight of the knapsack is at least some minimum weight W and the total cost C is minimized.

## Solution
Let x be the minimum weight desired for some arbitrary knapsack, and let M[x] be its minimum cost. Using dynamic programming, we define M[x] = min_{i=1}^{n} (c_i + m[x - w_i]). The optimal cost for a knapsack with minimum weight W is then given by M[W]. Using a backtracking algorithm the optimal solution can also be found.
