const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "CleanAdsSurf API is running" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 CleanAdsSurf API server running at http://localhost:${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   POST   /api/auth/signup`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/auth/me`);
  console.log(`   GET    /health`);
  console.log(`\n⚠️  Dummy credentials for testing:`);
  console.log(`   Username: admin`);
  console.log(`   Password: admin\n`);
});
