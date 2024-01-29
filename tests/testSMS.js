const twilio = require('twilio');
const accountSid = 'AC55f78fa0f950723a25e41648f3ce8d7e';
const authToken = '6039b4a71348bd062e0c450f6868bedf';
const client = twilio(accountSid, authToken);

function getFirst6DigitsFromMessages() {
    return client.messages.list({ limit: 5 })
        .then(messages => {
            return messages.map(m => {
                const match = m.body.match(/\d{6}/);
                return match ? match[0] : null;
            }).filter(m => m !== null); // Filters out messages without a 6-digit number
        })
        .catch(error => {
            console.error(error);
            throw error; // Re-throw the error for the caller to handle
        });
}

// Usage example
getFirst6DigitsFromMessages()
    .then(digitsArray => {
        console.log('First 6 Digits from Each Message:', digitsArray[0]);
    })
    .catch(error => {
        console.log('Error:', error);
    });
