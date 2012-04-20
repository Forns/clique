/*
 * Unit tests for the Clique computations.
 * 
 * The following tests are run under QUnit. 
 */

$(function () {
  
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
  
  test("equal & equal", function () {
    ok($C(0, 0).equal($C(0, 0)));
    ok($C(1, -4).equal($C(1, -4)));
    ok($C(0).equal(0));
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
    
    ok(complex1.fromRect(1, -2).equal(complex2));
    ok(complex1.equal(complex2));
    ok(complex2.fromRect(4, 0).equal(complex3));
    ok(!complex2.equal(complex1));
    ok(complex3.fromRect(12.818, -2.222).equal(complex3));
  });
  
  test("fromPolar", function () {
    ok($C(0, 0).fromPolar(1, 0).equal($C(1, 0)));
    ok($C(0, 0).fromPolar(0, 0).equal($C(0, 0)));
    ok($C(0, 0).fromPolar(1.52, 0).equal($C(1.52, 0)));
    ok($C(0, 0).fromPolar(-1.52, 0).equal($C(-1.52, 0)));
    ok($C(0, 0).fromPolar(-1, Math.PI / 2).equal($C(-1 * Math.cos(Math.PI / 2), -1 * Math.sin(Math.PI / 2))));
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
    ok(Complex.log($C(0, -3), Math.E).equal($C(Math.log(3) / Math.log(Math.E), -1 * Math.PI / 2)));
    ok(Complex.log($C(1, 1), Math.E).equal($C(Complex.log(Math.sqrt(2), Math.E), Math.PI / 4)));
  });
  
  test("exp", function () {
    ok(Complex.exp(0), 1);
    ok(Complex.exp($C(1, 0)).equal($C(Math.E)));
    ok(Complex.exp($C(0, 1)).equal($C(0.5403023058681398, 0.8414709848078965)));
    ok(Complex.exp($C(-1, -1)).equal($C(0.19876611034641298, -0.3095598756531122)));
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
    ok($C(0, 0).negate().equal($C(0, 0)));
    ok($C(-2, 3).negate().equal($C(2, -3)));
    ok(Complex.negate($C(1, -3)).equal($C(-1, 3)));
    ok(Complex.negate($C(0.8983777, -3.78172)).equal($C(-0.8983777, 3.78172)));
  });
  
  test("conjugate", function () {
    ok($C(0, 0).conjugate().equal($C(0, 0)));
    ok($C(-2, 3).conjugate().equal($C(-2, -3)));
    ok($C(0.222, 0.222).conjugate().equal($C(0.222, -0.222)));
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
    ok(Complex.add($C(1), 2).equal($C(3)));
    ok(Complex.add(3, $C(-1)).equal($C(2)));
    ok(Complex.add($C(1, 1), 2).equal($C(3, 1)));
    ok(Complex.add($C(1, -1), $C(0, 2)).equal($C(1, 1)));
    ok(Complex.add($C(-2.5, -1.25), $C(3, 1)).equal($C(0.5, -0.25)));
  });
  
  test("sub", function () {
    equal(Complex.sub(1, 2), -1);
    ok(Complex.sub($C(1), 2).equal($C(-1)));
    ok(Complex.sub(3, $C(-1)).equal($C(4)));
    ok(Complex.sub($C(1, 1), 2).equal($C(-1, 1)));
    ok(Complex.sub($C(1, -1), $C(0, 2)).equal($C(1, -3)));
    ok(Complex.sub($C(-2.5, -1.25), $C(3, 1)).equal($C(-5.5, -2.25)));
  });
  
  test("mult", function () {
    equal(Complex.mult(1, 2), 2);
    ok(Complex.mult($C(1), 2).equal($C(2)));
    ok(Complex.mult(3, $C(-1)).equal($C(-3)));
    ok(Complex.mult($C(1, 1), 2).equal($C(2, 2)));
    ok(Complex.mult($C(1, -1), $C(0, 2)).equal($C(2, 2)));
    ok(Complex.mult($C(1, -1), $C(-2, -3)).equal($C(-5, -1)));
    ok(Complex.mult($C(1, -1), 0).equal($C(0, 0)));
    ok(Complex.mult($C(1, -1), $C(0, 0)).equal($C(0, 0)));
    ok(Complex.mult($C(-0.5, -0.5), $C(-0.5, 0.5)).equal($C(0.5, 0)));
  });
  
  test("divide", function () {
    equal(Complex.divide(1, 1), 1);
    equal(Complex.divide(0, 70234), 0);
    equal(Complex.divide(1, 5), 0.2);
    ok(Complex.divide($C(1), 2).equal($C(0.5)));
    ok(Complex.divide(1, $C(2)).equal($C(0.5)));
    ok(Complex.divide(5, $C(2, 1)).equal($C(2, -1)));
    ok(Complex.divide($C(4, -2), $C(-2, 4)).equal($C(-0.8, -0.6)));
    ok(Complex.divide($C(-0.5, -0.5), $C(-0.5, 0.5)).equal($C(0, 1)));
  });
  
  test("sqrt", function () {
    equal(Complex.sqrt(0), 0);
    equal(Complex.sqrt(4), 2);
    ok(Complex.sqrt(-4).equal($C(0, 2)));
    ok(Complex.sqrt($C(-4)).equal($C(0, 2)));
    ok(Complex.sqrt($C(0.5, -0.5)).equal($C(0.7768869870150187, -0.32179712645279135)));
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
    ok($V());
    equal($V([$C(0, 1)]).inspect(), "[i]");
    equal($V([$C(2, -1)]).inspect(), "[2-i]");
    equal($V([$C(2, -1), $C(2, 0)]).inspect(), "[2-i, 2]");
    equal($V([$C(2, -1), $C(2, 0), $C(0, 2), 3]).inspect(), "[2-i, 2, 2i, 3]");
  });
  
  test("Vector: append", function () {
    ok($V().append(1).equal($V([1])));
    ok($V().append($V([1, 2, 3])).equal($V([1, 2, 3])));
    ok($V([1]).append().equal($V([1])));
    ok($V([1]).append(2).equal($V([1, 2])));
    ok($V([0, 0, 0]).append(0).equal($V([0, 0, 0, 0])));
    ok($V([0]).append($V([1])).equal($V([0, 1])));
    ok($V([$C(1, 1), 0, 1, 2]).append($V([3, 4, 5])).equal($V([$C(1, 1), 0, 1, 2, 3, 4, 5])));
  });
  
  test("Vector: sort", function () {
    ok(Vector.sort($V()).equal($V()));
    ok(Vector.sort($V([1])).equal($V([1])));
    ok(Vector.sort($V([0, 0, 0])).equal($V([0, 0, 0])));
    ok(Vector.sort($V([-1, 0, 1])).equal($V([-1, 0, 1])));
    ok(Vector.sort($V([1, 1, -1, -1, 0])).equal($V([-1, -1, 0, 1, 1])));
  });
  
  test("Vector: sum", function () {
    equal(Vector.sum($V()), 0);
    equal(Vector.sum($V([1])), 1);
    equal(Vector.sum($V([1, -1])), 0);
    equal(Vector.sum($V([1, 2, -4, 8])), 7);
    ok(Vector.sum($V([1, $C(2, -1), -4, 8])).equal($C(7, -1)));
  });
  
  test("Vector: insert", function () {
    ok(Vector.insert($V(), 1, 1), $V([1]));
    ok(Vector.insert($V([1]), 1, 2).equal($V([2, 1])));
    ok(Vector.insert($V([1, 2, 3]), 1, 0).equal($V([0, 1, 2, 3])));
    ok(Vector.insert($V([1, 2, 3]), 2, 0).equal($V([1, 0, 2, 3])));
    ok(Vector.insert($V([1, 2, 3]), 4, 0).equal($V([1, 2, 3, 0])));
  });
  
  test("Vector: remove", function () {
    ok($V().remove(1, 1).equal($V()));
    ok($V([1, 2]).remove(1, 1).equal($V([2])));
    ok($V([1, 2, 3, 4]).remove(4, 1).equal($V([1, 2, 3])));
    ok($V([1, 2, 3, 4]).remove(4, 0).equal($V([1, 2, 3, 4])));
    ok($V([1, 2, 3, 4]).remove(2, 2).equal($V([1, 4])));
  });
  
  test("Vector: ones", function () {
    ok(Vector.ones(0).equal($V()));
    ok(Vector.ones(1).equal($V([1])));
    ok(Vector.ones(4).equal($V([1, 1, 1, 1])));
  });
  
  test("Vector: setElement", function () {
    ok($V().setElement(1, 2).equal($V([2])));
    ok($V([1]).setElement(1, 2).equal($V([2])));
    ok($V([1, 2, 3]).setElement(2, 0).equal($V([1, 0, 3])));
    ok($V([2, 0, 3]).setElement(3, $C(1, 1)).equal($V([2, 0, $C(1, 1)])));
  });
  
  test("Vector: histoCount", function () {
    equal(Vector.histoCount($V(), 1), 0);
    equal(Vector.histoCount($V([1]), 1), 1);
    equal(Vector.histoCount($V([1]), 1), 1);
    equal(Vector.histoCount($V([$C(1)]), 1), 1);
    equal(Vector.histoCount($V([$C(1, 1)]), $C(1, 1)), 1);
    equal(Vector.histoCount($V([1, 2, 3, 4]), 2), 1);
    equal(Vector.histoCount($V([$C(1, 1), $C(1, 1), $C(1, 1)]), $C(1, 1)), 3);
    equal(Vector.histoCount($V([$C(1, 1), $C(1, -1), $C(-1, 1)]), $C(1, 1)), 1);
    equal(Vector.histoCount($V([$C(1, 1), 0, $C(1, 1)]), -1), 0);
    equal(Vector.histoCount($V([$C(1, 0), $C(1, -1), 1]), 1), 2);
    equal(Vector.histoCount($V([
      $V([1, 2, 1, $C(1, 1)]),
      $V([3, $C(4, 1), -1, -1]),
      $V([2, 2, 2, $C(1)])
    ]), 1), 3);
    equal(Vector.histoCount($V([
      $V([
        $V([1, 1, 1]),
        $V([2, 2, 1])
      ]),
      $V([
        $V([0, 0, 0]),
        $V([2, 2, -1])
      ]),
      $V([
        $V([1, 0, 1]),
        $V([2, 2, 2])
      ])
    ]), 1), 6);
  });
  
  test("Vector: multiplier", function () {
    equal(Vector.multiplier($V(), 1, 1), 1);
    equal(Vector.multiplier($V([1]), 1, 1), 1);
    equal(Vector.multiplier($V([1, 2]), 3, 1), 1);
    equal(Vector.multiplier($V([1, 2, 3]), 3, 1), 0.16666666666666666);
    equal(Vector.multiplier($V([0, 2, 5, 4]), 2, 1), 0.00017361111111111112);
  });
  
  test("Matrix: Complex Elements", function () {
    equal($M().inspect(), "[]");
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
    ok($M().setElement(1, 1, 5)
      .equal($M([
        [5]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(1, 2, 5)
      .equal($M([
        [0, 5, 1],
        [9, 8, 7]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(2, 2, -5)
      .equal($M([
        [0, 1, 1],
        [9, -5, 7]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 1],
        [9, 8, 7]
      ]).setElement(2, 2, $C(5, -5))
      .equal($M([
        [0, 1, 1],
        [9, $C(5, -5), 7]
      ]))
    );
  });
  
  test("Matrix: setRow", function () {
    ok(
      $M().setRow(1, $V([2, 2]))
      .equal($M([
        [2, 2]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 0]
      ]).setRow(1, $V([1, 1, 1]))
      .equal($M([
        [1, 1, 1]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 0],
        [2, 3, 2]
      ]).setRow(2, $V([1, 1, 1]))
      .equal($M([
        [0, 1, 0],
        [1, 1, 1]
      ]))
    );
  });
  
  test("Matrix: setCol", function () {
    ok(
      $M().setCol(1, $V([1, 2, 3]))
      .equal($M([
        [1],
        [2],
        [3]
      ]))
    );
    ok(
      $M([
        [0, 1, 1]
      ]).setCol(1, $V([-2]))
      .equal($M([
        [-2, 1, 1]
      ]))
    );
    ok(
      $M([
        [0, 1, 1],
        [2, 3, 4],
        [4, 5, 6]
      ]).setCol(2, $V([5, 5, 5]))
      .equal($M([
        [0, 5, 1],
        [2, 5, 4],
        [4, 5, 6]
      ]))
    );
  });
  
  test("Matrix: removeRow", function () {
    ok($M().removeRow(2).equal($M()));
    
    ok(
      $M([
        [0],
        [0]
      ]).removeRow(3).equal($M([
        [0],
        [0]
      ]))
    );
    
    ok(
      $M([
        [0],
        [0]
      ]).removeRow(1).equal($M([
        [0]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 2],
        [0, $C(3), $C(0, 1)]
      ]).removeRow(1).equal($M([
        [0, $C(3), $C(0, 1)]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 2],
        [0, $C(3), $C(0, 1)],
        [0, 0, 0],
        [3, 2, 1]
      ]).removeRow(2).equal($M([
        [0, 1, 2],
        [0, 0, 0],
        [3, 2, 1]
      ]))
    );
  });
  
  test("Matrix: removeColumn", function () {
    ok($M().removeCol(2).equal($M()));
    
    ok(
      $M([
        [0],
        [0]
      ]).removeCol(2).equal($M([
        [0],
        [0]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 2],
        [0, $C(3), $C(0, 1)]
      ]).removeCol(1).equal($M([
        [1, 2],
        [$C(3), $C(0, 1)]
      ]))
    );
    
    ok(
      $M([
        [0, 1, 2],
        [0, $C(3), $C(0, 1)],
        [0, 0, 0],
        [3, 2, 1]
      ]).removeCol(2).equal($M([
        [0, 2],
        [0, $C(0, 1)],
        [0, 0],
        [3, 1]
      ]))
    );
  });
  
  test("Matrix: setRange", function () {
    var s1 = $S(3, 3),
        s3 = $S(2, 4, [2, 2, 2], [2, 3, -1]),
        s4 = $S(2, 2, [1, 1, 1], [2, 1, 1]),
        
        m1 = $M([
          [0, 0, 0],
          [0, 1, 1],
          [0, 1, 2]
        ]),
        m2 = $M([
          [0, 0, 0, 0],
          [0, $C(1), $C(0, 1), 0],
          [0, 1, 1, 0]
        ]),
        m4 = $M([
          [1, 1],
          [2, 2],
          [3, 3]
        ]),
        m5 = $M(),
        
        // Correct answers
        a1 = $S(3, 3, [1, 1, 1], [1, 2, 1], [2, 1, 1], [2, 2, 2]),
        a2 = $S(3, 4, [3, 3, 1]),
        a3 = $M([
          [0, 0, 0, 0],
          [0, 2, -1, 0]
        ]),
        a4 = $M([
          [1, 0],
          [1, 0],
          [3, 3]
        ]);
        
    ok(s1.setRange(1, 1, 2, 2, m1, 2, 2, 3, 3).equal(a1));
    ok(m2.setRange(2, 2, 4, 4, m1, 1, 1, 2, 2).equal(a2));
    ok(m5.setRange(1, 1, m4.rows(), m4.cols(), m4).equal(m4));
    ok($S(2, 4).setRange(2, 2, 2, 3, s3, 2, 2, 2, 4).equal(a3));
    ok(m4.setRange(1, 1, 3, 3, s4).equal(a4));
  });
  
  test("Matrix: sums", function () {
    equal(
      $M().sum(), 0
    );
    
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
      ]).sum(1).equal($C(6, 2))
    );
  });
  
  test("Matrix: ones", function () {
    ok(
      Matrix.ones(0, 0).equal($M())
    );
    
    ok(
      Matrix.ones(1, 1)
      .equal($M([
        [1]
      ]))
    );
    
    ok(
      Matrix.ones(2, 2)
      .equal($M([
        [1, 1],
        [1, 1]
      ]))
    );
    
    ok(
      Matrix.ones(3, 4)
      .equal($M([
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]))
    );
  });
  
  test("Matrix: norm", function () {
    equal($M().norm(), 0);
    
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
      ]).norm().equal($C(4))
    );
  });
  
  test("Matrix: sort", function () {
    ok(
      Matrix.sort($M()).equal($M())
    );
    
    ok(
      Matrix.sort(
        $M([1])
      ).equal($M(
        [1]
      ))
    );
    
    ok(
      Matrix.sort(
        $M([1, 2])
      ).equal($M(
        [1, 2]
      ))
    );
    
    ok(
      Matrix.sort(
        $M([
          [1, 2, 3],
          [2, 1, 2]
        ])
      ).equal($M([
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
      ).equal($M([
        [-1, 0, -3],
        [2, 1, -2],
        [5, 2, 0]
      ]))
    );
  });
  
  test("Matrix: firstNonZero", function () {
    deepEqual(
      Matrix.firstNonZero($M()),
      [0, 0, 0]
    );
    
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
    ok($M().swapRows(2, 3).equal($M()));
    
    ok(
      $M([
        [0, 1, 0],
        [5, 5, 5],
        [6, 7, 8]
      ]).swapRows(2, 3)
      .equal($M([
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
      .equal($M([
        [0, 1, 0],
        [5, 5, 5],
        [6, 7, 8]
      ]))
    );
  });
  
  test("Matrix: full", function () {
    var m1 = $M([
          [0]
        ]),
        m2 = $M([
          [0, 0, 0]
        ]),
        m3 = $M([
          [0],
          [0],
          [0],
          [0]
        ]),
        m4 = $M([
          [0, 0, 0],
          [0, 0, 0]
        ]),
        m5 = $M([
          [0, 1, 0],
          [0, 0, $C(1, -1)]
        ]),
        s1 = $S(1, 1),
        s2 = $S(1, 3),
        s3 = $S(4, 1),
        s4 = $S(2, 3),
        s5 = $S(2, 3);
        
    ok(Matrix.full(s1).equal(m1));
    s1.setElement(1, 1, 1);
    m1.setElement(1, 1, 1);
    ok(Matrix.full(s1).equal(m1));
    ok(Matrix.full(s2).equal(m2));
    ok(Matrix.full(s3).equal(m3));
    ok(Matrix.full(s4).equal(m4));
    s5.setElement(1, 2, 1);
    s5.setElement(2, 3, $C(1, -1));
    ok(Matrix.full(s5).equal(m5));
  });
  
  test("Matrix: fliplr", function () {
    ok(
      Matrix.fliplr($M([[0]])).equal($M([[0]]))
    );
    ok(
      Matrix.fliplr($M([[0, 1, 2, 3, 4]])).equal($M([[4, 3, 2, 1, 0]]))
    );
    ok(
      Matrix.fliplr($M([
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11]
      ])).equal($M([
        [3, 2, 1, 0],
        [7, 6, 5, 4],
        [11, 10, 9, 8]
      ]))
    );
  });
  
  test("Sparse: create", function () {
    var s1 = Sparse.create(),
        s2 = $S(),
        s3 = Sparse.create(0, 0),
        s4 = $S(2, 3),
        s5 = $S(-2, -1);
    equal(s1.rows(), 0);
    ok(s1.elements);
    equal(s1.cols(), 0);
    equal(s2.rows(), 0);
    equal(s2.cols(), 0);
    equal(s3.rows(), 0);
    equal(s4.rows(), 2);
    equal(s4.cols(), 3);
    equal(s5.rows(), 0);
    equal(s5.cols(), 0);
  });
  
  test("Sparse: setElement && e", function () {
    var s1 = $S(),
        s2 = $S(1, 1),
        s3 = $S(1, 0),
        s4 = $S(1, 4),
        s5 = $S(3, 3);
        
    // Test set-up
    s2.setElement(1, 1, 2);
    s3.setElement(1, 0, $C(1));
    s4.setElement(1, 3, $C(0, -1));
    s5.setElement(2, 2, 5);
    s5.setElement(3, 1, $C(2, 2));
    
    equal(s1.e(1, 1), null);
    equal(s2.e(1, 1), 2);
    equal(s3.e(1, 1), null);
    equal(s4.e(1, 2), 0);
    equal(s5.e(1, 3), 0);
    equal(s5.e(4, 4), null);
    equal(s5.e(4, 4), null);
    ok(Complex.equal(s4.e(1, 3), $C(0, -1)));
    ok(Complex.equal(s5.e(3, 1), $C(2, 2)));
  });
  
  test("Sparse: setElements", function () {
    var s1 = $S(),
        s2 = $S(1, 1),
        s3 = $S(2, 3)
        m1 = $M([
          [1]
        ]),
        m2 = $M([
          [1, 0, 1],
          [0, 0, 0]
        ]),
        m3 = $M([
          [1, 0, 1],
          [0, 0, 0],
          [0, $C(1, -2), 0]
        ]);
        
    s1.setElements();
    ok(s1.equal(s1));
    s2.setElements([1, 1, 1]);
    ok(s2.equal(m1));
    s2.setElements([1, 3, 1], [2, 3, 0]);
    ok(s2.equal(m2));
    s3.setElements([1, 1, 1], [1, 3, 1], [3, 2, $C(1, -2)]);
    ok(s3.equal(m3));
  });
  
  test("Sparse: equal", function () {
    var s0 = $S(),
        s1 = $S(1, 1),
        s2 = $S(1, 3),
        s3 = $S(2, 3),
        s4 = $S(2, 3),
        s5 = $S(2, 3),
        s6 = $S(2, 2),
        
        m0 = $M(),
        m1 = $M([
          [0]
        ]),
        m2 = $M([
          [0, $C(1, -1), 0]
        ])
        m3 = $M([
          [1, 0, 0],
          [0, 0, -1]
        ]),
        m4 = $M([
          [0, 1, 0],
          [0, 0, 0],
          [0, 0, 1]
        ]);
        
    // Test set-up
    s2.setElement(1, 2, $C(1, -1));
    s3.setElement(1, 1, 1);
    s3.setElement(2, 3, -1);
    s4.setElement(1, 1, 1);
    s4.setElement(2, 3, -1);
    s5.setElement(1, 1, 1);
    s6.setElement(3, 2, 0);
    
    ok(!s0.equal(m1));
    ok(!s2.equal(m3));
    ok(!s0.equal(s1));
    ok(!s3.equal(s5));
    ok(s0.equal(m0));
    ok(s1.equal(m1));
    ok(s2.equal(m2));
    ok(s3.equal(m3));
    ok(s4.equal(s3));
    ok(s3.equal(s4));
    ok(s3.equal(s3)); // lol
    ok(s6.equal($S(3, 2)));
    s6.setElement(3, 3, 0);
    ok(s6.equal($S(3, 3)));
    s1.setElement(2, 3, -1);
    s1.setElement(1, 1, 1);
    ok(s1.equal(m3));
    
    // In-line instantiation
    ok($S(1, 3, [1, 2, $C(1, -1)]).equal(m2));
    ok($S(2, 1, [1, 2, 1], [3, 3, 1]).equal(m4));
  });
  
  test("Sparse: inspect", function () {
    var s0 = $S(),
        s1 = $S(1, 1),
        s2 = $S(3, 1),
        s3 = $S(3, 2);
    
    equal(s0.inspect(), "0 x 0 all-0 sparse matrix");
    equal(s1.inspect(), "1 x 1 all-0 sparse matrix");
    s1.setElement(1, 1, 1);
    equal(s1.inspect(), "(1,1) = 1");
    s1.setElement(1, 1, 0);
    equal(s1.inspect(), "1 x 1 all-0 sparse matrix");
    equal(s2.inspect(), "3 x 1 all-0 sparse matrix");
    s2.setElement(2, 1, $C(1));
    equal(s2.inspect(), "(2,1) = 1");
    equal(s3.inspect(), "3 x 2 all-0 sparse matrix");
    s3.setElement(1, 2, $C(0, -1));
    s3.setElement(2, 2, $C(2, 2));
    s3.setElement(3, 1, -5);
    equal(s3.inspect(), "(1,2) = -i\n(2,2) = 2+2i\n(3,1) = -5");
  });
  
  test("Sparse: sparse", function () {
    var s1 = $S(1, 1),
        s2 = $S(1, 3),
        s3 = $S(2, 4),
        s4 = $S(3, 3),
        m1 = $M([
          [0]
        ]),
        m2 = $M([
          [0, 0, 0]
        ]),
        m3 = $M([
          [0, 1, 0]
        ]),
        m4 = $M([
          [0, 0, 0, 1],
          [0, 0, $C(1, -2), 0]
        ]),
        m5 = $M([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]);
    
    ok(Sparse.sparse(m1).equal(s1));
    ok(Sparse.sparse(m2).equal(s2));
    s2.setElement(1, 2, 1);
    ok(Sparse.sparse(m3).equal(s2));
    s3.setElement(1, 4, 1);
    s3.setElement(2, 3, $C(1, -2));
    ok(Sparse.sparse(m4).equal(s3));
    ok(Sparse.sparse(m5).equal(s4));
  });
  
  
  /*
   * Tests for the spectral analyzer functions
   */
  module("Spectral Analysis");
  
  test("kSet", function () {
    ok(Matrix.kSet(1, 1).equal($M([1])));
    ok(Matrix.kSet(2, 2).equal($M([[1, 2]])));
    ok(Matrix.kSet(2, 1).equal($M([
      [1],
      [2]
    ])));
    ok(Matrix.kSet(3, 2).equal($M([
      [1, 2],
      [1, 3],
      [2, 3]
    ])));
    ok(Matrix.kSet(5, 3).equal($M([
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 5],
      [1, 3, 4],
      [1, 3, 5],
      [1, 4, 5],
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 5],
      [3, 4, 5]
    ])));
  });
  
  test("tabloids", function () {
    ok(Matrix.tabloids($V([1])).equal($M([1])));
    ok(Matrix.tabloids($V([1, 2])).equal($M([
      [2, 1, 1],
      [1, 2, 1],
      [1, 1, 2]
    ])));
    ok(Matrix.tabloids($V([2, 3])).equal($M([
      [2, 2, 1, 1, 1],
      [2, 1, 2, 1, 1],
      [2, 1, 1, 2, 1],
      [2, 1, 1, 1, 2],
      [1, 2, 2, 1, 1],
      [1, 2, 1, 2, 1],
      [1, 2, 1, 1, 2],
      [1, 1, 2, 2, 1],
      [1, 1, 2, 1, 2],
      [1, 1, 1, 2, 2]
    ])));
  });
  
  test("lanczos", function () {
    var a1 = $M([
          [0.2,  -0.3,  0.1, 0.5, -1.2],
          [-0.3,  0.7,  0,   1.9,  0.6],
          [0.1,   0,   -2,  -1,    2  ],
          [0.5,   1.9, -1,   0.4,  0.5],
          [-1.2,  0.6,  2,   0.5, -0.2]
        ]),
        v1 = $M([1, 2, 3, 4, 5]);
        result1 = Matrix.lanczos(a1, v1);

    // Test the orthogonal matrix result
    ok(result1[0].equal($M([
      [0.1348, -0.4881, -0.3154,  0.4853,  0.6392],
      [0.2697,  0.7945, -0.0792, -0.0348,  0.5371],
      [0.4045, -0.3609,  0.2171, -0.7484,  0.3143],
      [0.5394, -0.0126,  0.7011,  0.4507, -0.1196],
      [0.6742,  0.0065, -0.5963,  0.0054, -0.4356]
    ])));
    
    // Test the sparse matrix result
    ok(result1[1].equal($S(5, 5,
      [1, 1, 1.3855], [1, 2, 1.5154],
      [2, 1, 1.5154], [2, 2, 0.4602], [2, 3, 1.1599],
      [3, 2, 1.1599], [3, 3, -2.0401], [3, 4, 2.0014],
      [4, 3, 2.0014], [4, 4, -0.2401], [4, 5, 1.5633],
      [5, 4, 1.5633], [5, 5, -0.4654]
    )));
    
  });
  
  // [!] Helper function, not in API
  test("factProduct", function () {
    equal(Vector.factProduct($V([1]), 1, $V([1])), 1);
    equal(Vector.factProduct($V([1, 2]), 1, $V([1, 2])), 2);
    equal(Vector.factProduct($V([1, 2, 5, 2, 6]), 4, $V([1, 2, 6, 24, 120])), 2880);
  });
  
  test("setToIndex", function () {
    equal(Vector.setToIndex($V([1, 2, 3])), 6);
    equal(Vector.setToIndex($V([3, 5, 12, 24])), 24);
    equal(Vector.setToIndex($V([1, 23, 45, 711])), 24);
    equal(Vector.setToIndex($V([1, 23, 45, 12])), 20);
    equal(Vector.setToIndex($V([4, 2])), 1);
    equal(Vector.setToIndex($V([2])), 1);
    equal(Vector.setToIndex($V([100, 23, 45, 12, 32, 17, 6, 11])), 5293);
  });
  
  test("indexToSet", function () {
    ok(Vector.indexToSet(1, $V([1])).equal($V([1])));
    ok(Vector.indexToSet(1, $V([1, 2])).equal($V([2, 2, 1])));
    ok(Vector.indexToSet(2, $V([1, 2])).equal($V([2, 1, 2])));
    ok(Vector.indexToSet(1, $V([1, 2, 3])).equal($V([3, 3, 3, 2, 2, 1])));
    ok(Vector.indexToSet(2, $V([1, 2, 3])).equal($V([3, 3, 2, 3, 2, 1])));
    ok(Vector.indexToSet(3, $V([1, 2, 3])).equal($V([3, 3, 2, 2, 3, 1])));
  });
  
  test("radonTransform", function () {
    ok(Matrix.radonTransform($V([2, 1])).equal($M([
      [1, 1, 1]
    ])));
    ok(Matrix.radonTransform($V([2, 2])).equal($S(0, 0, 
      [1, 1, 1], [1, 2, 1], [1, 3, 1],
      [2, 1, 1], [2, 4, 1], [2, 5, 1],
      [3, 2, 1], [3, 4, 1], [3, 6, 1],
      [4, 3, 1], [4, 5, 1], [4, 6, 1]
    )));
    ok(Matrix.radonTransform($V([2, 1, 1])).equal($S(0, 0, 
      [1, 2, 1], [1, 4, 1], [1, 6, 1],
      [2, 1, 1], [2, 8, 1], [2, 10, 1],
      [3, 3, 1], [3, 7, 1], [3, 12, 1],
      [4, 5, 1], [4, 9, 1], [4, 11, 1]
    )));
  });
  
  test("jucysMurphyElement", function () {
    var m1 = Matrix.tabloids($V([2, 1]));
    
    ok(Matrix.jucysMurphyElement($M([
      [1, 2, 3]
    ]), 1).equal(
      $S(1, 1)
    ));
    ok(Matrix.jucysMurphyElement(m1, 1).equal(
      $S(3, 3)));
    ok(Matrix.jucysMurphyElement(m1, 2).equal(
      $S(3, 3, [2, 1, 1], [1, 2, 1], [3, 3, 1]
    )));
    ok(Matrix.jucysMurphyElement(m1, 3).equal(
      $S(3, 3,
        [1, 1, 1], [1, 3, 1],
        [2, 2, 1], [2, 3, 1],
        [3, 1, 1], [3, 2, 1]
    )));
  });
  
  test("jucysMurphyAll", function () {
    var m1 = Matrix.tabloids($V([2, 1]));
    
    ok(Matrix.jucysMurphyAll(m1).equal(
      $S(0, 0,
        [1, 2, 1], [1, 4, 1], [1, 6, 1],
        [2, 1, 1], [2, 5, 1], [2, 6, 1],
        [3, 3, 1], [3, 4, 1], [3, 5, 1]
    )));
    // Could be room for more tests, but manual entry of larger sets
    // would be grueling. Visual inspection of more complex results agree
    // with Matlab's outputs
  });
  

  /***** TESTING SECTION *****/
  // Used for testing functions in progress (if any)
  test("testingSection", function() {
    ok(true);
  });
  
});
