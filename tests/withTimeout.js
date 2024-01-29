function withTimeout(promise, timeoutDuration) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, timeoutDuration);

        promise.then(resolve, reject).finally(() => clearTimeout(timeout));
    });
}

module.exports = withTimeout;