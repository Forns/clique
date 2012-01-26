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
    ok($CQ, "clique.js library not found; ensure you've made the build.");
  });
  
  
  /*
   * Tests for the Complex Number library 
   */
  module("Complex");
  
  test("Complex.create", function () {
    ok($C(1, 2));
    ok(Complex.create(3, 4));
    equal($C(-1, -2).real, -1);
    equal($C(-1, -2).im, -2);
    equal($C().real, 0);
  });
  
  test("equals & equal", function () {
    ok($C(0, 0).equals($C(0, 0)));
    ok($C(1, -4).equals($C(1, -4)));
    ok(Complex.equal($C(2, 2), $C(2, 2)));
  });
  
  test("areComplex", function () {
    var varTest = $C(1);
    ok(!(Complex.areComplex()));
    ok(!(Complex.areComplex(1)));
    ok(!(Complex.areComplex(1, 2, 3, -5)));
    ok(!(Complex.areComplex(1, 2, 3, $C(1))));
    ok(!(Complex.areComplex($C(1), $C(1, 2), $C(0, -5), 1)));
    ok(!(Complex.areComplex($C(1), varTest, 1)));
    ok(Complex.areComplex(varTest));
    ok(Complex.areComplex($C(1)));
    ok(Complex.areComplex($C(1), $C(1, 2), $C(0, -5)));
  });
  
  test("fromRect", function () {
    var complex1 = $C(0, 0),
        complex2 = $C(1, -2),
        complex3 = $C(4, 0);
    
    ok(complex1.fromRect(1, -2).equals(complex2));
    ok(complex1.equals(complex2));
    ok(complex2.fromRect(4, 0).equals(complex3));
    ok(!complex2.equals(complex1));
  });
  
  test("modulus", function () {
    equal($C(0, 0).modulus(), 0);
    equal($C(0, 2).modulus(), 2);
    equal($C(-2, 0).modulus(), 2);
    equal($C(2, -2).modulus(), Math.sqrt(8));
  });
  
  test("negate", function () {
    equals(Complex.negate(3), -3);
    ok($C(0, 0).negate().equals($C(0, 0)));
    ok($C(-2, 3).negate().equals($C(2, -3)));
    ok(Complex.negate($C(1, -3)).equals($C(-1, 3)));
  });
  
  test("conjugate", function () {
    ok($C(0, 0).conjugate().equals($C(0, 0)));
    ok($C(-2, 3).conjugate().equals($C(-2, -3)));
  });
  
  test("add", function () {
    equal(Complex.add(1, 2), 3);
    ok(Complex.add($C(1), 2).equals($C(3)));
    ok(Complex.add(3, $C(-1)).equals($C(2)));
    ok(Complex.add($C(1, 1), 2).equals($C(3, 1)));
    ok(Complex.add($C(1, -1), $C(0, 2)).equals($C(1, 1)));
  });
  
  test("sub", function () {
    equal(Complex.sub(1, 2), -1);
    ok(Complex.sub($C(1), 2).equals($C(-1)));
    ok(Complex.sub(3, $C(-1)).equals($C(4)));
    ok(Complex.sub($C(1, 1), 2).equals($C(-1, 1)));
    ok(Complex.sub($C(1, -1), $C(0, 2)).equals($C(1, -3)));
  });
  
  test("toString", function () {
    equal($C(0, 0).toString(), "0");
    equal($C(0, 1).toString(), "i");
    equal($C(0, -3).toString(), "-3i");
    equal($C(1, 0).toString(), "1");
    equal($C(-1, 0).toString(), "-1");
    equal($C(1, 3).toString(), "1+3i");
    equal($C(-1, -3).toString(), "-1-3i");
    equal($C(1, -1).toString(), "1-i");
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
   * Tests for custom Sylvester functionalities
   */
  module("Sylvester Customs");
  
  test("Matrix: setElement", function () {
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
    
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(2, 2, -5)
      .eql($M([
        [0, 1, 1],
        [9, -5, 7]
      ]))
    );
  });
  
  test("Matrix: setRow", function () {
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
  
  test("Matrix: setCol", function () {
    ok(
      $M([
        [0, 1, 1]
      ]).setCol(1, $V([-2]))
      .eql($M([
        [-2, 1, 1]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 1],
        [2, 3, 4],
        [4, 5, 6]
      ]).setCol(2, $V([5, 5, 5]))
      .eql($M([
        [0, 5, 1],
        [2, 5, 4],
        [4, 5, 6]
      ]))
    );
  });
  
  test("Matrix: sums", function () {
    equals(
      $M(
        [0]
      ).sum(), 0
    );
    
    equals(
      $M(
        [1]
      ).sum(), 1
    );
    
    equals(
      $M(
        [1, 0, 1]
      ).sum(), 2
    );
    
    equals(
      $M([
        [1, 1, 1],
        [2, 2, 2]
      ]).sum(), 9
    );
    
    equals(
      $M(
        [1, 2, 3]
      ).sum(2), 14
    );
    
    equals(
      $M([
        [1, 2, 3],
        [1, 2, -3]
      ]).sum(2), 28
    );
  });
  
  test("Matrix: Ones", function () {
    ok(
      Matrix.ones(1, 1)
      .eql($M([
        [1]
      ]))
    );
    
    ok(
      Matrix.ones(2, 2)
      .eql($M([
        [1, 1],
        [1, 1]
      ]))
    );
    
    ok(
      Matrix.ones(3, 4)
      .eql($M([
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]))
    );
  });
  
  test("Matrix: norm", function () {
    equals(
      $M([
        [0]
      ]).norm(), 0
    );
    
    equals(
      $M([
        [0, 1, 0]
      ]).norm(), 1
    );
    
    equals(
      $M([
        [0, 2, 2],
        [-2, 2, 0]
      ]).norm(), 4
    );
  });
  
  test("Matrix: sort", function () {
    ok(
      Matrix.sort(
        $M([1])
      ).eql($M(
        [1]
      ))
    );
    
    ok(
      Matrix.sort(
        $M([1, 2])
      ).eql($M(
        [1, 2]
      ))
    );
    
    ok(
      Matrix.sort(
        $M([
          [1, 2, 3],
          [2, 1, 2]
        ])
      ).eql($M([
        [1, 1, 2],
        [2, 2, 3]
      ]))
    );
    
    ok(
      Matrix.sort(
        $M([
          [-1, 2, -3],
          [2, 1, -2],
          [5, 0, 0]
        ])
      ).eql($M([
        [-1, 0, -3],
        [2, 1, -2],
        [5, 2, 0]
      ]))
    );
  });
  
  test("Matrix: firstNonZero", function () {
    deepEqual(
      Matrix.firstNonZero($M([
        [0]
      ])), [0, 0, 0]
    );
    
    deepEqual(
      Matrix.firstNonZero($M([
        [0, 0, 1]
      ])), [1, 3, 1]
    );
    
    deepEqual(
      Matrix.firstNonZero($M([
        [0, 0, 0],
        [0, 0, 1]
      ])), [2, 3, 1]
    );
  });
  
  test("Matrix: swapRows", function () {
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
