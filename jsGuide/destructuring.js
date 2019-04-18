/**
 * Destructuring mean is to destruct specifec attrs form objects or arrays 
 */

 //for objects
const person={
    name:'max',
    age:23,
    greet(){
        console.log('hi '+this.name)
    }
}
//will get the value of the name and the age from the person object and store
//them into the name and age variables 
const {name,age}=person
console.log(name,age)


//for arrays 
const sports=["hii",2, ()=>console.log('hi')]
// will distruct the first and the third element 
//names can be changed to anything 
const [one,,three]=sports
console.log(one)
three()