
                                         /*** Generators ***/
 //Instead of returning with a return, generators have a yield statement.
 // It stops the function execution until a .next is made for that function iteration.
 // It is similar to .then promise that only executes when resolved comes back.
 
 function* idMaker() {
    let index = 0;
    while(true)
        yield index++;
}

var gen = idMaker(); // "Generator { }"

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

/**
 * 
Generator.prototype.next()
    Returns a value yielded by the yield expression.
Generator.prototype.return()
    Returns the given value and finishes the generator.
Generator.prototype.throw()
    Throws an error to a generator (also finishes the generator, unless caught from within that generator). 
 */
