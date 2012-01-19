/*
 * Unit tests for the Clique computations.
 * 
 * The following tests are run under QUnit. 
 */

$(function () {
  
  /*
   * Ensure that the clique.js library is present
   */
  module("Library Inclusion");
  
  test("clique.js", function () {
    ok($C, "clique.js library not found; ensure you've made the build.");
  });
  
  /*
   * Tests for the Math module
   */
  module("Combinatorics");
  
  test("Factorial", function () {
    equal(Math.factorial(0), 1);
    equal(Math.factorial(1), 1);
    equal(Math.factorial(3), 6);
  });
  
  test("Choose", function () {
    equal(Math.choose(1, 1), 1);
    equal(Math.choose(2, 1), 2);
    equal(Math.choose(2, 2), 1);
    equal(Math.choose(4, 2), 6);
  });
  
  
  /*
   * Tests for the matrix components
   * including the Sylvester objects
   */
  module("Matrices");
  
  test("Matrix Definitions", function () {
    ok($M([0]));
    ok($M([1, 2, 3]));
    ok($M([
      [1, 2, 3],
      [2, 4, 5],
      [-1, 20, 0]
    ]));
  });
  
  test("Matrix Element Sums", function () {
    // TODO
  });
  
  test("Matrix Norm", function () {
    // TODO
  });
  
  test("Matrix Ones", function () {
    // TODO
  });
  
  test("Matrix Sort", function () {
    // TODO
  });
  
  test("firstNonZero", function () {
    // TODO
  });
  
  /*
   * Tests for the vector components
   * including the Sylvester objects
   */
  module("Vectors");
  
  test("Vector Definitions", function () {
    ok($V([0]));
    ok($V([0, -1, 2, 0]));
  });
  
  test("Vector Sums", function () {
    // TODO
  });
  
  
  /*
   * Tests for custom Sylvester functionalities
   */
  module("Sylvester Customs");
  
  test("setElement", function () {
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(1, 2, 5)
      .eql($M([
        [0, 5, 1],
        [9, 8, 7]
      ]))
    );
  });
  
  test("setRow", function () {
    ok(
      $M([
        [0, 1, 0]
      ]).setRow(1, $V([1, 1, 1]))
      .eql($M([
        [1, 1, 1]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 0],
        [2, 3, 2]
      ]).setRow(2, $V([1, 1, 1]))
      .eql($M([
        [0, 1, 0],
        [1, 1, 1]
      ]))
    );
  });
  
  test("setCol", function () {
    ok(
      $M([
        [0, 1, 1],
        [2, 3, 4],
        [4, 5, 6]
      ]).setCol(2, $V([5, 5, 5]))
      .eql($M([
        [0, 1, 1],
        [5, 5, 5],
        [4, 5, 6]
      ]))
    );
  });
  
  test("swapRows", function () {
    ok(
      $M([
        [0, 1, 0],
        [5, 5, 5],
        [6, 7, 8]
      ]).swapRows(2, 3)
      .eql($M([
        [0, 1, 0],
        [6, 7, 8],
        [5, 5, 5]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 0],
        [5, 5, 5],
        [6, 7, 8]
      ]).swapRows(2, 2)
      .eql($M([
        [0, 1, 0],
        [5, 5, 5],
        [6, 7, 8]
      ]))
    );
  });
  
  
  /*
   * Tests for the eig module
   */
  module("Eigenvectors");
  
  test("Multiplicities", function () {
    // TODO
  });
  
  test("gausianElimination", function () {
    // TODO
  });
  
  test("pivotSwap", function () {
    // TODO
  });
  
  
  /***** TESTING SECTION *****/
  test("testingSection", function() {
    // Left intentionally blank >_> <_<
  });
  
});
