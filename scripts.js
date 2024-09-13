document.addEventListener('DOMContentLoaded', function() {
   
    const reviewLinks = document.querySelectorAll('.review-card a');

    reviewLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            toggleReview(this);
        });
    });


    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('movieTitle').value;
        const review = document.getElementById('movieReview').value;
        addReview(title, review);
    });
});

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

function addReview(title, review) {
    const reviewSection = document.getElementById('reviewSection');
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    newReview.innerHTML = `
        <img src="images/movie-poster.jpg" alt="Movie Poster">
        <div class="review-content">
            <h3>${title}</h3>
            <p>
                <span class="short-review">${review.substring(0, 100)}...</span>
                <span class="full-review" style="display: none;">${review}</span>
                <a href="#">Read more</a>
            </p>
        </div>
    `;
    reviewSection.appendChild(newReview);
}

function searchReviews() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const fullReview = this.previousElementSibling;
        if (fullReview.style.display === 'none') {
            fullReview.style.display = 'inline';
            this.textContent = 'Read less';
        } else {
            fullReview.style.display = 'none';
            this.textContent = 'Read more';
        }
    });
});

function likeReview(button) {
    const likeCount = button.querySelector('.like-count');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
}

function dislikeReview(button) {
    const dislikeCount = button.querySelector('.dislike-count');
    dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
}


document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const movieTitle = document.getElementById("movieTitle").value;
    const movieReview = document.getElementById("movieReview").value;

    const rating = document.querySelector('input[name="rating"]:checked');
    
    if (!rating) {
        alert("Please select a star rating!");
        return;
    }

    const starRating = rating.value;

    
    const reviewElement = document.createElement("div");
    reviewElement.classList.add("review-card");


    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= starRating) {
            starsHTML += '<span class="star filled">★</span>';
        } else {
            starsHTML += '<span class="star">★</span>';
        }
    }

 
    reviewElement.innerHTML = `
        <div class="review-content">
            <h3>${movieTitle}</h3>
            <p>${movieReview}</p>
            <div class="star-rating">${starsHTML}</div>
        </div>
    `;


    document.querySelector(".reviews-list").appendChild(reviewElement);

    
    document.getElementById("reviewForm").reset();
});