import sqlite3
from pathlib import Path

PASTA_ANALISE = Path(__file__).resolve().parent
RAIZ = PASTA_ANALISE.parent
CAMINHO_SCHEMA = RAIZ / "db" / "schema.sql"
CAMINHO_BANCO = RAIZ / "db" / "banco.db"

def criar_banco():
    conn = sqlite3.connect(CAMINHO_BANCO)
    conn.executescript(CAMINHO_SCHEMA.read_text(encoding="utf-8"))
    total = conn.execute("SELECT COUNT(*) FROM projetos").fetchone()[0]
    conn.close()
    return total

if __name__ == "__main__":
    total = criar_banco()
    print(f"Banco pronto em: {CAMINHO_BANCO}")
    print(f"Projetos cadastrados: {total}")