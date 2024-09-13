document.addEventListener('DOMContentLoaded', function() {
    // Toggle review (Read more / Read less)
    const reviewLinks = document.querySelectorAll('.review-card a');
    reviewLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            toggleReview(this);
        });
    });

    // Handle the review form submission
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('movieTitle').value;
        const review = document.getElementById('movieReview').value;
        const rating = document.querySelector('input[name="rating"]:checked');

        if (!rating) {
            alert("Please select a star rating!");
            return;
        }

        const starRating = rating.value;
        addReview(title, review, starRating);
        reviewForm.reset(); // Reset the form after submission
    });

    // Add event listener for search functionality
    document.getElementById('searchButton').addEventListener('click', function() {
        searchReviews();
    });

    // Trigger search on 'Enter' key
    document.getElementById('searchInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchReviews();
        }
    });
});

// Function to toggle between full review and short review
function toggleReview(link) {
    const fullReview = link.previousElementSibling;
    const shortReview = fullReview.previousElementSibling;

    if (fullReview.style.display === "none" || fullReview.style.display === "") {
        fullReview.style.display = "inline";
        shortReview.style.display = "none";
        link.textContent = "Read less";
    } else {
        fullReview.style.display = "none";
        shortReview.style.display = "inline";
        link.textContent = "Read more";
    }
}

// Function to add a new review to the review section
function addReview(title, review, starRating) {
    const reviewSection = document.getElementById('reviewSection');
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');

    // Generate star rating HTML
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= starRating ? '<span class="star filled">★</span>' : '<span class="star">★</span>';
    }

    // Add new review card HTML
    newReview.innerHTML = `
        <img src="images/movie-poster.jpg" alt="Movie Poster">
        <div class="review-content">
            <h3>${title}</h3>
            <p>
                <span class="short-review">${review.substring(0, 100)}...</span>
                <span class="full-review" style="display: none;">${review}</span>
                <a href="#" class="read-more">Read more</a>
            </p>
            <div class="star-rating">
                <span>Rating:</span>
                <span class="stars">${starsHTML}</span>
            </div>
            <div class="vote">
                <button onclick="likeReview(this)">👍 <span class="like-count">0</span></button>
                <button onclick="dislikeReview(this)">👎 <span class="dislike-count">0</span></button>
            </div>
        </div>
    `;

    // Append the new review card to the review section
    reviewSection.appendChild(newReview);

    // Reattach event listener for the new "Read more" link
    const newReadMoreLink = newReview.querySelector('.read-more');
    newReadMoreLink.addEventListener('click', function(event) {
        event.preventDefault();
        toggleReview(this);
    });
}

// Function to handle search functionality
function searchReviews() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const reviewCards = document.querySelectorAll('.review-card');

    reviewCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = 'flex'; // Show matching reviews
        } else {
            card.style.display = 'none'; // Hide non-matching reviews
        }
    });
}

// Function to like a review
function likeReview(button) {
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

// Function to dislike a review
function dislikeReview(button) {
    const dislikeCount = button.querySelector('.dislike-count');
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
}
