
const sum = (a, b) => {
    if (a && b) 
     return Promise.resolve( a + b)
    return  Promise.reject('Invalid args')

    // ALTER using promise constructor 
    // const promise= new Promise((resolve,reject)=>{
    //     if (a && b) 
    //       resolve( a + b)
    //     reject('Invalid args')
    // })
    // return promise
}

sum(1,2)
.then(result=>console.log(result))
.catch(err=>console.log(err))
