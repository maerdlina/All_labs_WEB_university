const http=require('node:http');

const PORT=3000;
const host='127.0.0.1';

let comments = [];
let users = {}

function Bad(res){
    res.writeHead(400, {'Content-type':'text/plain'})
    res.end('Bad Request')
}

const server=http.createServer((req,res) => {
    console.log('Server request');
    console.log(req.url, req.method);

    const method = req.method
    const url = req.url
    const name = req.headers['user-agent']

    switch(url){
        case '/':
            if (method=='GET'){
                res.writeHead(200, {'Content-type':'text/plain'})
                res.end('Hello!')
            }
            else{
                Bad(res);
            }
            break;
        case '/comments':
            if (method === "POST"){
                res.writeHead(200, {'Content-Type': 'application/json'})

                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    comments.push(data)
                    res.end(JSON.stringify(comments))
                })
                
            }else{
                Bad(res)
            }
            break; 
        case '/stats':
            if (method=='GET'){
                res.writeHead(200, {'Content-Type': 'text/html'})

                let data = ''
                req.on('data', (chunk) => {
                    data += chunk
                })
                req.on('end', () => {
                    let firstHtml =
                    '<table>' +
                        '<tr>' +
                            '<td>Name</td>' +
                            '<td>Count request</td>' +
                        '</tr>'
                    let secondHtml = ''

                    if (users[name]) {
                        users[name] += 1
                    }else{
                        users[name] = 1
                    }
                    for (const key in users) {
                        secondHtml +=
                            `<tr>
                                <td>${key}</td>
                                <td>${users[key]}</td>
                            </tr>`
                    }
                    let resHtml = firstHtml + secondHtml + '</table>'
                    res.end(resHtml)
                })
                
            }
            else{
                Bad(res);
            }
            break;
    }
});


server.listen(PORT, host,(error) => {
    error ? console.log(error) : console.log(`HOST: ${host}:${PORT}`);
})