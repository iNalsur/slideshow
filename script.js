// Script which makes slides change to another slide every 10 second, and also user can manually change slides by pressing dots, timer restarts when user uses manual change 

let slideIndex = 1;
let slideInterval;
showSlides(slideIndex);

function plusSlides(n) {
    clearTimeout(slideInterval)
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    clearTimeout(slideInterval)
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    const currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = "block";
    
    fadeIn(currentSlide);

    dots[slideIndex - 1].className += " active";

    slideInterval = setTimeout(function() {
        plusSlides(1);
    }, 10000);
}

function fadeIn(element) {
    let opacity = 0;
    element.style.opacity = 0;
    const animationInterval = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.05;
            element.style.opacity = opacity;
        } else {
            clearInterval(animationInterval);
        }
    }, 50);
}

slideInterval = setTimeout(function() {
    plusSlides(1);
}, 10000);

// Script which adds swipping effect to the left/right with a finger to change slide

const slideContainer = document.querySelector(".slideshow-container");

slideContainer.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});

slideContainer.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        plusSlides(1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        plusSlides(-1);
    }
}