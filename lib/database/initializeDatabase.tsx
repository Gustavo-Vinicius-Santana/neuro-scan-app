import { db } from "./db";

export async function initializeDatabase() {
  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DROP TABLE IF EXISTS sensor_data;`);
      await db.runAsync(
        `CREATE TABLE sensor_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          formulario TEXT,
          numero_pergunta INTEGER,
          sensor TEXT,
          eixo_x REAL,
          eixo_y REAL
        );`
      );
    });
    console.log("Tabela sensor_data criada com sucesso.");
  } catch (error) {
    console.error("Erro ao resetar/criar a tabela:", error);
  }
}