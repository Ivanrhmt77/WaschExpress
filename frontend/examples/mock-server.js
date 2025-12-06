const http = require("http");

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

const sampleQueue = [
  { kilos: 15, remaining_minutes: 40 },
  { kilos: 12 },
  { kilos: 9, remaining_minutes: 0 },
  { kilos: 20 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/queue" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(sampleQueue));
    return;
  }

  if (req.url === "/predict" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        const processing = Number(parsed.processing_slot_min ?? 0);
        const wait = Number(parsed.wait_min ?? 0);
        const total_time_min = Math.round(processing + wait + 100);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({ total_time_min }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
