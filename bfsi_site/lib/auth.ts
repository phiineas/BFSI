import fs from "fs";
import path from "path";
import os from "os";

/**
 * Ensures that Google Application Credentials are set correctly on Vercel.
 * It writes the GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable 
 * to a temporary file and sets the GOOGLE_APPLICATION_CREDENTIALS path.
 */
export function initGoogleAuth() {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
        const tempPath = path.join(os.tmpdir(), "gcp-key.json");

        // Only write if it doesn't exist or is different (optional performance optimization)
        fs.writeFileSync(tempPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);

        // Set the environment variable for the whole process
        process.env.GOOGLE_APPLICATION_CREDENTIALS = tempPath;

        return tempPath;
    }
    return null;
}
