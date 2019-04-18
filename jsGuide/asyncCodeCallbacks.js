
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
 