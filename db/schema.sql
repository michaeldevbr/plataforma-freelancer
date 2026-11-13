CREATE TABLE IF NOT EXISTS projetos (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
 
    titulo                TEXT NOT NULL CHECK (length(titulo) >= 5),
    descricao             TEXT NOT NULL CHECK (length(descricao) >= 30),
    categoria             TEXT NOT NULL CHECK (categoria IN (
                              'desenvolvimento_web',
                              'desenvolvimento_mobile',
                              'design_grafico',
                              'ui_ux',
                              'redacao_copywriting',
                              'traducao',
                              'marketing_digital',
                              'edicao_video',
                              'analise_dados'
                          )),
    habilidades_requeridas TEXT,
 
    orcamento             REAL    NOT NULL CHECK (orcamento > 0), 
    prazo_dias            INTEGER NOT NULL CHECK (prazo_dias > 0),
   
    status                TEXT NOT NULL DEFAULT 'aberto'
                          CHECK (status IN ('aberto', 'em_andamento', 'concluido', 'cancelado')),
    criado_em             TEXT NOT NULL DEFAULT (datetime('now'))
);
 
CREATE INDEX IF NOT EXISTS idx_projetos_categoria ON projetos (categoria);
CREATE INDEX IF NOT EXISTS idx_projetos_status    ON projetos (status);
 