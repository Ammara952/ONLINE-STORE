document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    function toggleMenu() {
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // Toast Notification for Add to Cart
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const toast = document.getElementById('toast');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Show Toast
            toast.textContent = "Item added to your cart";
            toast.classList.add('show');

            // Increment cart count
            count++;
            if (cartCount) cartCount.textContent = count;

            // Animate cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 200);
            }

            // Hide Toast after 3s
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        });
    });

    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.action-btn .fa-heart');
    wishlistBtns.forEach(icon => {
        icon.parentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            icon.classList.toggle('fas');
            icon.classList.toggle('far');

            if (icon.classList.contains('fas')) {
                toast.textContent = "Added to wishlist";
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Quick View Modal Logic
    const modal = document.getElementById('quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');
    const quickViewBtns = document.querySelectorAll('.action-btn .fa-eye');

    const productDetails = {
        "Silk Evening Clutch": {
            desc: "Handcrafted from the finest silk, this evening clutch is the perfect companion for your gala nights. Features a gold-plated clasp and a detachable chain strap.",
            img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop"
        },
        "Velvet Midi Dress": {
            desc: "Experience luxury with this deep velvet midi dress. Tailored to perfection, it hugs your curves in all the right places. Perfect for winter weddings or cocktail parties.",
            img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop"
        },
        "Crimson Heels": {
            desc: "Step out in style with these striking crimson heels. Made with Italian leather and designed for comfort without compromising on elegance.",
            img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
        },
        "Gold Minimalist Watch": {
            desc: "A timeless piece for the modern woman. This gold minimalist watch features a scratch-resistant sapphire crystal and a Swiss movement mechanism.",
            img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2070&auto=format&fit=crop"
        },
        "Urban Sneakers": {
            desc: "Chic meets comfort. These urban sneakers are designed for the busy lifestyle, offering superior arch support and a breathable mesh upper.",
            img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop"
        },
        "Classic Timepiece": {
            desc: "An icon of sophistication. This classic timepiece is a must-have for any collection, featuring a leather strap and a water-resistant casing.",
            img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1887&auto=format&fit=crop"
        }
    };

    if (quickViewBtns) {
        quickViewBtns.forEach(btn => {
            btn.parentElement.addEventListener('click', (e) => {
                e.stopPropagation();

                const card = btn.closest('.product-card');
                const title = card.querySelector('.product-name').textContent;
                const price = card.querySelector('.product-price').innerHTML;

                const details = productDetails[title] || { desc: "Product details unavailable.", img: "" };

                modalBody.innerHTML = `
                    <img src="${details.img}" alt="${title}" class="modal-img">
                    <div class="modal-details">
                        <h2 class="modal-title">${title}</h2>
                        <p class="modal-price">${price}</p>
                        <p class="modal-desc">${details.desc}</p>
                        <button class="btn btn-primary add-to-cart-modal">Add to Cart</button>
                    </div>
                `;

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';

                const modalAddBtn = document.querySelector('.add-to-cart-modal');
                if (modalAddBtn) {
                    modalAddBtn.addEventListener('click', () => {
                        toast.textContent = "Item added to your cart";
                        toast.classList.add('show');
                        count++;
                        if (cartCount) cartCount.textContent = count;
                        setTimeout(() => toast.classList.remove('show'), 3000);
                        modal.classList.remove('show');
                        document.body.style.overflow = '';
                    });
                }
            });
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

});
