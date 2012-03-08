/**
 * api-items.js
 *
 * Contains the elements for the api listing, with descriptions,
 * examples, and links
 */

var apiItems = {
  // Contains API elements for the complex lib
  "complex": {
    create: {
      title: "Complex.create(real, imaginary) || $C(real, imaginary)",
      use: "Returns a new complex number with real (x) and imaginary (y) components " +
        "of the form x + iy where i is the imaginary unit.",
      example: "var z = Complex.create(1, -1); // z = 1 - i<br/>" +
        "var m = $C(0, 3); // m = 3i"
    },
    
    areComplex: {
      title: "Complex.areComplex(nums)",
      use: "Returns a boolean denoting whether all of a given list of / single number(s) " +
        "are complex; a single non-Complex number will return false.",
      example: "Complex.areComplex([$C(1), 2, 3]); // False"
    },
    
    equal: {
      title: "Complex.equal(a, b)",
      use: "Compares two numbers, a and b, and returns a boolean denoting if they're, surprise, equal.<br/> " +
        "[!] Required for comparisons against complex numbers.",
      example: "Complex.equal(2, $C(2)); // True<br/>" +
        "Complex.equal($C(2, 1), $C(2, 1)); // True<br/>" +
        "Complex.equal($C(5, 1), 5); // False"
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
    
    thing: {
      title: "",
      use: "",
      example: ""
    }
  }
};
