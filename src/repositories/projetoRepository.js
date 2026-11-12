const COLUNAS = `
    id,
    titulo,
    descricao,
    categoria,
    habilidades_requeridas,
    orcamento,
    prazo_dias AS prazo,
    status,
    criado_em
`;

class projetoRepository {

    constructor(db) {
        this.db = db;
    }

    async criar(projeto) {
        const {
            titulo,
            descricao,
            categoria,
            habilidades_requeridas,
            orcamento,
            prazo,
            status,
        } = projeto;

        const resultado = this.db
            .prepare(
                `INSERT INTO projetos
                    (titulo, descricao, categoria, habilidades_requeridas,
                     orcamento, prazo_dias, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            )
            .run(
                titulo,
                descricao,
                categoria,
                habilidades_requeridas || null,
                orcamento,
                prazo,
                status || "aberto"
            );

        return this.buscarPorId(resultado.lastInsertRowid);
    }

    async buscarPorId(id) {
        return this.db
            .prepare(`SELECT ${COLUNAS} FROM projetos WHERE id = ?`)
            .get(id);
    }

    async listar({ categoria, status } = {}) {
        const condicoes = [];
        const valores = [];

        if (categoria) {
            condicoes.push("categoria = ?");
            valores.push(categoria);
        }
        if (status) {
            condicoes.push("status = ?");
            valores.push(status);
        }

        const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";

        return this.db
            .prepare(`SELECT ${COLUNAS} FROM projetos ${where} ORDER BY id`)
            .all(...valores);
    }
}

module.exports = projetoRepository;