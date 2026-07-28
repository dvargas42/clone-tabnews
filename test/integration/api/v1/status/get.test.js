test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  //protege contra null que convertido torna-se "1970-01-01T00:00:00.000Z"
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const database = responseBody.dependencies.database;
  expect(database.version).toBe("16.0");
  expect(database.max_connections).toBe(100);
  expect(database.opened_connections).toEqual(1);
});
