const { describe, it } = require("node:test");
const assert = require("node:assert");

const projetoService = require("../services/projetoService");

const projetoValido = {
    titulo: "Desenvolvimento de site",
    descricao: "Criacao de um site para uma pequena empresa.",
    categoria: "desenvolvimento_web",
    orcamento: 1500,
    prazo: 30
};

describe("Testes do projetoService", () => {

    it("deve cadastrar um projeto válido", async () => {
        const resultado = await projetoService.cadastrarProjeto({
            ...projetoValido,
            titulo: "  Desenvolvimento de site  "
        });

        assert.ok(resultado.id);
        assert.strictEqual(resultado.titulo, "Desenvolvimento de site");
        assert.strictEqual(resultado.status, "aberto");
    });

    it("deve rejeitar um título curto", async () => {
        await assert.rejects(
            projetoService.cadastrarProjeto({ ...projetoValido, titulo: "Site" }),
            /título deve ter pelo menos 5 caracteres/
        );
    });

    it("deve rejeitar um título sem letras", async () => {
        await assert.rejects(
            projetoService.cadastrarProjeto({ ...projetoValido, titulo: "12345" }),
            /título deve conter pelo menos uma letra/
        );
    });

    it("deve rejeitar orçamento negativo", async () => {
        await assert.rejects(
            projetoService.cadastrarProjeto({ ...projetoValido, orcamento: -100 }),
            /orçamento deve ser um número maior que zero/
        );
    });

    it("deve rejeitar uma categoria inexistente", async () => {
        await assert.rejects(
            projetoService.cadastrarProjeto({ ...projetoValido, categoria: "culinaria" }),
            /Categoria inválida/
        );
    });

});
