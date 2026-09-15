import { createLink } from "./util.js";

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diretorio = process.argv[2];

dotenv.config({
    path: path.join(
        __dirname,
        `.env.${process.env.NODE_ENV}`
    )
});

const PORT = process.env.PORT ?? 3333;

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204);
        res.end();
        return;
    }
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    if (req.url === "/") {

        fs.readdir(diretorio, (err, files) => {

            if (err) {
                console.log(err);
                res.end("Erro ao ler diretório");
                return;
            }

            files.forEach(file => {
                res.write(createLink(file));
            });

            res.end();
        });

    } else {

        const pathArquivo = path.join(
            diretorio,
            req.url.substring(1)
        );

        fs.readFile(pathArquivo, (err, file) => {

            if (err) {
                console.error("Error reading file:", err);
                res.end("Erro ao ler arquivo");
                return;
            }
            res.write(`<a href="/">Voltar</a><br><br>`);
            res.write(file);
            res.end();
        });
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});