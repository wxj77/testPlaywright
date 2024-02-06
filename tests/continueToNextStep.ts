import { expect, test } from "@playwright/test";

function continueToNextStep(page) {
    // Check if the page object is provided
    if (!page) {
        throw new Error('No page object provided');
    }
    // Select the input element and set its value to 'wei'
    
    // Creating a list where each element is an array of two items
    let myList = [
        ["check out"],
        ["continue"],
        ["place order"],
        ["confirm"]
    ];

    (async function() {
        const timeoutDuration = 10000; // Set your desired timeout duration in milliseconds

        function withTimeout(promise) {
            let timeout = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Operation timed out')), timeoutDuration);
            });
            return Promise.race([promise, timeout]);
        }

        const timeoutDuration2 = 10000;

        async function withTimeout2(promise) {
            let timeout = new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('Operation timed out')), timeoutDuration2);
            });
            return Promise.race([promise, timeout]);
        }

        for (let pair of myList) {
            try {
                await withTimeout(page.getByText(`${pair[0]}`).click());
                break;
                } catch (e) {
                console.error(`failed to "${pair[0]}"`);
                    try {
                    await withTimeout2(auto(`click on ${pair[0]} button`, { page, test }, options));
                    } catch (e) {
                    console.error(`failed to click the ${pair[0]} button`);
                    }
            };
        }
    })();

}

module.exports = continueToNextStep;
