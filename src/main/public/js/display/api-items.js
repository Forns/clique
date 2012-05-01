/**
 * api-items.js
 *
 * Contains the elements for the api listing, with descriptions,
 * examples, and links
 */

var apiItems = {
  // Contains API elements for the complex lib
  "complex": {
    add: {
      title: "Complex.add(a, b) || z.add(b)",
      use: "Adds the two numbers a and b, returning a new Complex if either a or b are Complex.",
      example: ""
    },
    
    angleOf: {
      title: "Complex.angleOf(z) || z.angle()",
      use: "Returns the <strong>principle argument (Arg)</strong> of the given complex number z.",
      example: "var z = $C(1, 1);<br/>Complex.angleOf(z); // (pi / 4) + (pi / 4) * i"
    },
    
    areComplex: {
      title: "Complex.areComplex(nums)",
      use: "Returns a boolean denoting whether all of a given list of / single number(s) " +
        "are complex; a single non-Complex number will return false.",
      example: "Complex.areComplex([$C(1), 2, 3]); // False"
    },
    
    conjugate: {
      title: "conjugate()",
      use: "Returns the complex conjugate of the calling Complex number.",
      example: "$C(1, 1).conjugate(); // Returns $C(1, -1);"
    },
    
    create: {
      title: "Complex.create(real, imaginary) || $C(real, imaginary)",
      use: "Returns a new complex number with real (x) and imaginary (y) components " +
        "of the form x + iy where i is the imaginary unit.",
      example: "var z = Complex.create(1, -1); // z = 1 - i<br/>" +
        "var m = $C(0, 3); // m = 3i"
    },
    
    divide: {
      title: "Complex.divide(a, b)",
      use: "Divides a by b (a / b), returning a new Complex number if either a or b are Complex.",
      example: "// If z = a + b * i and m = c + d * i, then z / m is:</br>" +
        "$C(<br/>" +
        "&nbsp&nbsp(a * c + b * d) / (c * c + d * d),<br/>" +
        "&nbsp&nbsp(b * c - a * d) / (c * c + d * d)<br/>" +
        ");"
    },
    
    equal: {
      title: "Complex.equal(a, b[, strict]) || c.equal(b[, strict])",
      use: "Compares two numbers, a and b, and returns a boolean denoting if they're, surprise, equal.<br/><br/> " +
        "[!] Compares a and b to a level of precision defined by Clique.precision.<br/>" +
        "[!] If strict is a truthy value, then the comparison will require perfect equivalence rather than Clique.precision.<br/>" +
        "[!] Required for comparisons against complex numbers.<br/>",
      example: "Complex.equal(2, $C(2)); // True<br/>" +
        "Complex.equal($C(2, 1), $C(2, 1)); // True<br/>" +
        "Complex.equal($C(5, 1), 5); // False"
    },
    
    exp: {
      title: "Complex.exp(z)",
      use: "Returns e^z",
      example: ""
    },
    
    fromRect: {
      title: "fromRect(a, b)",
      use: "Mutates the given Complex number to have the real component a and imaginary component b.",
      example: "var x = $C(1, 2);<br/>x.fromRect(3, 1); // x is now 3 + i"
    },
    
    fromPolar: {
      title: "fromPolar(r, theta)",
      use: "Mutates the given Complex number to have the real component r * cos(theta) and imaginary " +
        "component r * sin(theta) [theta in radians].",
      example: "var y = $C(0, 0);<br/>y.fromPolar(-1, Math.PI / 2); // x is now -i"
    },
    
    log: {
      title: "Complex.log(n, k) || z.log(k)",
      use: "Returns the log base k of the given number n.<br/>[!] If k unspecified, defaults to base e.",
      example: ""
    },
    
    magnitude: {
      title: "Complex.magnitude(z)",
      use: "Returns the modulus of z, sqrt(x^2 + y^2) in z = x + i * y",
      example: ""
    },
    
    mult: {
      title: "Complex.mult(a, b) || z.mult(b)",
      use: "Multiplies a by b, returning a new Complex if either a or b are Complex.",
      example: "// a x b = $C(aReal * bReal - aIm * bIm, aReal * bIm + bReal * aIm);"
    },
    
    negate: {
      title: "Complex.negate(z) || z.negate()",
      use: "With z = x + i * y, Complex.negate(z) returns a new Complex z = -x - i * y<br/>" +
        "[!] Not a mutator",
      example: ""
    },
    
    pow: {
      title: "Complex.pow(n, k)",
      use: "Returns n^k",
      example: ""
    },
    
    pythag: {
      title: "Complex.pythag(arguments...)",
      use: "Returns the square root of the sum of each argument squared.",
      example: "Complex.pythag(3, 4); // 5"
    },
    
    round: {
      title: "Complex.round(n, k)",
      use: "Returns a new Complex with the real and imaginary components rounded to the nearest integer.",
      example: ""
    },
    
    sub: {
      title: "Complex.sub(a, b) || z.sub(b)",
      use: "Subtracts b from a (a - b), returning a new Complex if either a or b are Complex.",
      example: ""
    },
    
    sqrt: {
      title: "Complex.sqrt(n)",
      use: "Returns the square root of n, the result being Complex if n is a real < 0",
      example: "var x = -1;<br/>Complex.sqrt(x); // Returns $C(0, 1)"
    }
  },
  
  // Contains API elements for the matrix module / Sylvester lib
  "matrix": {
    add: {
      title: "add(matrix)",
      use: "Returns the matrix sum of the receiver and matrix. Thus, A.add(B) is equivalent to " + 
        "A + B. Returns null if the matrices are different sizes.",
      example: ""
    },
    
    append: {
      title: "append(segment)",
      use: "Mutates the calling matrix's elements to append the given matrix segment (can be a matrix " +
        "or vector) after its bottom-most / highest-value row.",
      example: "var m3 = $M([<br/>" +
          "&nbsp&nbsp[1, 2, 3],<br/>" +
          "&nbsp&nbsp[4, 5, 6]<br/>" +
        "]).append($M([<br/>" +
          "&nbsp&nbsp[7, 8, 9],<br/>" +
          "&nbsp&nbsp[0, 0, 0]<br/>" +
        "]));<br/><br/>" +
        "// m3 is now:<br/>" +
        "// [1, 2, 3],<br/>" +
        "// [4, 5, 6],<br/>" +
        "// [7, 8, 9],<br/>" +
        "// [0, 0, 0]"
    },
    
    augment: {
      title: "augment(matrix)",
      use: "Mutates the caller by augmenting it with matrix, that is, appending matrix " + 
        "to the right hand side of the receiver. Both matrices must have the same number of rows for this to work, unless " +
        "one of the two is the empty matrix.",
      example: "var M = $M([<br/>" +
          "&nbsp&nbsp[8,3,0],<br/>" +
          "&nbsp&nbsp[4,4,2],<br/>" +
          "&nbsp&nbsp[9,1,5]<br/>" +
        "]).augment(Matrix.I(3));<br/><br/>" +
        "// M is the matrix<br/>" +
        "// &nbsp&nbsp8 3 0 1 0 0<br/>" +
        "// &nbsp&nbsp4 4 2 0 1 0<br/>" +
        "// &nbsp&nbsp9 1 5 0 0 1"
    },
    
    canMultiplyFromLeft: {
      title: "canMultiplyFromLeft(matrix)",
      use: "A.canMultiplyFromLeft(B) returns true iff AB is a mathematically valid expression. This is the case iff A " + 
        "has the same number of columns as B has rows. matrix can also be a Vector, as long as it has the same number of " +
        "elements as the receiver has rows.",
      example: ""
    },
    
    col: {
      title: "col(j)",
      use: "Returns the j<sup>th</sup> column of the caller as a Vector.",
      example: ""
    },
    
    cols: {
      title: "cols()",
      use: "Returns the number of columns of the caller.",
      example: ""
    },
    
    determinant: {
      title: "determinant()",
      use: "If the caller is square, returns its determinant, otherwise returns null. Note that if the caller is singular, " + 
        "this method will return exactly zero, with no rounding errors.",
      example: ""
    },
    
    det: {
      title: "det()",
      use: "Alias for determinant.",
      example: ""
    },
    
    diagonal1: {
      title: "diagonal()",
      use: "If the caller is square, returns its leading-diagonal elements as a Vector. Otherwise, returns null.",
      example: ""
    },
    
    diagonal2: {
      title: "Matrix.diagonal(n)",
      use: "Returns a square matrix whose leading-diagonal elements are the values " +
        "in the array elements, and whose off-diagonal elements are zero.",
      example: "var d = Matrix.Diagonal([3,7,1]);<br/><br/>// Matrix:<br/>// 3 0 0<br/>// 0 7 0<br/>// 0 0 1"
    },
    
    dimensions: {
      title: "dimensions()",
      use: "Returns an object containing the caller's dimensions.",
      example: "var dims = Matrix.Zero(4, 3).dimensions();<br/>//dims is {rows: 4, cols: 3}"
    },
    
    dup: {
      title: "dup()",
      use: "Returns a copy of the caller.",
      example: ""
    },
    
    e: {
      title: "e(i, j)",
      use: "A.e(i,j) returns the element Aij of matrix A, that is the element in the ith row and jth column. " + 
        "Indexes begin at 1, in agreement with mathematical notation.",
      example: ""
    },
    
    eig: {
      title: "Matrix.eig(tridiagonalMatrix)",
      use: "QL algorithm with implicit shifts to determine the eigenvalues and eigenvectors of a real, " +
        "symmetric, tridiagonal matrix.<br/><br/>" +
        "[!] Returns a 2 element array, [eigenvalues, eigenvectors], the latter of which has columns " +
        "representing the result's eigenvectors.",
      example: "var result = Matrix.eig($M([<br/>" +
          "&nbsp&nbsp[1, 2, 0, 0],<br/>" +
          "&nbsp&nbsp[2, 3, 4, 0],<br/>" +
          "&nbsp&nbsp[0, 4, 5, 7],<br/>" +
          "&nbsp&nbsp[0, 0, 7, 1]<br/>" +
        "]));<br/><br/>" +
        "// Returns the following:<br/>" +
        "// result[0], the eigenvalues rounded to 4 sig-figs:<br/>" +
        "// $V([<br/>" +
          "// &nbsp&nbsp-5.1312,<br/>" +
          "// &nbsp&nbsp-0.1281,<br/>" +
          "// &nbsp&nbsp&nbsp3.6780,<br/>" +
          "// &nbsp&nbsp&nbsp11.5812<br/>" +
        "// ]));<br/><br/>" +
        "// result[1], the eigenvectors rounded to 4 sig-figs: <br/>" +
        "// $M([<br/>" +
          "// &nbsp&nbsp[ 0.1077, -0.8289, -0.5441, &nbsp0.0710],<br/>" +
          "// &nbsp&nbsp[-0.3304, &nbsp0.4675, -0.7286, &nbsp0.3757],<br/>" +
          "// &nbsp&nbsp[ 0.6178, &nbsp0.0488, &nbsp0.1485, &nbsp0.7706],<br/>" +
          "// &nbsp&nbsp[-0.7053, -0.3029, &nbsp0.3883, &nbsp0.5098]<br/>" +
        "// ]));"
    },
    
    equal: {
      title: "equal(matrix)",
      use: "Returns true iff matrix has all its elements equal to those of the receiver.",
      example: ""
    },
    
    firstNonZero: {
      title: "firstNonZero()",
      use: "Returns an array: [i, j, k] denoting the row i, column j, and value k of the first non-zero element " +
        "in the matrix. i, j, k are 0 if the matrix is all-zeros.",
      example: ""
    },
    
    fliplr: {
      title: "Matrix.fliplr(matrix)",
      use: "Returns matrix with columns flipped in the left-right direction, i.e. about a vertical axis.",
      example: "Matrix.fliplr($M([<br/>" +
        "&nbsp&nbsp[0, 1, 2, 3],<br/>" +
        "&nbsp&nbsp[4, 5, 6, 7],<br/>" +
        "&nbsp&nbsp[8, 9, 10, 11]<br/>" +
      "]);<br/><br/>" +
      "// Returns:<br/>" +
      "$M([<br/>" +
        "&nbsp&nbsp[3, 2, 1, 0],<br/>" +
        "&nbsp&nbsp[7, 6, 5, 4],<br/>" +
        "&nbsp&nbsp[11, 10, 9, 8]<br/>" +
      "]);"
    },
    
    full: {
      title: "Matrix.full(sparse)",
      use: "Returns a full matrix representation of the given sparse matrix.",
      example: "var s = $S(2, 2, [1, 1, 1], [2, 2, 2]);<br/><br/>" +
        "Matrix.full(s); // Returns a new Matrix: [[1, 0], [0, 2]]"
    },
    
    identity: {
      title: "Matrix.I(n)",
      use: "Returns the n x n identity matrix.",
      example: ""
    },
    
    indexOf: {
      title: "indexOf(x)",
      use: "Reads the caller’s elements row by row from left to right and returns an object containing the " + 
        "indeces of the first exact match. Returns null if no match is found.",
      example: "var stuff = $M([<br/>" +
        "&nbsp&nbsp[0,9,4],<br/>" +
        "&nbsp&nbsp[9,5,8],<br/>" +
        "&nbsp&nbsp[1,5,3]<br/>" +
      "]).indexOf(9);<br/><br/>" +
      "// stuff is {row: 1, col: 2}"
    },
    
    inspect: {
      title: "inspect()",
      use: "Returns a string representation of the caller.",
      example: "alert(Matrix.I(4).inspect());<br/><br/>" +
        "// alerts:<br/>" +
        "// [1, 0, 0, 0]<br/>" +
        "// [0, 1, 0, 0]<br/>" +
        "// [0, 0, 1, 0]<br/>" +
        "// [0, 0, 0, 1]"
    },
    
    inverse: {
      title: "inverse()",
      use: "Returns the matrix inverse of the receiver, if one exists. If the matrix is singular or not square, " + 
        "then null is returned. The inverse is computed using Gauss-Jordan elimination.",
      example: ""
    },
    
    inv: {
      title: "inv()",
      use: "Alias for inverse.",
      example: ""
    },
    
    isSameSizeAs: {
      title: "isSameSizeAs(matrix)",
      use: "Returns true iff matrix has the same number of rows and columns as the receiver. matrix can also be a " + 
        "Vector, as long as it has the same number of elements as the receiver has rows.",
      example: ""
    },
    
    isSingular: {
      title: "isSingular()",
      use: "Returns true iff the caller is square and has zero determinant.",
      example: ""
    },
    
    isSquare: {
      title: "isSquare()",
      use: "Returns true iff the caller is a square matrix.",
      example: ""
    },
    
    jucysMurphyAll: {
      title: "Matrix.jucysMurphyAll(M)",
      use: "Computes all of the Jucys-Murphy elements for the tabloid space given by M. " +
        "The result is the sparse matrix [R_2, ..., R_n]",
      example: "var M = Matrix.tabloids($V([2, 1]));<br/><br/>" +
        "Matrix.jucysMurphyAll(M);<br/>" +
        "// Returns a sparse equivalent to:<br/>" +
        "// (1,2) = 1<br/>// (1,4) = 1<br/>// (1,6) = 1<br/>// (2,1) = 1<br/>// (2,5) = 1<br/>" +
        "// (2,6) = 1<br/>// (3,3) = 1<br/>// (3,4) = 1<br/>// (3,5) = 1"
    },
    
    jucysMurphyElement: {
      title: "Matrix.jucysMurphyElement(M, i)",
      use: "Returns the Jucys-Murphy element R_i associated with the space of tabloids given " +
        "by the tabloid matrix M",
      example: "var M = Matrix.tabloids($V([2, 1]));<br/><br/>" +
        "Matrix.jucysMurphyElement(M, 3);<br/>" +
        "// Returns a sparse equivalent to:<br/>" +
        "// (1,1) = 1<br/>// (1,3) = 1<br/> // (2,2) = 1<br/>// (2,3) = 1<br/>// (3,1) = 1<br/>// (3,2) = 1"
    },
    
    kSet: {
      title: "Matrix.kSet(n, k)",
      use: "Produces a matrix whose rows are the k-element subsets of an n-element set.",
      example: "Matrix.kSet(3, 2); // Produces:<br/><br/>// 1 2<br/>// 1 3<br/>// 2 3<br/><br/>" +
        "Matrox.kSet(5, 3); // Produces:<br/><br/> // 1 2 3<br/> // 1 2 4<br/> // 1 2 5<br/> // 1 3 4<br/>" +
        "// 1 3 5<br/> // 1 4 5<br/> // 2 3 4<br/> // 2 3 5<br/> // 2 4 5<br/> // 3 4 5"
    },
    
    lanczos: {
      title: "Matrix.lanczos(A, f, epsilon)",
      use: "Uses the \"Lanczos Iteration with re-orthogonalization\" to compute the QR " +
        "factorization of the matrix [f fA fA^2...] where A is a symmetric matrix. Allows " +
        "user to determine how small the residue vectors must be before terminating (DEFAULT epsilon = 10^-8)<br/><br/>" +
        "Returns two Matrices as a 2-element array:<br/>" +
        "[Q, R] = lanczos(A, f, epsilon)<br/><br/>" +
        "Q = orthogonal matrix<br/>R = sparse, tridiagonal matrix",
      example: "var A = <br/>$M([" +
            "&nbsp&nbsp[0.2,  -0.3,  0.1, 0.5, -1.2],<br/>" +
            "&nbsp&nbsp[-0.3,  0.7,  0,   1.9,  0.6],<br/>" +
            "&nbsp&nbsp[0.1,   0,   -2,  -1,    2  ],<br/>" +
            "&nbsp&nbsp[0.5,   1.9, -1,   0.4,  0.5],<br/>" +
            "&nbsp&nbsp[-1.2,  0.6,  2,   0.5, -0.2]<br/>" +
          "]),<br/>" +
          "f = $M([1, 2, 3, 4, 5]),<br/>" +
          "result = Matrix.lanczos(A, f);<br/><br/>" +
          
          "// result[0] = Q =<br/>" +
          "$M([<br/>" +
            "&nbsp&nbsp[0.1348, -0.4881, -0.3154,  0.4853,  0.6392],<br/>" +
            "&nbsp&nbsp[0.2697,  0.7945, -0.0792, -0.0348,  0.5371],<br/>" +
            "&nbsp&nbsp[0.4045, -0.3609,  0.2171, -0.7484,  0.3143],<br/>" +
            "&nbsp&nbsp[0.5394, -0.0126,  0.7011,  0.4507, -0.1196],<br/>" +
            "&nbsp&nbsp[0.6742,  0.0065, -0.5963,  0.0054, -0.4356]<br/>" +
          "]);<br/><br/>"+
          
          "// result[1] = R =<br/>" +
          "$S(5, 5,<br/>" +
            "&nbsp&nbsp[1, 1, 1.3855], [1, 2, 1.5154],<br/>" +
            "&nbsp&nbsp[2, 1, 1.5154], [2, 2, 0.4602], [2, 3, 1.1599],<br/>" +
            "&nbsp&nbsp[3, 2, 1.1599], [3, 3, -2.0401], [3, 4, 2.0014],<br/>" +
            "&nbsp&nbsp[4, 3, 2.0014], [4, 4, -0.2401], [4, 5, 1.5633],<br/>" +
            "&nbsp&nbsp[5, 4, 1.5633], [5, 5, -0.4654]<br/>" +
          ");<br/><br/>" +
          
          "// Sparse representation of result[1] = R =<br/>" +
          "// (1,1) =      1.3855<br/>" +
          "// (2,1) =      1.5154<br/>" +
          "// (1,2) =      1.5154<br/>" +
          "// (2,2) =      0.4602<br/>" +
          "// (3,2) =      1.1599<br/>" +
          "// (2,3) =      1.1599<br/>" +
          "// (3,3) =     -2.0401<br/>" +
          "// (4,3) =      2.0014<br/>" +
          "// (3,4) =      2.0014<br/>" +
          "// (4,4) =     -0.2401<br/>" +
          "// (5,4) =      1.5633<br/>" +
          "// (4,5) =      1.5633<br/>" +
          "// (5,5) =     -0.4654"
    },
    
    map: {
      title: "map(iterator)",
      use: "Maps the caller to another matrix by calling iterator on each element of the caller in turn. iterator " +
        "receives the row and column index of each element as second and third arguments. Some examples:",
      example: "// Square all the elements of a matrix:<br/>" +
        "var A_sq = A.map(function(x) { return x * x; });<br/><br/>" +
        "// Determine whether a matrix is symmetric:<br/>" +
        "var is_sym = (A.map(<br/>" +
          "&nbsp&nbspfunction(x, i, j) { return (A.e(i,j) == A.e(j,i)) ? 1 : 0; }<br/>" +
        ").indexOf(0) === null);"
    },
    
    max: {
      title: "max()",
      use: "Returns the max value of the elemnt of the caller with the largest absolute value.",
      example: ""
    },
    
    minor: {
      title: "minor(i, j, m, n)",
      use: "This method returns a matrix formed from a subset of the receiver’s elements. It selects elements beginning " + 
        "at row i and column j of the receiver, and returns a matrix with n rows and m columns. The selection wraps to the " + 
        "other side of the receiver if n or m is large enough. This is best illustrated by example:",
      example: "var M = $M([<br/>" +
      "&nbsp&nbsp[9,2,6,5],<br/>" +
      "&nbsp&nbsp[0,1,7,4],<br/>" +
      "&nbsp&nbsp[4,2,6,7],<br/>" +
      "&nbsp&nbsp[1,8,5,3]<br/>" +
      "]);<br/><br/>" +
      "var A = M.minor(2,1,2,3);<br/>" +
      "// 0 1 7<br/>" +
      "// 4 2 6<br/><br/>" +
      "var B = M.minor(1,4,3,3);<br/>" +
      "// 5 9 2<br/>" +
      "// 4 0 1<br/>" +
      "// 7 4 2<br/><br/>" +
      "// Augment M with itself<br/>" +
      "var C = M.minor(1,1,4,8);<br/>" +
      "// 9 2 6 5 9 2 6 5<br/>" +
      "// 0 1 7 4 0 1 7 4<br/>" +
      "// 4 2 6 7 4 2 6 7<br/>" +
      "// 1 8 5 3 1 8 5 3"
    },
    
    multiply: {
      title: "multiply(object)",
      use: "If object is a matrix, then this method returns the result of multiplying the receiver by object in that order: " + 
        "A.multiply(B) means AB. If object is a Vector, then it is converted to a column matrix, multiplied by the receiver, " + 
        "and the result is returned as a Vector (this saves you having to call col(1) on the result). If object is a scalar, then " + 
        "the method returns a copy of the receiver with all its elements multiplied by object.<br/><br/> "+ 
        "[!]This method is aliased as x.",
      example: ""
    },
    
    norm: {
      title: "norm",
      use: "Returns the sqrt of the sum of all matrix elements squared.",
      example: ""
    },
    
    ones: {
      title: "Matrix.ones(i, j)",
      use: "Returns a new matrix consisting exclusively of 1's with i rows and j columns.",
      example: ""
    },
    
    random: {
      title: "Matrix.random(n, m)",
      use: "Returns a matrix with n rows and m columns, all the elements of which are random numbers between 0 and 1.",
      example: ""
    },
    
    rank: {
      title: "rank()",
      use: "Returns the caller's rank, which is the number of linearly independent rows/columns it contains.",
      example: ""
    },
    
    removeRow: {
      title: "removeRow(row)",
      use: "Mutates the caller's elements to remove the given row.",
      example: ""
    },
    
    removeCol: {
      title: "removeCol(col)",
      use: "Mutates the caller's elements to remove the given column.",
      example: ""
    },
    
    rk: {
      title: "rk()",
      use: "Alias for rank.",
      example: ""
    },
    
    round: {
      title: "round()",
      use: "Returns a copy of the caller with all of its elements rounded to the nearest integer.",
      example: ""
    },
    
    rotation: {
      title: "Matrix.Rotation(angle [, axis])",
      use: "If called with only one argument, returns the 2 x 2 matrix for an anticlockwise rotation " +
      "of angle radians about the origin. That is, vectors are rotated anticlockwise with respect to " +
      "the coordinate system, not the other way round." +
      "If called with two arguments, returns the 3 x 3 matrix for a right-handed rotation of angle " + 
      "radians about the axis given by the 3-vector axis, keeping the origin fixed.",
      example: ""
    },
    
    rotationAxis: {
      title: "Matrix.RotationX(angle), Matrix.RotationY(angle), Matrix.RotationZ(angle)",
      use: "Each of these return the 3 x 3 matrix representing a right-handed rotation of points in " +
      "3-dimensional space relative to the coordinate system through an angle of angle radians about the " +
      "x, y and z axes respectively. They are used as a foundation for the more general Matrix.Rotation.",
      example: ""
    },
    
    row: {
      title: "row(i)",
      use: "Returns the i<sup>th</sup> row of the caller as a Vector.",
      example: ""
    },
    
    rows: {
      title: "rows()",
      use: "Returns the number of rows the caller has.",
      example: ""
    },
    
    setElements: {
      title: "setElements(elements)",
      use: "Sets the receiver’s elements from the array elements. The element array’ top-level " + 
        "elements should be the rows, and each row is an array of values reading from left to right " + 
        "across the columns. See Matrix.create.",
      example: ""
    },
    
    setElement: {
      title: "setElement(i, j, k)",
      use: "Sets the matrix element at row i, column j to the value k.",
      example: ""
    },
    
    setRange: {
      title: "setRange(startRow1, startColumn1, endRow1, endColumn1, otherMatrix[, startRow2, startColumn2, endRow2, endColumn2])",
      use: "Sets elements in the calling sparse or matrix to those from otherMatrix (can be sparse) within the given bounds of each.<br/><br/>" +
        "[!] If the dimensions of the ranges differ, the smaller of the two will be used with element changes trimmed from the right / bottom.<br/>" +
        "[!] If the otherMatrix's bounds are not defined in the call, they will default to otherMatrix's size",
      example: "var m1 = $M([<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 0, 0],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 1, 1],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 1, 2]<br/>" +
        "&nbsp&nbsp&nbsp&nbsp]),<br/>" +
        "&nbsp&nbsp&nbsp&nbsps1 = $S(3, 3, [2, 2, 2], [3, 2, 3]);<br/><br/>" +
        "m1.setRange(2, 1, 3, 1, s1, 2, 2, 3, 2);<br/>" +
        "// m1 is now the matrix:<br/>[0, 0, 0]<br/>[2, 1, 1]<br/>[3, 1, 2]"
    },
    
    setRow: {
      title: "setRow(row, vector)",
      use: "Sets the given row of the calling matrix to the provided vector.",
      example: ""
    },
    
    setCol: {
      title: "setCol(col, vector)",
      use: "Sets the given column of the calling matrix to the provided vector.",
      example: ""
    },
    
    snapTo: {
      title: "snapTo(x)",
      use: "Returns a copy of the receiver in which any elements that differ from x by less than the value " + 
        "of Sylvester.precision are set exactly equal to x.",
      example: ""
    },
    
    sort: {
      title: "sort()",
      use: "Returns a copy of the caller with the numbers in its columns sorted in ascending order.<br/><br/>" +
        "[!] Cannot sort Complex entities due to their incomparable quality.",
      example: ""
    },
    
    subDiagonal: {
      title: "subDiagonal()",
      use: "Returns the sub-diagonal elements of the calling <strong>square</strong> matrix--null, otherwise.",
      example: "var m1 = $M([<br/>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[1, 2, 3],<br/>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[4, 5, 6]<br/>" +
      "&nbsp&nbsp&nbsp&nbsp]),<br/>" +
      "&nbsp&nbsp&nbsp&nbspm2 = $M([<br/>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[1, 2, 0],<br/>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[2, 1, 4],<br/>" +
        "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 4, 1]<br/>" +
      "&nbsp&nbsp&nbsp&nbsp]);<br/><br/>" +
      "m1.subDiagonal(); // null<br/>" +
      "m2.subDiagonal(); // Returns $V([2, 4]);"
    },
    
    subtract: {
      title: "subtract(matrix)",
      use: "Returns the result of subtracting matrix from the receiver. Thus, A.subtract(B) is equivalent to " + 
        "A − B. Returns null if the matrices are different sizes.",
      example: ""
    },
    
    sort: {
      title: "sort()",
      use: "Sorts the numbers in a matrix's columns in ascending order.<br/>[!] Cannot sort Complex entities.",
      example: ""
    },
    
    swapRows: {
      title: "swapRows(m, n)",
      use: "Swaps the positions of matrix rows m and n.",
      example: ""
    },
    
    tabloids: {
      title: "Matrix.tabloids(v)",
      use: "Takes a Vector v of positive integers and returns a Matrix whose rows correspond to the tabloids of shape v.",
      example: "Matrix.tabloids($V([1, 2])); // Produces:<br/> // 2 1 1<br/> // 1 2 1<br/> // 1 1 2<br/><br/>" +
        "Matrix.tabloids($V([2, 3])); // Produces:<br/>" +
        "<br/>// 2 2 1 1 1" +
        "<br/>// 2 1 2 1 1" +
        "<br/>// 2 1 1 2 1" +
        "<br/>// 2 1 1 1 2" +
        "<br/>// 1 2 2 1 1" +
        "<br/>// 1 2 1 2 1" +
        "<br/>// 1 2 1 1 2" +
        "<br/>// 1 1 2 2 1" +
        "<br/>// 1 1 2 1 2" +
        "<br/>// 1 1 1 2 2"

    },
    
    toRightTriangular: {
      title: "toRightTriangular()",
      use: "Returns a copy of the receiver converted to right triangular form. The conversion is done only by " + 
        "adding multiples of rows to other rows, so the determinant (if the matrix is square) is unchanged. This " + 
        "method can be used on non-square matrices, which lets you use it to solve sets of simultaneous equations. " + 
        "For example: solving the system of linear equations<br/>" + 
        "<ul><li>3x + 2y - z = 1</li><li>2x - 2y + 4z = -2</li><li>-x + (1/2)y - z = 0</li></ul><br/><br/>would be written as:",
      example: "var equations = $M([<br/>" +
        "&nbsp&nbsp[ 3,   2, -1,  1],<br/>" +
        "&nbsp&nbsp[ 2,  -2,  4, -2],<br/>" +
        "&nbsp&nbsp[-1, 0.5, -1,  0]<br/>" +
      "]);<br/><br/>" +
      "var eqns = equations.toRightTriangular();<br/>" +
      "var sol_z = eqns.e(3,4) / eqns.e(3,3);<br/>" +
      "var sol_y = (eqns.e(2,4) - eqns.e(2,3)*sol_z) / eqns.e(2,2);<br/>" +
      "var sol_x = (eqns.e(1,4) - eqns.e(1,3)*sol_z - eqns.e(1,2)*sol_y) / eqns.e(1,1);<br/>"
    },
    
    toUpperTriangular: {
      title: "toUpperTriangular()",
      use: "Alias for toRightTriangular.",
      example: ""
    },
    
    trace: {
      title: "trace()",
      use: "Returns the trace for square matrices, which is the sum of their leading-diagonal elements.",
      example: ""
    },
    
    tr: {
      title: "tr()",
      use: "Alias for trace.",
      example: ""
    },
    
    transpose: {
      title: "transpose()",
      use: "Returns the matrix transpose of the caller.",
      example: ""
    },
    
    x: {
      title: "x(k)",
      use: "Alias for multiply(k).",
      example: ""
    },
    
    zero: {
      title: "Matrix.zero(n, m)",
      use: "Returns a matrix with n rows and m columns, all the elements of which are zero.",
      example: ""
    }
  },
  
  // Contains API elements for the vector module / Sylvester lib
  "vector": {
    add: {
      title: "add(v)",
      use: "Returns a copy of the elements of v added to the caller's elements in sequence." +
        "<br/><br/>[!] Caller and argument must have same dimensions.",
      example: ""
    },
    
    append: {
      title: "append(n)",
      use: "If n is a vector, concatonates n to the end of the caller. Otherwise, adds the single " +
        "value n to the end of the caller.",
      example: ""
    },
    
    create: {
      title: "Vector.create(elements) || $V(elements)",
      use: "Creates and returns new Vector instance from the array elements.",
      example: "var v = Vector.create([6,2,9]);"
    },
    
    dimensions: {
      title: "dimensions()",
      use: "Returns the number of elements in the given Vector.",
      example: ""
    },
    
    distanceFrom: {
      title: "distanceFrom(v)",
      use: "Returns the (always positive) distance of the caller from v.",
      example: "a.distanceFrom(b) // Equivalent to |a - b|"
    },
    
    dot: {
      title: "dot(v)",
      use: "Returns the value of the dot product (aka the scalar product) of the caller with v. " + 
        "[!] Returns null if the vectors have unequal dimensions.",
      example: ""
    },
    
    dup: {
      title: "dup()",
      use: "Returns a duplicate vector of the calling instance.",
      example: ""
    },
    
    e: {
      title: "e(n)",
      use: "Returns the n<sup>th</sup> element with 1 as the first index",
      example: "var v = $V(0, 1, 2, 3);<br/>v.e(2); // 1"
    },
    
    each: {
      title: "each(iterator)",
      use: "Calls iterator for each element of the receiver. iterator is passed the index (numbered from 1) " + 
        "of each element as the second argument. For example, the following alerts the index and value of " + 
        "each of the vector's elements:",
      example: "$V([4,9,3,6]).each(function(x, i) {<br/>" +
        "&nbsp&nbspalert(i + ': ' + x);<br/>" +
        "});<br/>" +
        "// Alerts: '1: 4', '2: 9', '3: 3', '4: 6'"
    },
    
    equal: {
      title: "equal(v)",
      use: "Returns a boolean denoting the equality of the calling vector with v to a defined precision.",
      example: ""
    },
    
    histoCount: {
      title: "Vector.histoCount(v, i)",
      use: "Returns the number of instances of i in v."
    },
    
    indexOf: {
      title: "indexOf(x)",
      use: "Returns the index position (numbered from 1, just as for e()) of the first element exactly equal to x. If no match is found, returns null.",
      example: ""
    },
    
    indexToSet: {
      title: "Vector.indexToSet(index, shapeVector)",
      use: "Maps to tabloid given integer index and a vector containing the shape of " +
        "the tabloid. This vector is defined in accordance with the following: " +
        "1 chosen from 4 chosen from 5 chosen from 9 yields rows of width: " +
        "9-5, 5-4, 4-1, 1 respectively. So the vector would be passed as [4, 1, 3, 1]",
        example: "Vector.indexToSet(1, $V([1, 2])); // Returns $V([2, 2, 1])<br/>" +
          "Vector.indexToSet(2, $V([1, 2])); // Returns $V([2, 1, 2])<br/>" +
          "Vector.indexToSet(3, $V([1, 2, 3])); // Returns $V([3, 3, 2, 2, 3, 1])<br/>"
    },
    
    insert: {
      title: "Vector.insert(v, i, e)",
      use: "Returns a new vector representing element e added to v at index i.",
      example: "Vector.insert($V([1, 2, 3]), 1, 0); // Returns $V([0, 1, 2, 3]);<br/>" +
        "Vector.insert($V([1, 2, 3]), 4, 0); // Returns $V([1, 2, 3, 0]);"
    },
    
    inspect: {
      title: "inspect()",
      use: "Returns a string representation of the calling vector.",
      example: "alert($V([7,-2,5]).inspect());<br/>" +
        "// alerts '[7, -2, 5]'"
    },
    
    isAntiparallelTo: {
      title: "isAntiparallelTo(v)",
      use: "Returns true iff the caller's direction is exactly opposed to that of v, that is, if the angle between them is pi.",
      example: ""
    },
    
    isParallelTo: {
      title: "isParallelTo(v)",
      use: "Returns true iff caller's direction is perpendicular to that of v, that is, if the angle between them is pi/2.",
      example: ""
    },
    
    map: {
      title: "map(iterator)",
      use: "Maps the receiver to another vector by calling iterator with each element in turn. iterator is also passed the " +
        "index (numbered from 1) of each element as the second argument.",
      example: "var a = $V([3,4,5]);<br/><br/>" +
        "// To square the elements of a<br/>" +
        "var b = a.map(function(x) { return x * x; });<br/><br/>" +
        "// To add each element's index to its value<br/>" +
        "var c = a.map(function(x, i) { return x + i; });"
    },
    
    max: {
      title: "max()",
      use: "Returns the element of the receiver with the largest absolute value.",
      example: "$V([0,-6,5]).max(); // returns -6."
    },
    
    modulus: {
      title: "modulus() || norm()",
      use: "Returns the modulus of the caller, |v| = sqrt(sum(v<sub>i</sub>)<sup>2</sup>)",
      example: ""
    },
    
    multiply: {
      title: "multiply(k)",
      use: "Returns the vector obtained by multiplying all the elements of the caller by the scalar quantity k. Aliased as x(k).",
      example: ""
    },
    
    ones: {
      title: "Vector.ones(n)",
      use: "Returns a new vector with n elements that are all ones."
    },
    
    predefined: {
      title: "Vector.i, Vector.j, Vector.k",
      use: "Predefined Vector instances representing the 3-dimensional i, j and k vectors respectively.",
      example: ""
    },
    
    random: {
      title: "Vector.random(n)",
      use: "Returns a vector with n elements, each of which is a random number between 0 and 1.",
      example: ""
    },
    
    remove: {
      title: "remove(i, x)",
      use: "Mutates the calling vector to remove x items from index i.",
      example: "$V([1, 2, 3, 4]).remove(2, 2); // Returns the vector, now representing [1, 4]"
    },
    
    round: {
      title: "round()",
      use: "Returns a copy of the receiver with all its elements rounded to the nearest integer.",
      example: ""
    },
    
    setElement: {
      title: "setElement(i, x)",
      use: "Sets the caller's i<sup>th</sup> element to x.",
      example: "var v = $V([1, 2, 3]);<br/>v.setElement(2, 0); // v = [1, 0, 3]"
    },
    
    setElements: {
      title: "setElements(e)",
      use: "Sets the caller's elements property equal to the array e. Since version 0.1.1, the " + 
        "numericality of e's elements is not checked for performance reasons. It is assumed you'll " + 
        "be using this with numbers, and if you throw anything else in then most method calls won't work.",
      example: ""
    },
    
    setToIndex: {
      title: "Vector.setToIndex(v)",
      use: "Maps from vector set to an integer index of possible sets of that shape.",
      example: "Vector.setToIndex($V([1, 2, 3])); // Returns 6<br/><br/>" +
        "Vector.setToIndex($V([100, 23, 45, 12, 32, 17, 6, 11])); // Returns 5293"
    },
    
    snapTo: {
      title: "snapTo(x)",
      use: "Returns a copy of the receiver with any elements that differ from x by less than the value of " + 
        "Sylvester.precision set exactly equal to x. This can be useful for working around rounding errors.",
      example: ""
    },
    
    sort: {
      title: "Vector.sort(v[, f])",
      use: "Returns a new Vector representing the sorted items of Vector v using the sorting function f, or " +
        "ascending numerical sort by default.",
      example: ""
    },
    
    subtract: {
      title: "subtract(v)",
      use: "If the caller and v have the same number of elements, returns a Vector formed by subtracting " + 
        "the latter from the former. Otherwise, returns null.",
      example: ""
    },
    
    sum: {
      title: "Vector.sum(v)",
      use: "Returns the sum of all of v's elements.",
      example: "Vector.sum($V([1, 0, -1, 2])); // Returns 2"
    },
    
    to3D: {
      title: "to3D()",
      use: "If the receiver is 3-dimensional, it returns a copy of the receiver. If it is 2-dimensional, " + 
        "it returns a copy of the receiver with an additional third element, which is set to zero. For " + 
        "all other sizes, it returns null. Something is similar is done in many of the methods of the " + 
        "Line and Plane classes, although for performance reasons they don�t use this method.",
      example: ""
    },
    
    toDiagonalMatrix: {
      title: "toDiagonalMatrix()",
      use: "Returns an nxn square Matrix, where n is the number of elements in the caller, whose " + 
        "leading-diagonal elements are the elements of the caller. All the off-diagonal elements are zero.",
      example: ""
    },
    
    toUnitVector: {
      title: "toUnitVector()",
      use: "Returns a copy of the receiver, whose elements have been scaled such that the modulus of the new " + 
        "vector is equal to 1. If the receiver has zero modulus then a copy of it is returned unchanged.",
      example: ""
    },
    
    x: {
      title: "x(k)",
      use: "Alias for multiply(k).",
      example: ""
    },
    
    zero: {
      title: "Vector.zero(n)",
      use: "Returns a vector with n elements, all of which are zero.",
      example: ""
    }
  },
  
  "sparse": {
    create: {
      title: "Sparse.create([x, y[, elements...]]) || $S([x, y[, elements...]])",
      use: "Creates a new sparse matrix, optionally with the given dimensions and set elements. " +
        "If elements are not specified, the sparse is assumed to be an x by y all-0 sparse matrix.<br/></br>" +
        "[!] Elements are defined by js arrays [x, y, e] where x is the row, y the column, and e the data element.",
      example: "var s1 = Sparse.create(), // Blank sparse<br/>" +
        "&nbsp&nbsp&nbsp&nbsps2 = $S(), // Blank sparse<br/>" +
        "&nbsp&nbsp&nbsp&nbsps3 = $S(1, 1), // A 1 x 1 all-0 sparse<br/>" +
        "&nbsp&nbsp&nbsp&nbsps4 = $S(0, 0, [1, 2, 1]); // A 1x2 sparse (dynamically expanded) with (1,2) = 1<br/>" +
        "&nbsp&nbsp&nbsp&nbsps5 = $S(3, 2, [1, 1, $C(1, -1)], [3, 2, -1]); // A 3x2 sparse with (1,1) = 1-i, (3,2) = -1"
    },
    
    cols: {
      title: "cols()",
      use: "Returns the number of designated columns in the sparse.<br/><br/>" +
        "[!] Dynamically updated if a setElement or setElements command expands the sparse's dimensions.",
      example: ""
    },
    
    col: {
      title: "col(index)",
      use: "Returns the designated column as a Vector, or null if out of bounds.",
      example: ""
    },
    
    e: {
      title: "e(i, j)",
      use: "Returns the element located in the sparse at row i, column j.<br/><br/>" +
        "[!] If (i, j) is outside of the sparse's bounds, e(i, j) will return null.<br/>" +
        "[!] If (i, j) is within the bounds of the sparse, but not mapped, e(i, j) will return 0.",
      example: "var s1 = $S(),<br/>&nbsp&nbsp&nbsp&nbsps2 = $S(2, 3, [2, 1, 5]);<br/><br/>s1.e(1, 1); // Returns null<br/>" +
        "s2.e(1, 1); // Returns 0<br/>s2.e(2, 1); // Returns 5"
    },
    
    equal: {
      title: "equal(matrix)",
      use: "Compares the calling sparse's elements to the given matrix, which can be of type Matrix OR Sparse.<br/><br/>" +
        "[!] Comparisons are made using Complex.equal(...) on an element by element basis, differences tolerated to Clique.precision",
      example: "var s = $S(3, 3, [1, 2, 1], [3, 3, 1]),<br/>" +
        "&nbsp&nbsp&nbsp&nbspm = $M([<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 1, 0],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 0, 0],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 0, 1]<br/>" +
        "&nbsp&nbsp&nbsp&nbsp]);<br/><br/>" +
        "s.equal(m); // Returns true"
    },
    
    inspect: {
      title: "inspect()",
      use: "Returns a string representation of the calling sparse's key-value pairs.",
      example: "var s1 = $S(3, 2),<br/>" +
        "&nbsp&nbsp&nbsp&nbsps2 = $S(2, 2, [1, 1, 1], [2, 1, 3]);<br/><br/>" +
        "s1.inspect();<br/>// Returns:<br/>3 x 2 all-0 sparse matrix<br/><br/>" +
        "s2.inspect();<br/>// Returns:<br/>(1,1) = 1<br/>(2,1) = 3"
    },
    
    rows: {
      title: "rows()",
      use: "Returns the number of designated rows in the sparse.<br/><br/>" +
        "[!] Dynamically updated if a setElement or setElements command expands the sparse's dimensions.",
      example: ""
    },
    
    row: {
      title: "row(index)",
      use: "Returns the designated row as a Vector, or null if out of bounds.",
      example: ""
    },
    
    setElement: {
      title: "setElement(i, j, x)",
      use: "Sets element (i, j) = x in the calling sparse.<br/><br/>" +
        "[!] Dynamically expands the bounds of the sparse if either i or j are outside of its dimensions.",
      example: "var s1 = $S(1, 2);<br/>s.setElement(1, 2, 1); // (1,2) = 1 now<br/><br/>" +
        "var s2 = $S(1, 2);<br/>s.setElement(3, 3, $C(1, -1)); // (3,3) = 1-i now, and s2 is a 3x3 sparse"
    },
    
    setElements: {
      title: "setElements(arguments[, moreArguments])",
      use: "Iteratively sets elements of the calling sparse to arguments of the form [i, j, x], where " +
        "i is the row to set, j the column to set, and x the data element to input.",
      example: "var s = $S(1, 1);<br/><br/>s.setElements([1, 1, 1], [2, 3, $C(1, 1)]); // s is now a 2x3 sparse with " +
        "(1,1) = 1 and (2,3) = 1+i"
    },
    
    setRange: {
      title: "setRange(startRow1, startColumn1, endRow1, endColumn1, otherMatrix[, startRow2, startColumn2, endRow2, endColumn2])",
      use: "Sets elements in the calling sparse or matrix to those from otherMatrix (can be sparse) within the given bounds of each.<br/><br/>" +
        "[!] If the dimensions of the ranges differ, the smaller of the two will be used with element changes trimmed from the right / bottom.<br/>" +
        "[!] If the otherMatrix's bounds are not defined in the call, they will default to otherMatrix's size",
      example: "var m1 = $M([<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 0, 0],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 1, 1],<br/>" +
          "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[0, 1, 2]<br/>" +
        "&nbsp&nbsp&nbsp&nbsp]),<br/>" +
        "&nbsp&nbsp&nbsp&nbsps1 = $S(3, 3, [2, 2, 2], [3, 2, 3]);<br/><br/>" +
        "m1.setRange(2, 1, 3, 1, s1, 2, 2, 3, 2);<br/>" +
        "// m1 is now the matrix:<br/>[0, 0, 0]<br/>[2, 1, 1]<br/>[3, 1, 2]"
    },
    
    sparse: {
      title: "Sparse.sparse(matrix)",
      use: "Converts the given matrix (of type Matrix, derp) into a sparse matrix. Useful for compressing large matrices " +
        "with many zero-elements.",
      example: "var m = $M([<br/>" +
        "&nbsp&nbsp[0, 0, 0]<br/>" +
        "&nbsp&nbsp[0, 1, 0]<br/>" +
        "&nbsp&nbsp[0, 0, 0]<br/>" +
      "]);<br/><br/>" +
      "m = Sparse.sparse(m); // m is now a 3x3 sparse with (2,2) = 1"
    }
  },
  
  
  // Contains general API elements regarding usages and properties of the objects
  "general" : {
    precision: {
      title: "Clique.precision",
      use: "Determines the tolerance of error between two numbers being compared by Clique's various " +
        "equivalence tests.<br/><br/>" +
        "[!] Default: 1e-4",
      example: ""
    }
  }
};
