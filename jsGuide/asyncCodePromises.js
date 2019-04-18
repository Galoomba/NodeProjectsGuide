
//***promises***/


const fetchDataByPromises = () => {
    //Promise takes 2 functions as a prameter Resolve & Reject
    //Resolve when the request got accepted 
    //Reject when the request got rejected 
    // we have to returen the promise to be used 
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done!')
        }, 2000);
    })
    return promise;
}

fetchDataByPromises().then(text => {
    console.log(text)
    //return the same promise for the second then 
    return fetchDataByPromises()
}).then(text2 => { console.log(text2) })
    //when the reject fuction calls 
    .catch(() => { })

 // things to bear in mind about Promises
 //1-resolve and reject only accept one parameter resolve(‘yey’, ‘works’) will only send ‘yey’ to the .then callback function
 //2-If you chain multiple .then You should always add a return at the end of their respective callbacks
 //  Else they will execute at the same time
 //3-With a chain on .then if an error happens on the first one It will skip subsequent .then until it finds a .catch

