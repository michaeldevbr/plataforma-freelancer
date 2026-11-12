const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const RAIZ = path.join(__dirname, "..", "..");
const CAMINHO_SCHEMA = path.join(RAIZ, "db", "schema.sql");
const CAMINHO_BANCO_PADRAO = path.join(RAIZ, "banco.db");

function abrirBanco(caminho = CAMINHO_BANCO_PADRAO) {
    const db = new Database(caminho);
    db.exec(fs.readFileSync(CAMINHO_SCHEMA, "utf-8"));
    return db;
}

module.exports = { abrirBanco };