
const { describe, it } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../app");

describe("Testes das rotas", () => {

    it("GET / deve apresentar o sistema", async () => {
        const resposta = await request(app).get("/");

        assert.strictEqual(resposta.status, 200);
    });

    it("POST /projetos deve cadastrar um projeto válido", async () => {
        const resposta = await request(app)
            .post("/projetos")
            .send({
                titulo: "Desenvolvimento de site",
                descricao: "Criacao de um site para uma pequena empresa.",
                categoria: "desenvolvimento_web",
                orcamento: 1500,
                prazo: 30
            });

        assert.strictEqual(resposta.status, 201);
        assert.ok(resposta.body.id);
    });

});
