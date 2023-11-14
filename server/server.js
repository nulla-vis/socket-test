// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const port = 3000;


// Use cors middleware for Express
app.use(cors());

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
 

// Sample orders data
let orders = [
    { id: 1001, status: "ready_for_pickup" },
    { id: 1002, status: "ready_for_pickup" },
    { id: 1003, status: "ready_for_pickup" },
    { id: 1004, status: "ready_for_pickup" },
    { id: 1005, status: "ready_for_pickup" },
    { id: 1006, status: "ready_for_pickup" },
    { id: 1007, status: "ready_for_pickup" },
    { id: 1008, status: "ready_for_pickup" },
    { id: 1009, status: "ready_for_pickup" },
    { id: 2214, status: "ready_for_pickup" },
    { id: 2216, status: "in_progress" },
    { id: 2230, status: "in_progress" },
    { id: 2255, status: "in_progress" },
    { id: 2260, status: "in_progress" },
    { id: 2271, status: "in_progress" },
    { id: 2288, status: "in_progress" },
    { id: 2298, status: "in_progress" },
    { id: 3131, status: "in_progress" },
    { id: 3233, status: "in_progress" },
    { id: 3411, status: "in_progress" },
    { id: 3567, status: "in_progress" },
    { id: 3900, status: "in_progress" },
    { id: 4123, status: "in_progress" },
    { id: 4222, status: "in_progress" },
    { id: 4444, status: "in_progress" },
    { id: 4790, status: "in_progress" },
    { id: 4891, status: "in_progress" },
    { id: 4900, status: "in_progress" },
    { id: 5010, status: "in_progress" },
    { id: 5555, status: "in_progress" },
    // Add more orders as needed
];




io.on("connection", socket => {
    console.log("Client connected");

    // Send initial orders to the client
    socket.emit("initialOrders", orders);

    // Listen for order status updates from the client
    socket.on("updateOrderStatus", ({ orderId, newStatus }) => {
        // Update the order status
        const orderIndex = orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;

            // Broadcast the updated orders to all connected clients
            io.emit("updatedOrders", orders);
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

function updateOrderStatus() {
    const inProgressOrders = orders.filter(order => order.status === "in_progress");

    if (inProgressOrders.length > 0) {
        // Randomly select an order from the in-progress orders
        const randomIndex = Math.floor(Math.random() * inProgressOrders.length);
        const randomInProgressOrder = inProgressOrders[randomIndex];

        // Update the status of the randomly selected order
        randomInProgressOrder.status = "ready_for_pickup";
    }

    // Emit the updated orders to all connected clients
    io.emit("updatedOrders", orders);

    // Schedule the next update after 5 seconds
    setTimeout(() => {
        updateOrderStatus();
    }, 5000);
}

function updateOrderStatusReady() {
    const readyForPickupOrders = orders.filter(order => order.status === "ready_for_pickup");

    if (readyForPickupOrders.length > 0) {
        // Randomly select an order from the ready-for-pickup orders
        const randomIndex = Math.floor(Math.random() * readyForPickupOrders.length);
        const randomReadyForPickupOrder = readyForPickupOrders[randomIndex];

        // Update the status of the randomly selected order
        randomReadyForPickupOrder.status = "completed";
    }

    io.emit("updatedOrders", orders);

    // Schedule the next update after 4 seconds (adjust as needed)
    setTimeout(() => {
        updateOrderStatusReady();
    }, 4000);
}

updateOrderStatus();
updateOrderStatusReady();

server.listen(port, () => {
    console.log(`SERVER START`)
    console.log(`Server is running at http://localhost:${port}`);
});
