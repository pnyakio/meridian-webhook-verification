const statusMessage = document.getElementById("status-message");
const sendButton = document.getElementById("send-webhook");

sendButton.addEventListener("click", async () => {
    statusMessage.textContent = "Sending test webhook...";

    try {
        // Ask the server to create a properly signed test webhook
        const testResponse = await fetch("/test-webhook", {
            method: "POST"
        });

        const testData = await testResponse.json();

        // Send the signed webhook to the real verification endpoint
        const webhookResponse = await fetch("/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-webhook-signature": testData.signature
            },
            body: JSON.stringify(testData.payload)
        });

        const webhookData = await webhookResponse.json();

        if (webhookResponse.ok) {
            statusMessage.textContent =
                "✓ Webhook verified successfully";
        } else {
            statusMessage.textContent =
                `✕ Webhook rejected: ${webhookData.error}`;
        }

    } catch (error) {
        statusMessage.textContent =
            "✕ Could not connect to the server";

        console.error(error);
    }
});