import { initDatabase, isWeb } from "./db";

export async function initializeDatabase() {
  const db = await initDatabase();

  try {
    if (isWeb) {
      // sql.js: comandos síncronos, sem async/await
      db.run(`DROP TABLE IF EXISTS sensor_data;`);
      db.run(`
        CREATE TABLE sensor_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          formulario TEXT,
          numero_pergunta INTEGER,
          sensor TEXT,
          eixo_x REAL,
          eixo_y REAL
        );
      `);
      console.log("Tabela sensor_data criada com sucesso (Web).");
    } else {
      // expo-sqlite: usar withTransactionAsync e runAsync
      await db.withTransactionAsync(async () => {
        await db.runAsync(`DROP TABLE IF EXISTS sensor_data;`);
        await db.runAsync(`
          CREATE TABLE sensor_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            formulario TEXT,
            numero_pergunta INTEGER,
            sensor TEXT,
            eixo_x REAL,
            eixo_y REAL
          );
        `);
      });
      console.log("Tabela sensor_data criada com sucesso (Mobile).");
    }
  } catch (error) {
    console.error("Erro ao resetar/criar a tabela:", error);
  }
}