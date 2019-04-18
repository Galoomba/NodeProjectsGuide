/**
 * to extract arrays or object elements and copy them into another one
 */

 const person={
     name:'max',
     age:23,
     greet(){
         console.log('hi '+this.name)
     }

 }
 //that make wrong person point to the same person referance
 const wrongPerson=person
 console.log(wrongPerson)
 //that copy the element in person into another object with differnt referance
 const newPerson ={...person}
 console.log(newPerson)


 //for arrays the same 
 const array=["1","2","3"]
 const newArray=[...array]

 console.log(newArray)