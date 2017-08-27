/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!n){
      return array[0];
    } 
    if (n > array.length){
      n = array.length;
    }
      var result = [];
      for (var i=0; i<n; i++){
        result.push(array[i]);
      }
    return result;
    
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!n){
      return array[array.length - 1];
    }
    if (n > array.length){
      n = 1;
    }

    var result = [];
    for (var i=n-1; i<array.length; i++){
      result.push(array[i]);
    }

    return result;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection){
      iterator(collection[key], key, collection);
    }    
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i=0; i<array.length; i++){
      if (array[i] === target){
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var result = [];
    
    for (var i=0; i<collection.length; i++){
      if (iterator(collection[i])){
        result.push(collection[i]);
      }
    }
    return result;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var result = [];

    for (var i=0; i<collection.length; i++){
      if (!iterator(collection[i])){
        result.push(collection[i]);
      }
    }

    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {

    for (var i=0; i<array.length; i++){
      if (array.lastIndexOf(array[i]) !== i){ //how slow is this going to be? is sorting and popping better?
        array.splice(i, 1);
        i--;
      }
    }
    return array.sort();
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var result = [];
    for (var i=0; i<array.length; i++){
      result.push(iterator(array[i]));
    }
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var result = [];
    for (var i=0; i<array.length; i++){
      result.push(array[i][propertyName]);
    }
    return result;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    
    var type = typeof methodName;
    var result = [];
    
    if (type === 'string'){
      for (var i=0; i<list.length; i++){
        result.push(window.Array.prototype[methodName].call(list[i]))
      }
    } else {
        for (var i=0; i<list.length; i++){
           result.push(methodName.call(list[i]));
        }
      }
 
    return result;
  }; 

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var result = initialValue || 0;

    for (var i=0; i<collection.length; i++){
      console.log(iterator(result, collection[i]));
      result = (iterator(result, collection[i]));
    }
    return result;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var key in collection){
      if (collection[key] === target){
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (typeof iterator !== 'function'){
      return true;
    }
    for (var i=0; i<collection.length; i++){
      if (!iterator(collection[i])){
        return false;
      }
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    
    if (typeof iterator !== 'function'){
      
      var iterator = function(item){
        if (typeof item === 'string' && item !== ""){
          return true;
        }
        return (item == true);
      }
    }
    for (var i=0; i<collection.length; i++){
      
      if (iterator(collection[i])){
        return true;
      }
    }
    return false;

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for (var i=0; i<arguments.length; i++){
      for (var key in arguments[i+1]){
        obj[key] = arguments[i+1][key]
      }
    }

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    for (var i=0; i<arguments.length; i++){
      for (var key in arguments[i+1]){
        if (!obj.hasOwnProperty(key)){
          obj[key] = arguments[i+1][key];
        }
      }
    }

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    if (!hasRun){
      var hasRun = func();
    }
    return function(){
      return hasRun;
    }
    
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    if (!storedResults){
      var storedResults = {};
    }
    
    return function(n){
      if (!storedResults[n]){
        storedResults[n] = func(n);
      }

      return storedResults[n];
    }

    // if (!storedResults){
    //   var storedResults = {};
    // }
    // if (!storedResults[func.name]){
    //   storedResults[func.name] = func();
    // }
    // console.log(storedResults[func]);
    // return storedResults[func.name];
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // window.setTimeout(func, wait);

    console.log(wait)
    var args = [];
    for (var i=2; i<arguments.length; i++){
      args.push(arguments[i]);
    }

    console.log(func);
    console.log(args)

    window.setTimeout(function(){
      func(...args);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var shuffled = array.slice();
    shuffled.sort(function(a, b){
      return (Math.random() * 2 - 1);
    });

    return shuffled;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    console.log("================")
    // console.log(collection[length])
    // console.log(iterator)
    // console.log(collection)
    var dictionary = [];
    var result = [];
    
    if (typeof iterator === 'function'){
      for (var i=0; i<collection.length; i++){
        var value = iterator(collection[i]);
        dictionary[i] = [i, value];
      }
      // console.log(dictionary)
    } else {
      for (var i=0; i<collection.length; i++){
        dictionary.push([i, collection[i][iterator]]);
      }
    }
    // console.log(dictionary)
    // dictionary.sort(function(a,b){

    //   // console.log(a[0] + " - " + b[0] + " = " + (a[0] - b[0]));
    //   return a[0] - b[0];

    // });
    // console.log(dictionary)

    dictionary.sort(function(a,b){
      if (!a[1] && !b[1]){
        return 0;
      } else if (!a[1]){
        return 1;
      } else if (!b[1]){
        return -1;
      } else if (a[1] === b[1]){
        return a[0] - b[0];
      } else {
        return a[1] - b[1];
      }  
    })

    // dictionary.sort(function(a,b){
    //   if (a[1] === b[1]){
    //     return a[0]-b[0];
    //   }
    //   return 0;
    // })


  
    
    for (var i=0; i<dictionary.length; i++){
      result.push(collection[dictionary[i][0]]);
    }
    // console.log(result)
    return result;

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];
    var maxLength = 0;
    for (var i=0; i<arguments.length; i++){
      if (arguments[i].length > maxLength){
        maxLength = arguments[i].length;
      }
    }
    for (var i=0; i<arguments.length; i++){
      zipped[i] = [];
      for (var y=0; y<maxLength; y++){
        zipped[i].push(arguments[y][i])
      }
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {

    result = [];

    function loop(array){
      for (var i=0; i<array.length; i++){
        if (typeof array[i] !== 'object'){
          result.push(array[i]);
        } else {
          loop(array[i]);
        }
      }
    }
    

    for (var i=0; i<nestedArray.length; i++){
      if (typeof nestedArray[i] !== 'object'){
        result.push(nestedArray[i]);
      } else {
        loop(nestedArray[i]);
      }
    }

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    var args = [].slice.call(arguments);
    var shared = args[0];
    for (var i=1; i<args.length; i++){
      shared = shared.filter(function(element){
        if (args[i].indexOf(element) !== -1){
          return true;
        }
      });
    }

    return shared;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var difference = array;
    for (var i=1; i<arguments.length; i++){
      for (var y=0; y<arguments[i].length; y++){
        var index = difference.indexOf(arguments[i][y]);
        if (index !== -1){
          difference.splice(index, 1);
        }
      }
    }
    return difference;
  };

}).call(this);
