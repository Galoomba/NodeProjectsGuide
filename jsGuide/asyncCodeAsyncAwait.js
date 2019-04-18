
                                     /*** Async/Await ***/
 
 
 //return a promise 
 function afterTwoSeconds(value) {
    return new Promise(resolve => {
      setTimeout(() => { resolve(value) }, 2000);
    });
  }
  //that will wait the other method to finish 
  async function  sumTwentyAfterTwoSeconds(value) {
      const remainder = afterTwoSeconds(20)
      console.log("inAsync")
      // Waits for the afterTwoSeconds to finish then return the value 
      return value + await remainder
    }
  
  sumTwentyAfterTwoSeconds(10).then(text=>console.log(text))