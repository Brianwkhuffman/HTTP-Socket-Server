const net = require('net');
const files = require('./files.js');
const PORT = 8080;
let response = '';
let date = new Date();

const server = net.createServer((socket) => {
    socket.on('data', (chunk) => {
        // read incoming data
        // console.log('data');
        // console.log(chunk.toString());

        // parse the string
        let data = chunk.toString();
        let dataArr = data.split('\r\n');
        let getfirstline = dataArr[0].split(' ');
        let key = getfirstline[1];

        if (key === '/index.html' || key === '/') {
            response = `HTTP/1.1 200 OK
Date: ${date.toUTCString()}
Content-Type: text/html, charset=utf-8
Content-Length: ${files.index.length}

${files.index}`
        } else if (key === '/helium') {
            response = `HTTP/1.1 200 OK
Server: Fenrir
Date: ${date.toUTCString()}
Content-Type: text/html, charset=utf-8;
Content-Length: ${files.helium.length}

${files.helium}
`
        } else if (key === '/hydrogen') {
            response = `HTTP/1.1 200 OK
Server: Fenrir
Date: ${date.toUTCString()}
Content-Type: text/html, charset=utf-8
Content-Length: ${files.hydrogen.length}

${files.hydrogen}
`
        } else if (key === '/styles') {
            response = `HTTP/1.1 200 OK
Server: Fenrir
Date: ${date.toUTCString()}
Content-Type: text/css
Content-Length: ${files.styles.length}

${files.styles}
`
        } else {
            response = `HTTP/1.1 404 NOT FOUND
Server: Fenrir
Date: ${date.toUTCString()}
Content-Type: text/html, charset-utf-8`
        }
        // write outgoing data
        socket.write(response);
        socket.end();
    });

    socket.on('end', () => {
        // handle client disconnect
        console.log('Disconnect')
    });

    socket.on('error', (err) => {
        // handle error in connection
        console.log(err)
    });
});

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
