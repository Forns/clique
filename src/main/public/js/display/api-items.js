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
      title: "Complex.add(a, b)",
      use: "Adds the two numbers a and b, returning a new Complex if either a or b are Complex.",
      example: ""
    },
    
    angleOf: {
      title: "Complex.angleOf(z)",
      use: "Returns the <strong>principle argument (Arg)</strong> of the given complex number z.",
      example: "var z = $C(1, 1);<br/>Complex.angleOf(z); // (pi / 4) + (pi / 4) * i"
    },
    
    areComplex: {
      title: "Complex.areComplex(nums)",
      use: "Returns a boolean denoting whether all of a given list of / single number(s) " +
        "are complex; a single non-Complex number will return false.",
      example: "Complex.areComplex([$C(1), 2, 3]); // False"
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
      title: "Complex.equal(a, b)",
      use: "Compares two numbers, a and b, and returns a boolean denoting if they're, surprise, equal.<br/> " +
        "[!] Required for comparisons against complex numbers.",
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
      title: "Complex.log(n, k)",
      use: "Returns the log base k of the given number n.<br/>[!] If k unspecified, defaults to base e.",
      example: ""
    },
    
    magnitude: {
      title: "Complex.magnitude(z)",
      use: "Returns the modulus of z, sqrt(x^2 + y^2) in z = x + i * y",
      example: ""
    },
    
    mult: {
      title: "Complex.mult(a, b)",
      use: "Multiplies a by b, returning a new Complex if either a or b are Complex.",
      example: "// a x b = $C(aReal * bReal - aIm * bIm, aReal * bIm + bReal * aIm);"
    },
    
    negate: {
      title: "Complex.negate(z)",
      use: "With z = x + i * y, Complex.negate(z) returns a new Complex z = -x - i * y<br/>" +
        "[!] Not a mutator",
      example: ""
    },
    
    pow: {
      title: "Complex.pow(n, k)",
      use: "Returns n^k",
      example: ""
    },
    
    round: {
      title: "Complex.round(n, k)",
      use: "Returns a new Complex with the real and imaginary components rounded to the nearest integer.",
      example: ""
    },
    
    sub: {
      title: "Complex.sub(a, b)",
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
    create: {
      title: "Matrix.create(elements) || $M(elements)",
      use: "Creates and returns a new Matrix instance from the array elements." +
      "elements should be a nested array: the top level array is the rows, and " +
      "each row is an array of elements. This means you write out a matrix in " + 
      "code in the same orientation you would on paper.<br>" +
      "[!] Every row must have the same number of elements, otherwise the method will return null.",
      example: "var m = $M([<br/>&nbsp&nbsp[8,3,9],<br/>&nbsp&nbsp[2,0,7],<br/>&nbsp&nbsp[1,9,3]<br/>]);"
    },
    
    diagonal: {
      title: "Matrix.diagonal(n)",
      use: "Returns a square matrix whose leading-diagonal elements are the values " +
        "in the array elements, and whose off-diagonal elements are zero.",
      example: "var d = Matrix.Diagonal([3,7,1]);<br/><br/>// Matrix:<br/>// 3 0 0<br/>// 0 7 0<br/>// 0 0 1"
    },
    
    identity: {
      title: "Matrix.I(n)",
      use: "Returns the n x n identity matrix.",
      example: ""
    },
    
    random: {
      title: "Matrix.random(n, m)",
      use: "Returns a matrix with n rows and m columns, all the elements of which are random numbers between 0 and 1.",
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
    
    zero: {
      title: "Matrix.zero(n, m)",
      use: "Returns a matrix with n rows and m columns, all the elements of which are zero.",
      example: ""
    },
    
    add: {
      title: "add(matrix)",
      use: "Returns the matrix sum of the receiver and matrix. Thus, A.add(B) is equivalent to " + 
        "A + B. Returns null if the matrices are different sizes.",
      example: ""
    },
    
    augment: {
      title: "augment(matrix)",
      use: "Returns the result of augmenting the receiver with matrix, that is, appending matrix " + 
        "to the right hand side of the receiver. Both matrices must have the same number of rows for this to work.",
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
    
    diagonal: {
      title: "diagonal()",
      use: "If the caller is square, returns its leading-diagonal elements as a Vector. Otherwise, returns null.",
      example: ""
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
    
    eql: {
      title: "eql(matrix)",
      use: "Returns true iff matrix has all its elements equal to those of the receiver.",
      example: ""
    },
    
    firstNonZero: {
      title: "firstNonZero()",
      use: "Returns an array: [i, j, k] denoting the row i, column j, and value k of the first non-zero element " +
        "in the matrix. i, j, k are 0 if the matrix is all-zeros.",
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
    
    map: {
      title: "map(iterator)",
      use: "Maps the caller to another matrix by calling iterator on each element of the caller in turn. iterator " +
        "receives the row and column index of each element as second and third arguments. Some examples:",
      example: "// Square all the elements of a matrix:<br/>" +
        "var A_sq = A.map(function(x) { return x * x; });<br/><br/>" +
        "// Determine whether a matrix is symmetric:<br/>" +
        "var is_sym = (A.map(<br/>" +
          "function(x, i, j) { return (A.e(i,j) == A.e(j,i)) ? 1 : 0; }<br/>" +
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
    
    rank: {
      title: "rank()",
      use: "Returns the caller's rank, which is the number of linearly independent rows/columns it contains.",
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
      use: "Sorts the numbers in a matrix's columns in ascending order.<br/>[!] Cannot sort Complex entities.",
      example: ""
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
    }
  },
  
  // Contains API elements for the vector module / Sylvester lib
  "vector": {
    create: {
      title: "Vector.create(elements) || $V(elements)",
      use: "Creates and returns new Vector instance from the array elements.",
      example: "var v = Vector.create([6,2,9]);"
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
    
    zero: {
      title: "Vector.zero(n)",
      use: "Returns a vector with n elements, all of which are zero.",
      example: ""
    },
    
    append: {
      title: "append(n)",
      use: "Appends a single value, n, to the end of the Vector.",
      example: ""
    },
    
    e: {
      title: "e(n)",
      use: "Returns the n<sup>th</sup> element with 1 as the first index",
      example: "var v = $V(0, 1, 2, 3);<br/>v.e(2); // 1"
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
    
    each: {
      title: "each(iterator)",
      use: "Calls iterator for each element of the receiver. iterator is passed the index (numbered from 1) " + 
        "of each element as the second argument. For example, the following alerts the index and value of " + 
        "each of the vector�s elements:",
      example: "$V([4,9,3,6]).each(function(x, i) {<br/>" +
        "&nbsp&nbspalert(i + ': ' + x);<br/>" +
        "});<br/>" +
        "// Alerts: '1: 4', '2: 9', '3: 3', '4: 6'"
    },
    
    eql: {
      title: "eql(v)",
      use: "Returns a boolean denoting the equality of the calling vector with v to a defined precision.",
      example: ""
    },
    
    indexOf: {
      title: "indexOf(x)",
      use: "Returns the index position (numbered from 1, just as for e()) of the first element exactly equal to x. If no match is found, returns null.",
      example: ""
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
      title: "modulus()",
      use: "Returns the modulus of the caller, |v| = sqrt(sum(v<sub>i</sub>)<sup>2</sup>)",
      example: ""
    },
    
    multiply: {
      title: "multiply(k)",
      use: "Returns the vector obtained by multiplying all the elements of the caller by the scalar quantity k. Aliased as x(k).",
      example: ""
    },
    
    round: {
      title: "round()",
      use: "Returns a copy of the receiver with all its elements rounded to the nearest integer.",
      example: ""
    },
    
    setElements: {
      title: "setElements(e)",
      use: "Sets the receiver's elements property equal to the array e. Since version 0.1.1, the " + 
        "numericality of e's elements is not checked for performance reasons. It is assumed you'll " + 
        "be using this with numbers, and if you throw anything else in then most method calls won't work.",
      example: ""
    },
    
    snapTo: {
      title: "snapTo(x)",
      use: "Returns a copy of the receiver with any elements that differ from x by less than the value of " + 
        "Sylvester.precision set exactly equal to x. This can be useful for working around rounding errors.",
      example: ""
    },
    
    subtract: {
      title: "subtract(v)",
      use: "If the caller and v have the same number of elements, returns a Vector formed by subtracting " + 
        "the latter from the former. Otherwise, returns null.",
      example: ""
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
    }
  }
};
