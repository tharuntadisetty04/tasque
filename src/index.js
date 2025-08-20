import app from "./app.js";
import { connectDB } from "./config/db.js";

// Configuring port
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Start the express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
