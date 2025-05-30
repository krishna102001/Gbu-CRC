import "dotenv/config";
import { app } from "./server.js";

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
