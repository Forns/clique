/**
 * Modifications to the Sylvester Vector objects
 */
(function () {
  
  /** Helper Methods **/
  // Helper method for the matrix sorting that determines
  // ascending sorting method
  var sortAscending = function (a, b) {
    var result = Complex.sub(a, b);
    return result.real || result;
  },
  
  sortDescending = function (a, b) {
    var result = sortAscending(a, b) * -1;
    return result.real || result;
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
      sortFunc = sortAscending;
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
  
  // Takes a vector and a number and returns the number of occurrences of the
  // number in that set.
  Vector.histoCount = function (set, number) {
    var counter = 0,
        currentItem;
    for (var i = 1; i <= set.dimensions(); i++) {
      currentItem = set.e(i);
      if (!(typeof(currentItem) === "number" || Complex.areComplex(currentItem))) {
        counter += Vector.histoCount(currentItem, number);
      } else if (Complex.equal(set.e(i), number)) {
        counter++;
      }
    }
    return counter;
  };
  
  // Helper function that multiplies the factorials of all elements in countedSet that are
  // greater than the threshhold
  // [!] Not in API, but in unit tests
  Vector.factProduct = function (countedSet, threshhold, countsetFact) {
    var result = 1;
    for (var i = threshhold; i <= countedSet.dimensions(); i++) {
      result = Complex.mult(result, countsetFact.e(i));
    }
    return result;
  };
  
  /** EXPERIMENTAL FUNCTIONS **/
  
  // Maps from multiple-deep tabloid or set to an integer index of possible sets of that shape
  Vector.setToIndex = function (setArray) {
    var index = 1,
        setSize = setArray.dimensions(),
        highestLevel = setArray.e(1), // Seed with first element for comparing purposes
        countSet = $V([0]),
        countSetFact = $V([0]),
        workingSize,
        thisLevel,
        multiplier,
        index;
    
    // Increment each of the elements of the setArray by 1 and see which is the highest
    setArray = setArray.map(function (x) {
      var result = Complex.add(x, 1);
      if (result > highestLevel) {
        highestLevel = result;
      }
      return result;
    });
    for (var i = 1; i <= highestLevel; i++) {
      countSet.setElement(i, Vector.histoCount(setArray, i));
      countSetFact.setElement(i, Math.factorial(countSet.e(i)));
    }
    
    for (var levelCounter = 1; levelCounter < highestLevel; levelCounter++) {
      workingSize = setSize;
      thisLevel = countSet.e(levelCounter);
      multiplier = Complex.divide(Math.factorial(Complex.sub(workingSize, thisLevel)), Vector.factProduct(countSet, levelCounter + 1, countSetFact));
      
      for (k = 1; k <= setArray.dimensions(); k++) {
        var currentValue = setArray.e(k);
        if (currentValue > levelCounter) {
          workingSize--;
        } else if (currentValue === levelCounter) {
          index = Complex.add(index, Complex.mult(Math.choose(workingSize - 1, thisLevel), multiplier));
          workingSize--;
          thisLevel--;
        }
      }
      setSize = Complex.sub(setSize, countSet.e(levelCounter));
    }
    return index;
  };
  
})();


