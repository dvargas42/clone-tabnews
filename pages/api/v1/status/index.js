import database from "infra/database.js";

async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const queries = await Promise.all([
    database.query("SHOW server_version;"),
    database.query("SHOW max_connections;"),
    database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    }),
  ]);

  const resultVersion = queries[0].rows[0].server_version;
  const resultMaxConnections = queries[1].rows[0].max_connections;
  const resultOpennedConnections = queries[2].rows[0].count;

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: resultVersion,
        max_connections: parseInt(resultMaxConnections),
        opened_connections: resultOpennedConnections,
      },
    },
  });
}

export default status;

// versao do Postgres
// conexoes maximas
// conexoes usada
