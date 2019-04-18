/**
 * it works to send multiple attrs to a method without knowing there number 
 * it bind all attrs in an array 
 */

 const toArray= (...args)=>{
    return args
 }
 //it retuen all the args combined  into an array 
 console.log(toArray(1,2,5,3,4,4,5))