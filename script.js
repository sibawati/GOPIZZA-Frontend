const API_URL = "https://gopizza-backend.onrender.com/restaurants";

// Fetch and display restaurants with ratings
function fetchRestaurants() {
    fetch(API_URL)
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

                fetch(`https://gopizza-backend.onrender.com/ratings/${r.id}`)
                    .then(res => res.json())
                    .then(scrapedData => {
                        if (scrapedData.ratings) {
                            document.getElementById(`rating-${r.id}`).textContent = `⭐ Dine-in: ${scrapedData.ratings.dine_in} | Delivery: ${scrapedData.ratings.delivery}`;
                        } else {
                            document.getElementById(`rating-${r.id}`).textContent = "No ratings available";
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
