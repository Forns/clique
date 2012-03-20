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
    equal($C(2.475, -0.221).real, 2.475);
    equal($C(2.475, -0.221).im, -0.221);
    equal($C().real, 0);
  });
  
  test("equals & equal", function () {
    ok($C(0, 0).equals($C(0, 0)));
    ok($C(1, -4).equals($C(1, -4)));
    ok($C(0).equals(0));
    ok(Complex.equal(0, $C(0)));
    ok(Complex.equal(-2, $C(-2)));
    ok(Complex.equal($C(5, 0), 5));
    ok(Complex.equal(0.523, $C(0.523)));
    ok(!Complex.equal($C(5, 1), 5));
    ok(!Complex.equal($C(5, 0), $C(0, 5)));
    ok(Complex.equal($C(2, 2), $C(2, 2)));
    ok(Complex.equal($C(-0.2231, 78.29), $C(-0.2231, 78.29)));
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
    ok(Complex.areComplex($C(1), $C(1, 2), $C(0.871023, -5.89123)));
  });
  
  test("fromRect", function () {
    var complex1 = $C(0, 0),
        complex2 = $C(1, -2),
        complex3 = $C(4, 0),
        complex4 = $C(12.818, -2.222);
    
    ok(complex1.fromRect(1, -2).equals(complex2));
    ok(complex1.equals(complex2));
    ok(complex2.fromRect(4, 0).equals(complex3));
    ok(!complex2.equals(complex1));
    ok(complex3.fromRect(12.818, -2.222).equals(complex3));
  });
  
  test("fromPolar", function () {
    ok($C(0, 0).fromPolar(1, 0).equals($C(1, 0)));
    ok($C(0, 0).fromPolar(0, 0).equals($C(0, 0)));
    ok($C(0, 0).fromPolar(1.52, 0).equals($C(1.52, 0)));
    ok($C(0, 0).fromPolar(-1.52, 0).equals($C(-1.52, 0)));
    ok($C(0, 0).fromPolar(-1, Math.PI / 2).equals($C(-1 * Math.cos(Math.PI / 2), -1 * Math.sin(Math.PI / 2))));
  });
  
  test("angleOf", function () {
    ok(isNaN(Complex.angleOf($C(0, 0))));
    ok(isNaN(Complex.angleOf(0)));
    equal(Complex.angleOf(1), 0);
    equal(Complex.angleOf(-1), 180);
    equal(Complex.angleOf($C(0, 1)), Math.PI / 2);
    equal(Complex.angleOf($C(1, 0)), 0);
    equal(Complex.angleOf($C(1, 1)), Math.PI / 4);
    equal(Complex.angleOf($C(-1, 1)), 3 * Math.PI / 4);
    equal(Complex.angleOf($C(-1, -1)), -3 * Math.PI / 4);
    equal(Complex.angleOf($C(1, -1)), -1 * Math.PI / 4);
  });
  
  test("log", function () {
    ok(isNaN(Complex.log(50, 1)));
    ok(isNaN(Complex.log($C(23, -50), 1)));
    ok(Complex.log($C(0, -3), Math.E).equals($C(Math.log(3) / Math.log(Math.E), -1 * Math.PI / 2)));
    ok(Complex.log($C(1, 1), Math.E).equals($C(Complex.log(Math.sqrt(2), Math.E), Math.PI / 4)));
  });
  
  test("exp", function () {
    ok(Complex.exp(0), 1);
    ok(Complex.exp($C(1, 0)).equals($C(Math.E)));
    ok(Complex.exp($C(0, 1)).equals($C(0.5403023058681398, 0.8414709848078965)));
    ok(Complex.exp($C(-1, -1)).equals($C(0.19876611034641298, -0.3095598756531122)));
  });
  
  test("pow", function () {
    equal(Complex.pow(2, 3), 8);
    equal(Complex.pow(2, 0), 1);
    ok(Complex.pow($C(2), 2), $C(4));
    ok(Complex.pow($C(2), 0), $C(1));
    ok(Complex.pow($C(0, 2), 3), $C(0, -8));
    ok(Complex.pow($C(0, 2), 0), $C(1));
    ok(Complex.pow($C(2, 2), 2), $C(0, 8));
    ok(Complex.pow($C(2, 2), 3), $C(-16, 16));
  });
  
  test("modulus", function () {
    equal($C(0, 0).modulus(), 0);
    equal($C(0, 2).modulus(), 2);
    equal($C(-2, 0).modulus(), 2);
    equal($C(2, -2).modulus(), Math.sqrt(8));
    equal($C(-3.2, 3.7).modulus(), 4.8918299234540035);
  });
  
  test("negate", function () {
    equal(Complex.negate(3), -3);
    ok($C(0, 0).negate().equals($C(0, 0)));
    ok($C(-2, 3).negate().equals($C(2, -3)));
    ok(Complex.negate($C(1, -3)).equals($C(-1, 3)));
    ok(Complex.negate($C(0.8983777, -3.78172)).equals($C(-0.8983777, 3.78172)));
  });
  
  test("conjugate", function () {
    ok($C(0, 0).conjugate().equals($C(0, 0)));
    ok($C(-2, 3).conjugate().equals($C(-2, -3)));
    ok($C(0.222, 0.222).conjugate().equals($C(0.222, -0.222)));
  });
  
  test("magnitude", function () {
    equal(Complex.magnitude(0), 0);
    equal(Complex.magnitude(5), 5);
    equal(Complex.magnitude(-5), 5);
    equal(Complex.magnitude($C(-2, 0)), 2);
    equal(Complex.magnitude($C(2, -2)), Math.sqrt(8));
    equal(Complex.magnitude($C(-3.2, 3.7)), 4.8918299234540035);
  });
  
  test("round", function () {
    equal(Complex.round(0.5), 1);
    equal(Complex.round(0.49), 0);
    ok(Complex.equal(Complex.round($C(0.5)), $C(1)));
    ok(Complex.equal(Complex.round($C(0.49, -0.51)), $C(0, -1)));
  });
  
  test("add", function () {
    equal(Complex.add(1, 2), 3);
    ok(Complex.add($C(1), 2).equals($C(3)));
    ok(Complex.add(3, $C(-1)).equals($C(2)));
    ok(Complex.add($C(1, 1), 2).equals($C(3, 1)));
    ok(Complex.add($C(1, -1), $C(0, 2)).equals($C(1, 1)));
    ok(Complex.add($C(-2.5, -1.25), $C(3, 1)).equals($C(0.5, -0.25)));
  });
  
  test("sub", function () {
    equal(Complex.sub(1, 2), -1);
    ok(Complex.sub($C(1), 2).equals($C(-1)));
    ok(Complex.sub(3, $C(-1)).equals($C(4)));
    ok(Complex.sub($C(1, 1), 2).equals($C(-1, 1)));
    ok(Complex.sub($C(1, -1), $C(0, 2)).equals($C(1, -3)));
    ok(Complex.sub($C(-2.5, -1.25), $C(3, 1)).equals($C(-5.5, -2.25)));
  });
  
  test("mult", function () {
    equal(Complex.mult(1, 2), 2);
    ok(Complex.mult($C(1), 2).equals($C(2)));
    ok(Complex.mult(3, $C(-1)).equals($C(-3)));
    ok(Complex.mult($C(1, 1), 2).equals($C(2, 2)));
    ok(Complex.mult($C(1, -1), $C(0, 2)).equals($C(2, 2)));
    ok(Complex.mult($C(1, -1), $C(-2, -3)).equals($C(-5, -1)));
    ok(Complex.mult($C(1, -1), 0).equals($C(0, 0)));
    ok(Complex.mult($C(1, -1), $C(0, 0)).equals($C(0, 0)));
    ok(Complex.mult($C(-0.5, -0.5), $C(-0.5, 0.5)).equals($C(0.5, 0)));
  });
  
  test("divide", function () {
    equal(Complex.divide(1, 1), 1);
    equal(Complex.divide(0, 70234), 0);
    equal(Complex.divide(1, 5), 0.2);
    ok(Complex.divide($C(1), 2).equals($C(0.5)));
    ok(Complex.divide(1, $C(2)).equals($C(0.5)));
    ok(Complex.divide(5, $C(2, 1)).equals($C(2, -1)));
    ok(Complex.divide($C(4, -2), $C(-2, 4)).equals($C(-0.8, -0.6)));
    ok(Complex.divide($C(-0.5, -0.5), $C(-0.5, 0.5)).equals($C(0, 1)));
  });
  
  test("sqrt", function () {
    equal(Complex.sqrt(0), 0);
    equal(Complex.sqrt(4), 2);
    ok(Complex.sqrt(-4).equals($C(0, 2)));
    ok(Complex.sqrt($C(-4)).equals($C(0, 2)));
    ok(Complex.sqrt($C(0.5, -0.5)).equals($C(0.7768869870150187, -0.32179712645279135)));
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
  
  test("Vector: Complex Elements", function () {
    equal($V([$C(0, 1)]).inspect(), "[i]");
    equal($V([$C(2, -1)]).inspect(), "[2-i]");
    equal($V([$C(2, -1), $C(2, 0)]).inspect(), "[2-i, 2]");
    equal($V([$C(2, -1), $C(2, 0), $C(0, 2), 3]).inspect(), "[2-i, 2, 2i, 3]");
  });
  
  test("Vector: append", function () {
    ok($V([1]).append().eql($V([1])));
    ok($V([1]).append(2).eql($V([1, 2])));
    ok($V([0, 0, 0]).append(0).eql($V([0, 0, 0, 0])));
  });
  
  test("Vector: sort", function () {
    ok(Vector.sort($V([1])).eql($V([1])));
    ok(Vector.sort($V([0, 0, 0])).eql($V([0, 0, 0])));
    ok(Vector.sort($V([-1, 0, 1])).eql($V([-1, 0, 1])));
    ok(Vector.sort($V([1, 1, -1, -1, 0])).eql($V([-1, -1, 0, 1, 1])));
  });
  
  test("Vector: sum", function () {
    equal(Vector.sum($V([1])), 1);
    equal(Vector.sum($V([1, -1])), 0);
    equal(Vector.sum($V([1, 2, -4, 8])), 7);
    ok(Vector.sum($V([1, $C(2, -1), -4, 8])).equals($C(7, -1)));
  });
  
  test("Vector: insert", function () {
    ok(Vector.insert($V([1]), 1, 2).eql($V([2, 1])));
    ok(Vector.insert($V([1, 2, 3]), 1, 0).eql($V([0, 1, 2, 3])));
    ok(Vector.insert($V([1, 2, 3]), 2, 0).eql($V([1, 0, 2, 3])));
    ok(Vector.insert($V([1, 2, 3]), 4, 0).eql($V([1, 2, 3, 0])));
  });
  
  test("Vector: remove", function () {
    ok($V([1, 2]).remove(1, 1).eql($V([2])));
    ok($V([1, 2, 3, 4]).remove(4, 1).eql($V([1, 2, 3])));
    ok($V([1, 2, 3, 4]).remove(4, 0).eql($V([1, 2, 3, 4])));
    ok($V([1, 2, 3, 4]).remove(2, 2).eql($V([1, 4])));
  });
  
  test("Vector: ones", function () {
    ok(Vector.ones(1).eql($V([1])));
    ok(Vector.ones(4).eql($V([1, 1, 1, 1])));
  });
  
  test("Vector: setElement", function () {
    ok($V([1]).setElement(1, 2).eql($V([2])));
    ok($V([1, 2, 3]).setElement(2, 0).eql($V([1, 0, 3])));
    ok($V([2, 0, 3]).setElement(3, $C(1, 1)).eql($V([2, 0, $C(1, 1)])));
  });
  
  test("Matrix: Complex Elements", function () {
    equal($M([$C(0, 1)]).inspect(), "[i]");
    equal($M([$C(2, -1)]).inspect(), "[2-i]");
    equal($M([[$C(2, -1), $C(2, 0)]]).inspect(), "[2-i, 2]");
    equal($M([[$C(2, -1), $C(2, 0), $C(0, 2), 3]]).inspect(), "[2-i, 2, 2i, 3]");
    equal($M([
      [$C(2, -1), $C(2, 0), $C(0, 2), 3],
      [$C(0), 4, $C(-5, 2), 3]
    ]).inspect(), "[2-i, 2, 2i, 3]\n[0, 4, -5+2i, 3]");
  });
  
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
    
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(2, 2, $C(5, -5))
      .eql($M([
        [0, 1, 1],
        [9, $C(5, -5), 7]
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
    equal(
      $M(
        [0]
      ).sum(), 0
    );
    
    equal(
      $M(
        [1]
      ).sum(), 1
    );
    
    equal(
      $M(
        [1, 0, 1]
      ).sum(), 2
    );
    
    equal(
      $M([
        [1, 1, 1],
        [2, 2, 2]
      ]).sum(), 9
    );
    
    equal(
      $M(
        [1, 2, 3]
      ).sum(2), 14
    );
    
    equal(
      $M([
        [1, 2, 3],
        [1, 2, -3]
      ]).sum(2), 28
    );
    
    ok(
      $M([
        [1, 2, 3],
        [1, $C(2, 2), -3]
      ]).sum(1).equals($C(6, 2))
    );
  });
  
  test("Matrix: ones", function () {
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
    equal(
      $M([
        [0]
      ]).norm(), 0
    );
    
    equal(
      $M([
        [0, 1, 0]
      ]).norm(), 1
    );
    
    equal(
      $M([
        [0, 2, 2],
        [-2, 2, 0]
      ]).norm(), 4
    );
    
    ok(
      $M([
        [0, 2, 2],
        [-2, $C(2), 0]
      ]).norm().equals($C(4))
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
    
    deepEqual(
      Matrix.firstNonZero($M([
        [0, 0, 0],
        [0, 0, $C(0, 1)]
      ])), [2, 3, $C(0, 1)]
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
  module("Spectral Analysis");
  
  test("kSet", function () {
    // TODO
    ok(true);
  });
  
  /***** TESTING SECTION *****/
  test("testingSection", function() {
    // Left intentionally blank >_> <_<
    console.log(Matrix.kSet(5, 2));
    ok(true);
  });
  
});
