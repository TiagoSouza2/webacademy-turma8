const http = require("http");
const fs = require("fs");
const path = require('path');
const dotenv = require('dotenv');
const utils = require("./utils.js")
const diretorio = process.argv[2]

dotenv.config({
    path: path.join(
        __dirname,
        `.env.${process.env.NODE_ENV}`
    )
});

const PORT = process.env.PORT ?? 3333;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    if (req.url === "/") {
        fs.readdir(diretorio, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    res.write(utils.createLink(file));
                })
            }
            res.end();

        })
    }
    else {
        const pathArquivo = path.join(diretorio, req.url.substring(1))

        fs.readFile(pathArquivo, (err, file) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            res.write(`<a href="/">Voltar</a><br><br>`);
            res.write(file);
            res.end();
        });
    }
});

server.listen(PORT);