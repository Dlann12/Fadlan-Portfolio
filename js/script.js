// ==================== MOBILE MENU ====================

const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");

// Membuat tombol hamburger
const menuButton = document.createElement("button");

menuButton.innerHTML = "☰";
menuButton.classList.add("menu-button");

nav.insertBefore(menuButton, navLinks);


// Membuka / menutup menu
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuButton.innerHTML = "✕";
    } else {
        menuButton.innerHTML = "☰";
    }
});


// Menutup menu ketika link diklik
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.innerHTML = "☰";
    });
});


// ==================== BACK TO TOP ====================

// Membuat tombol Back to Top
const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";
backToTop.classList.add("back-to-top");

document.body.appendChild(backToTop);


// Menampilkan tombol ketika scroll
window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


// Kembali ke bagian paling atas
backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ==================== TYPING EFFECT ====================

const typingText = document.querySelector("#typing-text");

const texts = [
    "Web Developer",
    "Machine Learning Enthusiast",
    "Software Engineer",
    "Graphic Designer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    // Jika kata sudah selesai diketik
    if (!isDeleting && charIndex > currentText.length) {
        typingSpeed = 1500;
        isDeleting = true;
    }

    // Jika kata sudah selesai dihapus
    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        textIndex++;

        if (textIndex >= texts.length) {
            textIndex = 0;
        }

        charIndex = 0;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ==================== SCROLL ANIMATION ====================

const animatedElements = document.querySelectorAll(
    ".about-content, .skill-card, .project-card, .contact-content"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });
    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});

// ==================== ACTIVE NAVIGATION ====================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navItems.forEach((item) => {

        item.classList.remove("active");

        if (item.getAttribute("href") === `#${currentSection}`) {
            item.classList.add("active");
        }

    });

});
