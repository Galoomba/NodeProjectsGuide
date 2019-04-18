/**
 * there are 2 right ways to make a method in a object buddy 
 */

const person = {
    name:'max',
    age:29,
    greet:()=>{
        //duo to the arrow fuction scope that won't work since it refere to the global scope
        // we have 2 ways to make it work as we bleesed 
        console.log('hi '+this.name)
    }
}

const personWithFunctionKeyword = {
    name:'max',
    age:29,
    greet:function(){
        console.log('hi '+this.name)
    }
}

const personWithoutTheArrow = {
    name:'max',
    age:29,
    greet(){
        console.log('hi '+this.name)
    }
}

person.greet()
personWithFunctionKeyword.greet()
personWithoutTheArrow.greet()