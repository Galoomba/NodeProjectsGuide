//array could contian values of different types 
const sports=["hii",2]

//push element into array
sports.push("buy");

//edit or map array
const newArray=sports.map(object=>"cc "+object)

//loop throw an array 
newArray.forEach(object=> console.log(object))

//search if array have that value
console.log(newArray.includes('cc 2',0))

//split the array into 
const alfaArray=[]
newArray.forEach(object=>{
   alfaArray.push( object.split(" "))
})
console.log(alfaArray)

//copy the array into another array 
alfaArray.push(newArray.slice())
console.log(alfaArray)

console.log(sports)
console.log(newArray)
