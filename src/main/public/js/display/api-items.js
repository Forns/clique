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
      example: "var z = $C(1, 1);<br/>Complex.angleOf(z); // pi + pi * i"
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
        "each of the vector’s elements:",
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
      use: "Sets the receiver's elements property equal to the array els. Since version 0.1.1, the " + 
        "numericality of els’s elements is not checked for performance reasons. It is assumed you’ll " + 
        "be using this with numbers, and if you throw anything else in then most method calls won’t work.",
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
        "Line and Plane classes, although for performance reasons they don’t use this method.",
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
