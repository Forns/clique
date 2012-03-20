/**
 * Modifications to the Sylvester Vector objects
 */
(function () {
  
  /** Helper Methods **/
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  var sortNumber = function (a, b) {
    return Complex.sub(a, b);
  };
  
  
  /** Instance Methods **/
  
  // Used to append a new element to the end of a vector
  Vector.prototype.append = function (n) {
    if (!(typeof(n) === "undefined")) {
      this.elements.push(n);
    }
    return this;
  };
  
  // Removes x elements from position i of the calling vector
  Vector.prototype.remove = function (i, x) {
    this.elements.splice(i - 1, x);
    return this;
  };
  
  // Mutator that sets the vector's element at i to x
  Vector.prototype.setElement = function (i, x) {
    this.elements.splice(i - 1, 1, x);
    return this;
  };
  
  
  /** Class Methods **/
 
  // Returns the sum of all elements of v
  Vector.sum = function (v) {
    var result = 0;
    for (var i = 1; i <= v.dimensions(); i++) {
      result = Complex.add(result, v.e(i));
    }
    return result;
  };

  // Returns a new vector of the elements of v with the given sorting function, or ascending
  // value by default
  Vector.sort = function (v, sortFunc) {
    if (!sortFunc) {
      sortFunc = sortNumber;
    }
    return $V(v.elements.sort(sortFunc));
  };
  
  // Inserts a new vector representing the element e inserted into v at index i
  Vector.insert = function (v, i, e) {
    var elements = v.elements;
    elements.splice(i - 1, 0, e);
    return $V(elements);
  };
  
  // Returns a new vector of n elements consisting solely of 1's
  Vector.ones = function (n) {
    result = [];
    for (var i = 0; i < n; i++) {
      result[i] = 1;
    }
    return $V(result);
  };
 
})();


