const API_URL = "https://gopizza-backend.onrender.com";

// Fetch and display restaurants
function fetchRestaurants() {
    fetch(`${API_URL}/restaurants`)
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("restaurantList");
            list.innerHTML = "";

            data.forEach(r => {
                let div = document.createElement("div");
                div.className = "restaurant-item";
                div.innerHTML = `
                    <span>${r.name} - <a href="${r.zomatoUrl}" target="_blank">View on Zomato</a> 
                    <span class="rating" id="rating-${r.id}">Loading...</span></span>
                `;
                list.appendChild(div);

                // Fetch ratings from API
                fetch(`${API_URL}/ratings/${r.id}`)
                    .then(res => res.json())
                    .then(ratingData => {
                        let ratingElem = document.getElementById(`rating-${r.id}`);
                        if (ratingData.ratings) {
                            ratingElem.textContent = `⭐ Dine-in: ${ratingData.ratings.dine_in} | Delivery: ${ratingData.ratings.delivery}`;
                        } else {
                            ratingElem.textContent = "No ratings available";
                        }
                    })
                    .catch(() => {
                        document.getElementById(`rating-${r.id}`).textContent = "Failed to load";
                    });
            });
        })
        .catch(error => console.error("Error fetching restaurants:", error));
}

fetchRestaurants();
