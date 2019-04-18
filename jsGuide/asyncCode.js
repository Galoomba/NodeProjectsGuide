/**
 * Async Tasks 
 */


                                        //***CallBacks ***/
 // Send a function to another function to excute later after the first one 

 const  doThis=(name,callback)=> {
    console.log('this first '+ name) 
    callback(name)
  }
 
  doThis('Galoomba',(name)=> {
      //This 'the arrow fuction will excute after the doThis Method get excuted 
      // the name sent to the do this function will be send to the callback
     console.log('and then this ' +name)
   })
 
 // Another example 
 //FetchData method has a call back that being excute after the timer finish 
 //Calling the second method after 
 const fetchData=callback=>{
     setTimeout(() => {
         callback('Done!');
     }, 50);
 }
 fetchData(text=>{console.log(text)})
 
 
                                         //***promises***/
  
 
 const fetchDataByPromises=()=>{
     //Promise takes 2 functions as a prameter Resolve & Reject
     //Resolve when the request got accepted 
     //Reject when the request got rejected 
     // we have to returen the promise to be used 
     const promise= new Promise((resolve,reject)=>{
         setTimeout(() => {
         resolve('done!')
         }, 2000);
     })
     return promise;
 }
 
 fetchDataByPromises().then(text=>{
     console.log(text)
     //return the same promise for the second then 
     return fetchDataByPromises()
 }).then(text2=>{console.log(text2)})
 //when the reject fuction calls 
 .catch(()=>{})
 
 // things to bear in mind about Promises
 //1-resolve and reject only accept one parameter resolve(‘yey’, ‘works’) will only send ‘yey’ to the .then callback function
 //2-If you chain multiple .then You should always add a return at the end of their respective callbacks
 //  Else they will execute at the same time
 //3-With a chain on .then if an error happens on the first one It will skip subsequent .then until it finds a .catch
 
 
 
                                         /*** Generators ***/
 //Instead of returning with a return, generators have a yield statement.
 // It stops the function execution until a .next is made for that function iteration.
 // It is similar to .then promise that only executes when resolved comes back.
 
 function *foo(){
     yield 'doo'//Wait until the first request is prepared
     yield 'soo'
 }                                  
 var doo=foo()
 console.log(doo.next().value)
 console.log(doo.next().value)
 
 
 
 
                                     /*** Async/Await ***/
 
 
 //return a promise 
 function afterTwoSeconds(value) {
   return new Promise(resolve => {
     setTimeout(() => { resolve(value) }, 2000);
   });
 }
 
 async function  sumTwentyAfterTwoSeconds(value) {
     const remainder = afterTwoSeconds(20)
     // Waits for the afterTwoSeconds to finish then return the value 
     return value + await remainder
   }
 
 sumTwentyAfterTwoSeconds(10).then(text=>console.log(text))