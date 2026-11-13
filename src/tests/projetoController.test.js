
const { describe, it } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../app");

describe("Testes do projetoController", () => {

    it("GET deve listar os projetos", async () => {
        const resposta = await request(app).get("/projetos");

        assert.strictEqual(resposta.status, 200);
        assert.ok(Array.isArray(resposta.body));
    });

    it("POST deve rejeitar um projeto inválido", async () => {
        const resposta = await request(app)
            .post("/projetos")
            .send({
                titulo: "Site",
                descricao: "Criacao de um site para uma pequena empresa.",
                categoria: "desenvolvimento_web",
                orcamento: 1500,
                prazo: 30
            });

        assert.strictEqual(resposta.status, 400);
    });

});
