
const fs = require('fs')

const routesHandler=(req,res)=>{
    //req.url to get user url path
    //req.method to get the method ex get or post 
    //req.headers to get the headers of th req
    //console.log(req.url, req.method, req.headers, req.httpVersion)

    const url = req.url
    const method = req.method
    //if the client in root page
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // we have always to retun res.end() to not excute rest of code
        return res.end()
    }
    //in the url == /message
    if (url === '/message' && method === 'POST') {
        const body = []
        //collect the chunks sent 
        //on data recive 
        req.on('data', chunk => {
            body.push(chunk)
        })
        //on chunks recieved
        //return to prevent the rest of the code to excute 
        return req.on('end', () => {
            //concat the chuncks
            const buffer = Buffer.concat(body).toString()
            const message = buffer.split('=')[1]
            //use fs.writeFile instead of writefileSync to excute async 
            fs.writeFile('message.txt', message, err => {
                //when write file finish 
                // 302 for redirection
                res.statusCode = 302;
                //redirect to root page
                res.setHeader('Location', '/');
                return res.end();
            })
        })
    }
    //send the respose back to the client
    //set the header
    res.setHeader('Content-Type', 'text/plain')
    res.write("hii")
    //we always have to end the response 
    res.end()
}

//export the module to be used in server
//module.exports=routesHandler

// we can exports with 2 other ways

//export an object
//module.exports={handler:routesHandler,text:'random text'}

//or export them using another sentax
module.exports.handler=routesHandler
module.exports.text="Random text"

// we can always remove module from the beganing