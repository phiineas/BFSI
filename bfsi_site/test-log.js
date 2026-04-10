const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs.txt');
const entry = `[${new Date().toISOString()}] [test_MANUAL_LOG] The logging system is working! You will see real GA4 logs here as soon as you send a message to the chatbot in your browser.\n${'-'.repeat(50)}\n`;

try {
    fs.appendFileSync(logPath, entry);
    console.log('Successfully wrote to: ' + logPath);
} catch (err) {
    console.error('Failed to write log:', err);
}
