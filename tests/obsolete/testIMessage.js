import { runAppleScript } from 'run-applescript';

(async () => {
    const result = await runAppleScript(`do shell script "sqlite3 ~/Library/Messages/chat.db 'select text from message order by date desc limit 1;'"`);
    const match = result.match(/\d{6}/);
    console.log(match[0]);
    return match ? match[0] : null;
    
})();