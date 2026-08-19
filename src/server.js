const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const PORT = 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

app.use(express.static("public"));

app.post("/test-webhook", (req, res) => {
    const payload = {
        event: "stock_update",
        sku: "SKU-1023",
        stock: 25
    };

    const rawBody = JSON.stringify(payload);

    const signature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(rawBody)
        .digest("hex");

    res.json({
        payload,
        signature
    });
});

app.use(
    express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        }
    })
);

app.post("/webhook", (req, res) => {
    const receivedSignature = req.headers["x-webhook-signature"];

    if (!receivedSignature) {
        return res.status(401).json({
            error: "Missing webhook signature"
        });
    }

    const expectedSignature = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(req.rawBody)
        .digest("hex");

    if (receivedSignature !== expectedSignature) {
        return res.status(401).json({
            error: "Invalid webhook signature"
        });
    }

    console.log("Verified webhook received:");
    console.log(req.body);

    res.status(200).json({
        verified: true
    });
});

app.listen(PORT, () => {
    console.log(
        `Webhook verification prototype running on http://localhost:${PORT}`
    );
});