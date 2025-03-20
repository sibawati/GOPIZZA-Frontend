document.getElementById("addRestaurantForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("restaurantName").value.trim();
    const zomatoUrl = document.getElementById("zomatoUrl").value.trim();

    if (!name || !zomatoUrl) {
        alert("Please enter restaurant name and Zomato URL.");
        return;
    }

    const response = await fetch("https://gopizza-backend.onrender.com/add-restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, zomatoUrl }),
    });

    const data = await response.json();

    if (data.success) {
        alert("Restaurant added successfully!");
        loadRestaurants();  // Reload restaurant list
    } else {
        alert("Failed to add restaurant. Try again.");
    }
});

async function loadRestaurants() {
    try {
        const response = await fetch("https://gopizza-backend.onrender.com/restaurants");
        const data = await response.json();

        const list = document.getElementById("restaurantList");
        list.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            list.innerHTML = "<p>No restaurants available.</p>";
            return;
        }

        data.forEach((restaurant) => {
            const item = document.createElement("li");
            item.innerHTML = `<strong>${restaurant.name}</strong> - <a href="${restaurant.zomatoUrl}" target="_blank">View on Zomato</a>`;
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Error loading restaurants:", error);
    }
}

// Load restaurants when the page loads
window.onload = loadRestaurants;
