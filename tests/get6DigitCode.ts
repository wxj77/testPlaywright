import { runAppleScript } from 'run-applescript';

export async function get6DigitCode() {

    const result = await runAppleScript(`do shell script "sqlite3 ~/Library/Messages/chat.db 'select text from message order by date desc limit 1;'"`);
    const match = result.match(/\d{6}/);
    return match ? match[0] : null;

}

// module.exports = get6DigitCode;
