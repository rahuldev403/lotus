// Simple entrypoint shim for Render environments that default to `node index.js`
// Our real server is at backend/src/server.js (ESM). Use dynamic import to execute it.
(async () => {
  try {
    await import("./backend/src/server.js");
  } catch (err) {
    console.error("Failed to start server from backend/src/server.js", err);
    process.exit(1);
  }
})();
