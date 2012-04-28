/**
 * complex.js
 *
 * Complex number library for handling non-real results
 * for linear algebra functionality
 */

// Complex numbers of the form x + iy where x, y are
// real numbers and i = sqrt(-1)
var $C,
    Complex = $C = function () {};

(function() {
  
  // Helper functions
  var ln = function (n) {
    // Returns the natural log of n
    return Math.log(n) / Math.log(Math.E);
  };
  
  // Sets the sensitivity for equivalence checks
  // Default is the Sylvester setting
  Complex.sensitivity = Clique.precision;
  
  Complex.prototype = {
    
    // Sets the given complex number's real and imaginary
    // components to those provided
    fromRect: function (x, y) {
      this.real = x;
      this.im = y;
      return this;
    },
    
    // Sets the given complex number's real and imaginary
    // components from the polar arguments given
    fromPolar: function (r, theta) {
      return this.fromRect(
        r * Math.cos(theta),
        r * Math.sin(theta)
      );
    },
    
    // Distance of Complex vector from origin
    modulus: function () {
      var a = this.real,
          b = this.im;
      return Math.sqrt(a * a + b * b);
    },
    
    // Returns the complex conjugate (negation of im):
    // The conjugate of 2 + 3i would be 2 - 3i
    conjugate: function () {
      return this.fromRect(this.real, -this.im);
    },
    
    // Returns the angle of the complex number
    angle: function () {
      return Complex.angleOf(this);
    },
    
    // Returns the log of this complex to base k
    log: function (k) {
      return Complex.log(this, k);
    },
    
    // Negates both real and im components
    negate: function () {
      return Complex.negate(this);
    },
    
    // Adds this to another number
    add: function (z) {
      return Complex.add(this, z);
    },
    
    // Subtracts a number from this
    sub: function (z) {
      return Complex.sub(this, Complex.negate(z));
    },
    
    // Multiplies a number by this
    mult: function (z) {
      return Complex.mult(this, z);
    },
    
    // Returns true if the two complex numbers are equal
    equal: function (z, strict) {
      return Complex.equal(this, z, strict);
    },
    
    // Returns a string representation of the Complex number
    toString: function () {
      var ret = '', a = this.real, b = this.im;
      if (a) ret += a;
      if (a && b || b < 0) ret += (b < 0) ? '-' : '+';
      if (b){
        var absIm = Math.abs(b);
        if (absIm != 1) ret += absIm;
        ret += 'i';
      }
      return ret || '0';
    }
    
  };
  
  // Constructor function
  $C = Complex.create = function (real, imaginary) {
    var newComplex = new Complex();
    return newComplex.fromRect((real || 0), (imaginary || 0));
  };
  
  // Checks if all input arguments are complex numbers
  Complex.areComplex = function (nums) {
    if (!arguments.length) {
      return false;
    }
    for (n in arguments) {
      if (!(arguments[n] instanceof Complex)) {
        return false;
      }
    }
    return true;
  };
  
  // Returns true if the argument is a complex number
  Complex.equal = function (a, b, strict) {
    var precision = (typeof(strict) === "undefined") ? Complex.sensitivity : 0;
    if (Complex.areComplex(a)) {
      if (Complex.areComplex(b)) {
        return (Math.abs(a.real - b.real) <= precision) && (Math.abs(a.im - b.im) <= precision);
      }
      return Math.abs(a.real - b) <= precision && !a.im;
    } else {
      if (Complex.areComplex(b)) {
        return Math.abs(b.real - a) <= precision && !b.im;
      }
      return Math.abs(a - b) <= precision;
    }
  };
  
  // Negates real and im components if Complex, or just returns negative
  // if a real number
  Complex.negate = function (n) {
    return (n instanceof Complex) ? $C(-n.real, -n.im) : -n;
  };
  
  // Returns the distance from the origin of either a complex number
  // or a real
  Complex.magnitude = function (n) {
    return (Complex.areComplex(n)) ? n.modulus() : Math.abs(n);
  };
  
  // Returns the angle from the positive real axis of the given number n
  Complex.angleOf = function (n) {
    if (!Complex.areComplex(n)) {
      return (n === 0) ? NaN : ((n > 0) ? 0 : 180);
    }
    if (n.real === 0 && n.im === 0) {
      return NaN;
    }
    var arctan = Math.atan(n.im / n.real);
    if (n.real > 0) {
      return arctan;
    }
    if (n.real < 0) {
      return (n.im >= 0) ? arctan + Math.PI : arctan - Math.PI;
    }
    // Otherwise, n.real === 0
    return (n.im > 0) ? Math.PI / 2 : -1 * Math.PI / 2;
  };
  
  // Returns the log base k of the given number n
  Complex.log = function (n, k) {
    if (typeof(k) === "undefined") {k = Math.E;}
    var isComplex = Complex.areComplex(n);
    if (k === 0) {return (isComplex) ? $C(0) : 0;}
    if (k === 1) {return NaN;}
    if (!isComplex) {
      return Math.log(n) / Math.log(k);
    }
    return $C(
      Complex.log((n.modulus()), Math.E),
      Complex.angleOf(n)
    );
  };
  
  // Returns e^(n)
  Complex.exp = function (n) {
    if (!Complex.areComplex(n)) {
      return Math.exp(n);
    }
    return n.fromPolar(
      Math.exp(n.real),
      n.im
    );
  };
  
  // Returns n^k
  Complex.pow = function (n, k) {
    if (!Complex.areComplex(n)) {
      return Math.pow(n, k);
    }
    if (!k) {
      if (k === 0) {
        return $C(1);
      }
      return NaN;
    }
    var result = n;
    while (k > 1) {
      result = Complex.mult(result, result);
      k--;
    }
    return result;
  }
  
  // Rounds the imaginary and real parts of the given number to the
  // nearest integer value
  Complex.round = function (n) {
    if (!Complex.areComplex(n)) {
      return Math.round(n);
    }
    return $C(Math.round(n.real), Math.round(n.im));
  };
  
  // Adds two numbers a and b, returning a Complex if either
  // a or b are complex
  Complex.add = function (a, b) {
    if (!Complex.areComplex(a) && !Complex.areComplex(b)) {
      return a + b;
    }
    var aReal = (Complex.areComplex(a)) ? a.real : a,
        bReal = (Complex.areComplex(b)) ? b.real : b,
        aIm = (a.im || 0),
        bIm = (b.im || 0);
    return $C(aReal + bReal, aIm + bIm);
  };
  
  // Subtracts two numbers b from a, returning a Complex if either
  // a or b are complex
  Complex.sub = function (a, b) {
    return Complex.add(a, Complex.negate(b));
  };
  
  // Multiplies two numbers a and b, returning a Complex if either
  // a or b are complex
  Complex.mult = function (a, b) {
    if (!Complex.areComplex(a) && !Complex.areComplex(b)) {
      return a * b;
    }
    var aReal = (Complex.areComplex(a)) ? a.real : a,
        bReal = (Complex.areComplex(b)) ? b.real : b,
        aIm = (a.im || 0),
        bIm = (b.im || 0);
    return $C(aReal * bReal - aIm * bIm, aReal * bIm + bReal * aIm);
  };
  
  // Divides two numbers a by b, returning a Complex if either
  // a or b are complex
  Complex.divide = function (n, m) {
    if (!Complex.areComplex(n) && !Complex.areComplex(m)) {
      return n / m;
    }
    var a = $C(Complex.areComplex(n) ? n.real : n),
        b = n.im || 0,
        c = $C(Complex.areComplex(m) ? m.real : m),
        d = m.im || 0;
    // Division by zero? Not on my watch...
    if (!(c || d)) {
      return NaN;
    }
    return $C(
      (a * c + b * d) / (c * c + d * d),
      (b * c - a * d) / (c * c + d * d)
    );
  };
  
  // Returns the square root of a number, returning a Complex if
  // it is non-real
  Complex.sqrt = function (n) {
    if (!Complex.areComplex(n)) {
      return (n < 0) ? $C(0, Math.sqrt(Math.abs(n))) : Math.sqrt(n);
    }
    var mod = n.modulus(),
        sign = (!n.im || n.im >= 0) ? 1 : -1,
        x = Math.sqrt((n.real + mod) / 2),
        y = sign * Math.sqrt((-1 * n.real + mod) / 2);
        
    return $C(x, y);
  };
  
  // Returns the pythagorean calculation for an arbitrary number of arguments
  Complex.pythag = function () {
    var result = 0;
    for (var n in arguments) {
      result = Complex.add(result, Complex.pow(arguments[n], 2));
    }
    return Complex.sqrt(result);
  };
  
})();

