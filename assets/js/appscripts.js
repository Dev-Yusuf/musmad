// Initialize AOS library
AOS.init();

// Navbar scroll effect and hamburger menu functionality
const nav = document.querySelector('nav');
const hero = document.querySelector('.hero');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > hero.offsetHeight - nav.offsetHeight) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// Product Data for the native clothing section
document.addEventListener('DOMContentLoaded', function() {
    const productData = [
        {
            id: 1,
            title: "Elegant Agbada",
            images: ["./assets/img/native3.jpg", "./assets/img/native4.jpg", "./assets/img/native5.jpg"]
        },
        {
            id: 2,
            title: "Classic Native Dress",
            images: ["./assets/img/agba1.jpg", "./assets/img/agbada2.jpg", "./assets/img/agbada3.jpg"]
        },
        {
            id: 3,
            title: "Royal Native Dress",
            images: ["./assets/img/native_dress1.jpg", "./assets/img/native_dress2.jpg", "./assets/img/native_dress3.jpg"]
        },
        {
            id: 4,
            title: "Noble Traditional Wear",
            images: ["./assets/img/native_dress1.jpg", "./assets/img/native_dress2.jpg", "./assets/img/native_dress3.jpg"]
        },
    ];

    // Lightbox and product grid functionality
    const productGrid = document.getElementById('product-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevImage = document.getElementById('prev-image');
    const nextImage = document.getElementById('next-image');

    let currentProductId;
    let currentImageIndex;

    function createProductCard(product) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-buttons">
                    <button class="view-more" data-product-id="${product.id}">View More</button>
                    <button class="buy-now">Buy Now</button>
                </div>
            </div>
        `;
        return productItem;
    }

    function loadProducts() {
        productData.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    function openLightbox(productId, imageIndex = 0) {
        const product = productData.find(p => p.id === productId);
        if (product) {
            currentProductId = productId;
            currentImageIndex = imageIndex;
            lightboxImage.src = product.images[currentImageIndex];
            lightbox.style.display = 'block';
        }
    }

    function closeLightboxFn() {
        lightbox.style.display = 'none';
    }

    function showNextImage() {
        const product = productData.find(p => p.id === currentProductId);
        currentImageIndex = (currentImageIndex + 1) % product.images.length;
        lightboxImage.src = product.images[currentImageIndex];
    }

    function showPrevImage() {
        const product = productData.find(p => p.id === currentProductId);
        currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        lightboxImage.src = product.images[currentImageIndex];
    }

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-more')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            openLightbox(productId);
        } else if (e.target.classList.contains('buy-now')) {
            alert('This feature is coming soon!'); // Placeholder action
        }
    });

    closeLightbox.addEventListener('click', closeLightboxFn);
    nextImage.addEventListener('click', showNextImage);
    prevImage.addEventListener('click', showPrevImage);

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFn();
        }
    });

    // Load products when the page is fully loaded
    loadProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    services.forEach(service => {
        service.style.opacity = '0';
        service.style.transform = 'translateY(30px)';
        service.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(service);
    });
});

    // JavaScript remains unchanged
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    
    function updateTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        indicators[i].classList.remove('active');
      });
      testimonials[index].classList.add('active');
      indicators[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonial(currentIndex);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        updateTestimonial(i);
        currentIndex = i;
      });
    });
    
    // Initialize first testimonial
    updateTestimonial(currentIndex);

    (function() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        const searchInput = document.getElementById('search-input');
        const faqList = document.getElementById('faq-list');
        const notFound = document.querySelector('.not-found');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
                const answer = question.nextElementSibling;
                answer.classList.toggle('active');
            });
        });

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            let found = false;

            faqList.querySelectorAll('.faq-item').forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    found = true;
                } else {
                    item.style.display = 'none';
                }
            });

            notFound.style.display = 'block';
        });
    })();

    function showCategory(category) {
        document.querySelectorAll('.category-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelectorAll('.category-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');
        document.getElementById(category + '-button').classList.add('active');
    }

    window.onload = function() {
        showCategory('natives');
    };