
const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const Repository = require("../repositories/projetoRepository");

describe("Testes do projetoRepository", () => {

    let db;
    let projetoRepository;

    beforeEach(() => {
        db = new Database(":memory:");

        const schema = fs.readFileSync(
            path.join(__dirname, "../../db/schema.sql"),
            "utf-8"
        );

        db.exec(schema);

        projetoRepository = new Repository(db);
    });

    afterEach(() => {
        db.close();
    });

    describe("criar()", () => {

        it("deve cadastrar um projeto válido", async () => {
            const projeto = {
                titulo: "Desenvolvimento de site",
                descricao: "Criacao de um site para uma pequena empresa.",
                categoria: "desenvolvimento_web",
                habilidades_requeridas: "HTML, CSS e JavaScript",
                orcamento: 1500,
                prazo: 30
            };

            const resultado = await projetoRepository.criar(projeto);

            assert.ok(resultado.id);
            assert.strictEqual(resultado.titulo, projeto.titulo);
            assert.strictEqual(resultado.status, "aberto");
        });

        it("deve rejeitar um projeto com título menor que 5 caracteres", async () => {
            const projeto = {
                titulo: "Site",
                descricao: "Criacao de um site para uma pequena empresa.",
                categoria: "desenvolvimento_web",
                orcamento: 1500,
                prazo: 30
            };

            await assert.rejects(
                projetoRepository.criar(projeto),
                /CHECK constraint failed/
            );
        });

    });

});
