async function loadRestaurants() {
    try {
        const response = await fetch("https://gopizza-backend.onrender.com/restaurants"); 

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const restaurants = await response.json();
        console.log("Fetched Restaurants:", restaurants); // Debugging
        displayRestaurants(restaurants);
    } catch (error) {
        console.error("Error loading restaurants:", error);
    }
}

async function loadRatings(restaurantId, listItem) {
    try {
        const response = await fetch(`https://gopizza-backend.onrender.com/ratings/${restaurantId}`); 

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Ratings:", data); // Debugging

        if (data.ratings) {
            listItem.innerHTML += ` - ⭐ ${data.ratings.dine_in} (Dine-In), ⭐ ${data.ratings.delivery} (Delivery)`;
        } else {
            listItem.innerHTML += " - Ratings unavailable";
        }
    } catch (error) {
        console.error("Error loading ratings:", error);
        listItem.innerHTML += " - Failed to load ratings";
    }
}

function displayRestaurants(restaurants) {
    const list = document.getElementById("restaurant-list");
    list.innerHTML = "";

    restaurants.forEach(restaurant => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${restaurant.name} - <a href="${restaurant.zomatoUrl}" target="_blank">View on Zomato</a>
        `;
        list.appendChild(item);

        // Fetch ratings and update the item
        loadRatings(restaurant.id, item);
    });
}

// Load restaurants when the page loads
document.addEventListener("DOMContentLoaded", loadRestaurants);
