
export async function setAutoCompleteValue(page) {
    // Check if the page object is provided
    if (!page) {
        throw new Error('No page object provided');
    }
    
    // Creating a list where each element is an array of two items
    let myList = [
        ["given-name", "Cheng"],
        ["family-name", "Qian"],
        ["organization", "PayPal"],
        ["tel", "12167789212"], // Wei PayPal // "12135752832" //  Twilio // PayPal // 14087660981 // google voice //"18887021141" // Twilio
        ["address-line1", "5827 Northland Ter"],
        ["address-line2", " "],
        ["address-level2", "Fremont"],
        ["postal-code", "94555"],
        ["country", "US"],
        ["address-level1", "CA"]
    ];

    return (async function() {
        const timeoutDuration = 100; // Set your desired timeout duration in milliseconds

        async function withTimeout(promise) {
            let timeout = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Operation timed out')), timeoutDuration);
            });
            return Promise.race([promise, timeout]);
        }

        for (let pair of myList) {
            try {
                await withTimeout(page.fill(`input[autocomplete="${pair[0]}"]`, `${pair[1]}`));
                } catch (e) {
                console.error(`failed to enter "${pair[0]}"`);
            };
            try {
                await withTimeout(page.selectOption(`select[autocomplete="${pair[0]}"]`, `${pair[1]}`));
                } catch (e) {
                console.error(`failed to set option "${pair[0]}"`);
            };
        }
    })();

}

// module.exports = setAutoCompleteValue;
