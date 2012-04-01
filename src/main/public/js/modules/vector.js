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
  
  // Returns the Radon transform R: M^lam --> M^lam+ where lam is a partition of an integer n
  Vector.radonTransform = function (lam) {
    var size = lam.dimensions(),
        lamSum = Vector.sum(lam),       // Number being partitioned
        newPartition = lam.dup(),
        tabs = Matrix.tabloids(lam),    // The starting tabloids
        tabSize = tabs.rows(),
        newTabs,                        // The "goal" tabloids
        newTabsSize,
        count = 0,
        zeros,
        index,
        result = [];                    // The final Radon transform
        
        newPartition.setElement(1, Complex.add(newPartition.e(1), 1));
        newPartition.setElement(size, Complex.sub(newPartition.e(1), 1));
        newTabs = Matrix.tabloids(newPartition);
        newTabsSize = newTabs.rows();
        
    for (var i = 1; i <= tabSize; i++) {
      count = 0;
      zeros = $V([1, lamSum]);
      for (var j = 1; count < lam.e(size); j++) {
        if (Complex.equal(tabs.e(i, j), size)) {
          zeros = tabs.row(i);
          zeros.setElement(j, 1);
          index = Vector.setToIndex(zeros);
          if (typeof(result[index]) === "undefined") {
            result[index] = [];
          }
          result[index][i] = (typeof(result[index][i]) === "undefined") ? 1 : result[index][i] + 1;
          count++;
        }
      }
    }
    alert("returning!");
    alert(JSON.stringify(result));
    return $M(result);
  };
  
})();


