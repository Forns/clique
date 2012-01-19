/**
 * Basic mathematic cobinatoric functions seeded into
 * the Math library
 */
(function () {
  
  // The standard factorial function
  Math.factorial = function (n) {
    var result = 1;
    for (var i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };
  
  // The standard choose function: n! / (k!*(n-k)!)
  Math.choose = function (n, k) {
    return Math.factorial(n) / (Math.factorial(k) * Math.factorial(n - k));
  };
  
})();