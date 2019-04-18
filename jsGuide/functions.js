/**
 * there are 3 ways to write  functions in javescript 
 */

 /**
  * USE const keyword for unchangeable variable & use let for the changeable ones
  * let & const have different scope than var
  */
 const name ="Adin"
 let age =30

/**
 * First type of fuction with the function keyword 
 * @param {string} name the name of the user 
 * @param {number} age the age of the user
 */
function myfunc(name,age){console.log(name+" "+age)}

/**
 * Second type of declaring a function 
 * * that is called annoymes function 
 * @param {string} name the name  
 * @param {number} age his age 
 */
const myfunc2= function(name ,age){console.log(name+" "+age)}

/**
 * Third type of declaring a function 
 * * that is called arrow function 
 * @param {string} name the name  
 * @param {number} age his age 
 */
const myfunc3= (name ,age)=>{console.log(name+" "+age)}

myfunc(name,age++)
myfunc2(name,age++)
myfunc3(name,age)
