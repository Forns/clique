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
    if (n instanceof Vector) {
      this.elements = this.elements.concat(n.elements);
    } else if (!(typeof(n) === "undefined")) {
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
    if (!this.elements.length) {
      this.elements[i - 1] = x;
    } else {
      this.elements.splice(i - 1, 1, x);
    }
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
    var copy = v.dup();
    if (!sortFunc) {
      sortFunc = sortAscending;
    }
    return $V(copy.elements.sort(sortFunc));
  };
  
  // Returns an array with the first element being the sorted elements of v with the given
  // sorting function, or ascending value by default, and the second element being the
  // original indices of those sorted values.
  Vector.sortWithIndex = function (v, sortFunc) {
    var copy = v.dup(),
        result,
        resultCopy,
        vCopy = v.elements.slice(),
        indices = [];
    if (!sortFunc) {
      sortFunc = sortAscending;
    }
    result = Vector.sort(copy, sortFunc);
    resultCopy = result.elements.slice();
    for (var i = 1; i <= result.dimensions(); i++) {
      indices[i - 1] = vCopy.indexOf(resultCopy[0]) + 1;
      resultCopy.splice(0, 1);
      vCopy[indices[i - 1] - 1] = undefined;
    }
    return [result, $V(indices)];
  };
  
  // Inserts a new vector representing the element e inserted into v at index i
  Vector.insert = function (v, i, e) {
    var elements = v.elements;
    if (elements.length){
      elements.splice(i - 1, 0, e);
    } else {
      elements[i] = e;
    }
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
        countSet = $V(),
        countSetFact = $V(),
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
  
  // Helper function that computes the base level in the tabloid above the one passed
  // to it as the threshhold. Size is the number of elements on the level of threshhold
  // or below
  // [!] Function is not in the API, but is within tests
  Vector.multiplier = function (countedSet, threshhold, size) {
    var result = Math.factorial(size);
    for (var i = threshhold; i <= countedSet.dimensions(); i++) {
      result /= Math.factorial(countedSet.e(i));
    }
    return result;
  };
  
  // Maps to tabloid given integer index and a vector containing the shape of
  // the tabloid. This vector is defined in accordance with the following:
  // 1 chosen from 4 chosen from 5 chosen from 9 yields rows of width:
  // 9-5, 5-4, 4-1, 1 respectively. So the vector would be passed as [4, 1, 3, 1]
  Vector.indexToSet = function (index, shapeVector) {
    var setSize = Vector.sum(shapeVector),
        result = Vector.zero(setSize),
        nextSize = setSize,
        internalSum,
        internalIndex,
        selectedSize,
        workingSize,
        base;
    index--;
    
    for (var i = 1; i <= shapeVector.dimensions(); i++) {
      internalSum = 0;                             // The working sum just for this line
      selectedSize = shapeVector.e(i);
      workingSize = nextSize;
      nextSize -= selectedSize;                    // Saved for next iteration
      base = Vector.multiplier(shapeVector, i+1, nextSize);
      internalIndex = Math.floor(Complex.divide(index, base));  // To serve as this step's index
      index -= Complex.mult(internalIndex, base);  // Saved for next iteration
      
      // The "workhorse" loop: loops through elements and sets appropriate ones to current line in tabloid
      for (var j = 1; j <= setSize; j++) {
        if (Complex.equal(result.e(j), 0)) {
          if (Complex.equal(selectedSize, 0)) {
            workingSize--;
          } else if (internalSum + Math.choose(workingSize - 1, selectedSize) > internalIndex) {
            workingSize--;
          } else {
            internalSum += Math.choose(workingSize - 1, selectedSize);
            result.setElement(j, i);
            workingSize--;
            selectedSize--;
          }
        }
      }
    }
    
    return result;
  };
  
})();


