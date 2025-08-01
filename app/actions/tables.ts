"use server";

import mysql from "mysql2/promise";
import { Connection } from "@/types/connection";

export async function getMysqlTables(connection: Connection): Promise<{
  success: boolean;
  tables?: { name: string; count: number }[];
  message?: string;
}> {
  try {
    if (connection.type !== "mysql") {
      return {
        success: false,
        message: "Only MySQL connections are supported for table listing.",
      };
    }

    if (!connection.host || !connection.user || !connection.database) {
      return {
        success: false,
        message:
          "Missing required MySQL connection details (host, user, database).",
      };
    }

    const mysqlConnection = await mysql.createConnection({
      host: connection.host,
      port: connection.port,
      user: connection.user,
      password: connection.password,
      database: connection.database,
    });

    const [rows] = await mysqlConnection.execute("SHOW TABLES");
    const tableNames = (rows as unknown[]).map(
      (row) => Object.values(row as Record<string, unknown>)[0]
    ) as string[];

    const tablesWithCounts: { name: string; count: number }[] = [];
    for (const tableName of tableNames) {
      const [countRows] = await mysqlConnection.execute(
        `SELECT COUNT(*) FROM \`${tableName}\``
      );
      const count = Object.values(
        (countRows as mysql.RowDataPacket[])[0] as Record<string, number>
      )[0] as number;
      tablesWithCounts.push({ name: tableName, count });
    }

    await mysqlConnection.end();

    return { success: true, tables: tablesWithCounts };
  } catch (error) {
    console.error("Error fetching MySQL tables:", error);
    return {
      success: false,
      message: `Failed to fetch tables: ${(error as Error).message}`,
    };
  }
}
