 
 const sum =(a,b)=>{
    if(a&&b)   
    return a+b
    throw new Error('Invalied args')
 }
 //we have to catch the error 
 try {
    console.log(sum(1))
 }catch(err){
     console.log(err)
 }