import { config } from "./config.js";
import { startService } from "./manage.js";
import { serve } from "./combine/serve.js";

await serve(config.startPort, "manage.js");

startService(config.startServicePath);
