import { Platform } from "react-native";

let db = null;
let SQL = null;
let isWeb = false;

async function initDatabase() {
  if (db) return db;

  if (Platform.OS === "web") {
    const initSqlJs = (await import("sql.js")).default;
    SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    });
    db = new SQL.Database();
    isWeb = true;
    return db;
  } else {
    const { openDatabaseSync } = require("expo-sqlite");
    db = openDatabaseSync("sensorData.db");
    isWeb = false;
    return db;
  }
}

export { initDatabase, isWeb };