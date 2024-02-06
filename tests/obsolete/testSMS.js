const twilio = require('twilio');
// env variables
const TWILIO_ACCOUNT_SID=process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN=process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER=process.env.TWILIO_PHONE_NUMBER

const CREDIT_CARD=process.env.CREDIT_CARD
const EXPIRATION=process.env.EXPIRATION
const CVV=process.env.CVV


// Twilio account SID and Auth Token
const accountSid = 'AC55f78fa0f950723a25e41648f3ce8d7e';
const authToken = '6039b4a71348bd062e0c450f6868bedf';

console.log(TWILIO_ACCOUNT_SID);
console.log(accountSid);
console.log(TWILIO_AUTH_TOKEN);
console.log(authToken);

// Initialize Twilio client
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
