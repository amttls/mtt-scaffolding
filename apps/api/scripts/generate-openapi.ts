import fs from "fs/promises";
import path from "path";
import app from "../src/app";
import { logger } from "@repo/logger";
import packageJSON from "../package.json" with { type: "json" };

async function generateOpenAPI() {
  try {
    // Get the OpenAPI spec from the app with config
    const spec = app.getOpenAPIDocument({
      openapi: "3.0.0",
      info: {
        version: packageJSON.version,
        title: "MTT API",
      },
    });

    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), "dist");
    await fs.mkdir(outputDir, { recursive: true });

    // Write the spec to a file
    const outputPath = path.join(outputDir, "openapi.json");
    await fs.writeFile(outputPath, JSON.stringify(spec, null, 2));

    logger.info(`OpenAPI spec generated at: ${outputPath}`);
  } catch (error) {
    logger.error("Failed to generate OpenAPI spec:", error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}

generateOpenAPI();
