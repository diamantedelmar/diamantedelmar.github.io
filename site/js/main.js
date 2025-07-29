/*
    Diamante del mar Aegean Signature Suites
    main.js
*/

document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Testimonial Slider ---
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('active');
                if (i === index) {
                    testimonial.classList.add('active');
                }
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
        showTestimonial(0); // Show the first one initially
    }

    // --- Gallery Filtering ---
    const filterContainer = document.querySelector('.gallery-filters');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    if (filterContainer && galleryItems.length > 0) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Update active button
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (item.classList.contains(filterValue.replace('.', '')) || filterValue === '*') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryGrid = document.querySelector('.gallery-grid');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        let currentImageIndex;
        let images = [];

        galleryGrid.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                images = Array.from(galleryGrid.querySelectorAll('img'));
                currentImageIndex = images.indexOf(e.target);
                lightbox.style.display = 'block';
                lightboxImg.src = e.target.src;
            }
        });

        function showImage(index) {
            if (index >= images.length) index = 0;
            if (index < 0) index = images.length - 1;
            lightboxImg.src = images[index].src;
            currentImageIndex = index;
        }

        closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
        prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));
        
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                 lightbox.style.display = 'none';
            }
        });
    }


    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Here you would typically send the form data to a server
            // For this project, we'll just show the confirmation message
            
            // Basic validation check
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Παρακαλώ συμπληρώστε όλα τα απαραίτητα πεδία.');
                return;
            }
            
            // Show confirmation and reset form
            alert('Το μήνυμά σας εστάλη. Θα επικοινωνήσουμε σύντομα μαζί σας!');
            contactForm.reset();
        });
    }

});
