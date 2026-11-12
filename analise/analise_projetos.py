import sqlite3
import pandas as pd
import matplotlib.pyplot as plt

CAMINHO_BANCO = "../banco.db"

conn = sqlite3.connect(CAMINHO_BANCO)
df = pd.read_sql("SELECT * FROM projetos", conn)
conn.close()

print("Total de projetos:", len(df))
print("\nProjetos por categoria:")
print(df["categoria"].value_counts())

print("\nOrçamento médio por categoria:")
orcamento = df.groupby("categoria")["orcamento"].mean().round(2)
print(orcamento)

print("\nProjetos por status:")
print(df["status"].value_counts())

df["categoria"].value_counts().plot(kind="bar", title="Projetos por categoria")
plt.tight_layout()
plt.savefig("projetos_por_categoria.png")
plt.close()

orcamento.plot(kind="bar", title="Orçamento médio por categoria (R$)")
plt.tight_layout()
plt.savefig("orcamento_por_categoria.png")
plt.close()