const twilio = require('twilio');

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
