
    document.addEventListener('DOMContentLoaded', function () {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const prevPageBtn = document.getElementById('prev-btn');
        const nextPageBtn = document.getElementById('next-btn');

        let currentImageIndex = 0;
        let filteredItems = [];

        // Initialize gallery
        updateFilteredItems('all');

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                updateFilteredItems(filter);
            });
        });

        function updateFilteredItems(filter) {
            galleryItems.forEach(item => {
                item.style.display = 'none';
            });

            if (filter === 'all') {
                filteredItems = Array.from(galleryItems);
            } else {
                filteredItems = Array.from(galleryItems).filter(item =>
                    item.dataset.category === filter
                );
            }

            filteredItems.forEach(item => {
                item.style.display = 'block';
            });

            currentImageIndex = 0;
        }

        // Open lightbox
        galleryItems.forEach((item) => {
            item.addEventListener('click', function () {
                const itemIndex = filteredItems.indexOf(item);
                if (itemIndex !== -1) {
                    currentImageIndex = itemIndex;
                    updateLightbox();
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        closeBtn.addEventListener('click', function () {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Navigation in lightbox
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });

        function updateLightbox() {
            const currentItem = filteredItems[currentImageIndex];
            const img = currentItem.querySelector('img');
            const title = currentItem.querySelector('h3')?.textContent || '';
            const desc = currentItem.querySelector('p')?.textContent || '';

            lightboxImage.src = img.src;
            lightboxCaption.textContent = `${title} - ${desc}`;
        }

        function showPrevImage() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateLightbox();
            }
        }

        function showNextImage() {
            if (currentImageIndex < filteredItems.length - 1) {
                currentImageIndex++;
                updateLightbox();
            }
        }

        // Page-level navigation buttons
        prevPageBtn.addEventListener('click', function () {
            showPrevImage();
        });

        nextPageBtn.addEventListener('click', function () {
            showNextImage();
        });
    });

