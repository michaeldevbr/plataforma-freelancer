
const { describe, it } = require("node:test");
const assert = require("node:assert");

const projetoService = require("../services/projetoService");

describe("Testes do projetoService", () => {

    it("deve rejeitar um título curto", async () => {
        const projeto = {
            titulo: "Site",
            descricao: "Criacao de um site para uma pequena empresa.",
            categoria: "desenvolvimento_web",
            orcamento: 1500,
            prazo: 30
        };

        await assert.rejects(
            projetoService.cadastrarProjeto(projeto),
            /CHECK constraint failed/
        );
    });

    it("deve rejeitar orçamento negativo", async () => {
        const projeto = {
            titulo: "Desenvolvimento de site",
            descricao: "Criacao de um site para uma pequena empresa.",
            categoria: "desenvolvimento_web",
            orcamento: -100,
            prazo: 30
        };

        await assert.rejects(
            projetoService.cadastrarProjeto(projeto),
            /CHECK constraint failed/
        );
    });

});
