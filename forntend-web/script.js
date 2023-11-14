// script.js
document.addEventListener("DOMContentLoaded", () => {
    const ordersContainer = document.getElementById("orders-container");
    const socket = io("http://localhost:3000/");

    let ordersArray = [];

    // Fetch orders from the server
    socket.on("initialOrders", initialOrders => {
        if (initialOrders.length > 0) {
            // for (i = 1; i <= initialOrders.length; i++) {
            //     let order = initialOrders[i-1]
            //     ordersArray.push(order)
            // }
            ordersArray = initialOrders;
        }
        displayOrders(ordersArray);
    });

    // Listen for real-time updates
    // socket.on("updatedOrders", updatedOrders => {
    //     // Clear the existing orders
    //     ordersContainer.innerHTML = "";
    //     displayOrders("All Orders", updatedOrders);
    // });

    // Example: Simulate order status change
    setTimeout(() => {
        const orderId = 1;
        const newStatus = "in process";

        // Emit the order status change to the server
        socket.emit("updateOrderStatus", { orderId, newStatus });
    }, 5000);

    socket.on("updatedOrders", updatedOrders => {
        // Update the displayed orders
        displayOrders(updatedOrders);
    });

    function displayOrders(orders) {
        let preparing1 = document.getElementById("preparing1");
        let preparing2 = document.getElementById("preparing2");
        let preparing3 = document.getElementById("preparing3");
        let ready1 = document.getElementById("ready1");
        let ready2 = document.getElementById("ready2");
        let ready3 = document.getElementById("ready3");
        let preparingCount = 1;
        let readyCount = 1;

        preparing1.innerHTML="";
        preparing2.innerHTML="";
        preparing3.innerHTML="";
        ready1.innerHTML="";
        ready2.innerHTML="";
        ready3.innerHTML="";

        if(orders.length > 0) {

            for(let i = 0; i < orders.length; i++) {
                let order = orders[i];
                // console.log(preparingCount)

                if (preparingCount <= 5 && order.status == "in_progress") {
                    preparing1.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }
                
                if ((preparingCount > 5 && preparingCount <= 10) && order.status == "in_progress") {
                    preparing2.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }

                if ((preparingCount > 10 && preparingCount <= 15) && order.status == "in_progress") {
                    preparing3.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }

                if (readyCount <= 5 && order.status == "ready_for_pickup") {
                    ready1.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }
                
                if (readyCount > 5 && readyCount <= 10 && order.status == "ready_for_pickup") {
                    ready2.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }

                if (readyCount > 10 && readyCount <= 15 && order.status == "ready_for_pickup") {
                    ready3.innerHTML += `
                    <button type="button" class="marginButton"
                        style="background-color: #fff; border: 1px solid #EBEBEB; width: 200px; height: 100px;">
                        <h1>${order.id}</h1>
                    </button>`;
                }

                if(order.status == "in_progress") {
                    preparingCount++;
                }

                if (order.status == "ready_for_pickup") {
                    readyCount++;
                }
            }
        }
    }
});
