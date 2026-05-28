/* ==========================================================================
   IRMAK - DIGITAL DESIGN PORTFOLIO & LECTURE SERIES
   INTERACTIVE LOGIC LAYER (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       01. Academic Database for Artworks
       -------------------------------------------------------------------------- */
    const artworkData = {
        target: {
            title: "PLATE I. THE TARGET DYNAMICS",
            subtitle: "Vector Geometry and Concentric Balance",
            analysis: "A formal investigation into concentric radial symmetry and visual anchors. The composition explores vector weight distribution, utilizing precise center-focused anchors to draw the eye inward. It serves as a study for Module 01, demonstrating how high-contrast color bands interact to create visual stability in academic identity design.",
            module: "Module 01: Vector Mechanics",
            image: "assets/images/target.png"
        },
        dropbox: {
            title: "PLATE II. THE DIGITAL PORTAL",
            subtitle: "Isometric Projection and Gradient Synthesis",
            analysis: "This study deconstructs isometric projection and spatial illusion on flat planes. By plotting three-dimensional geometries at exact 30-degree axes, the piece demonstrates spatial depth without atmospheric perspective. The subtle chromatic gradient transition from deep violet to magenta illustrates electronic ambient occlusion, aligning with Module 02 coursework.",
            module: "Module 02: Isometric Spatial Theory",
            image: "assets/images/dropbox.png"
        },
        starbucks: {
            title: "PLATE III. THE SIREN'S CHRONICLE",
            subtitle: "Circular Composition and Typographic Arc",
            analysis: "A study of typographic hierarchy wrapping along circular arcs, paired with organic-geometric synthesis. The outer circle utilizes custom kerning calculations to arch text seamlessly, while the inner siren portrait employs balanced organic shapes. This work illustrates key ligature clipping boundaries explored in Module 03.",
            module: "Module 03: Typographic Architecture",
            image: "assets/images/starbucks.png"
        },
        apple: {
            title: "PLATE IV. DUALITY OF THE APPLE",
            subtitle: "Organic Symmetries and Chromatic Study",
            analysis: "Exploring organic curvatures, path intersections, and color duality. This study presents two mirrored variations: one rendered in high-contrast organic moss-green and the other in deep crimson. The negative space bite detail is mathematically proportioned using golden ratio dimensions, linking tightly with our study of advanced vector geometry.",
            module: "Module 03: Typographic Architecture",
            image: "assets/images/apple.png"
        },
        abba: {
            title: "PLATE V. STELLAR SYNCOPATION",
            subtitle: "Reversed Symmetries and Cosmic Glyphs",
            analysis: "An investigation of typographic balance, reflection, and typographic glyph manipulation. The iconic mirrored B detail introduces syntactic tension, while the backdrop features an asymmetrical vector star fading from deep cyan to gold. This study serves as a masterclass in dynamic branding balance, deconstructed in our advanced lectures.",
            module: "Module 03: Typographic Architecture",
            image: "assets/images/abba.png"
        }
    };

    /* --------------------------------------------------------------------------
       02. Custom Fluid Cursor
       -------------------------------------------------------------------------- */
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    // Fast tracking for core dot, smooth lerp for outer ring
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
        // Linear interpolation to make the outer cursor circle lag beautifully
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Hover states for links and interactive assets
    const hoverElements = document.querySelectorAll('a, button, .gallery-item-wrapper, .lecture-card, .lightbox-close, .form-group input, .form-group select, .form-group textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            cursorDot.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            cursorDot.classList.remove('hovering');
        });
    });

    /* --------------------------------------------------------------------------
       03. Glass Header Scroll Handler
       -------------------------------------------------------------------------- */
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --------------------------------------------------------------------------
       04. Mobile Navigation Burger Menu
       -------------------------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileNav = () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when drawer is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    navToggle.addEventListener('click', toggleMobileNav);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileNav);
    });

    /* --------------------------------------------------------------------------
       05. Interactive 3D Frame Tilt & Glare Reflections
       -------------------------------------------------------------------------- */
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        const frame = card.querySelector('.wood-frame');
        const glare = card.querySelector('.specular-glare');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Mouse coordinates relative to card center
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Maximum tilt angle (degrees)
            const maxTilt = 10;
            
            // Calculate tilt angle based on mouse percentage from center
            const tiltX = -(y / (rect.height / 2)) * maxTilt;
            const tiltY = (x / (rect.width / 2)) * maxTilt;
            
            // Apply 3D rotation with perspective
            frame.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.025)`;
            
            // Specular reflections mapping
            if (glare) {
                // Calculate percentage position
                const px = (e.clientX - rect.left) / rect.width * 100;
                const py = (e.clientY - rect.top) / rect.height * 100;
                glare.style.transform = `translateX(0)`;
                glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to flat state
            frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            
            if (glare) {
                glare.style.transform = `translateX(-100%)`;
                glare.style.background = `linear-gradient(110deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 35%, rgba(255, 255, 255, 0.2) 48%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.05) 52%, rgba(255, 255, 255, 0) 100%)`;
            }
        });
    });

    /* --------------------------------------------------------------------------
       06. Museum Exhibition Lightbox Modal
       -------------------------------------------------------------------------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxSubtitle = document.getElementById('lightbox-subtitle');
    const lightboxAnalysis = document.getElementById('lightbox-analysis');
    const lightboxModule = document.getElementById('lightbox-module');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxFrameEl = document.getElementById('lightbox-frame-el');
    
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            const data = artworkData[id];
            
            if (data) {
                // Populate museum card data
                lightboxImg.src = data.image;
                lightboxImg.alt = data.title;
                lightboxTitle.textContent = data.title;
                lightboxSubtitle.textContent = data.subtitle;
                lightboxAnalysis.textContent = data.analysis;
                lightboxModule.textContent = data.module;
                
                // Show modal
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scrolling
            }
        });
    });

    // Close Modal Functions
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock background scrolling
        // Reset 3D frame rotations inside lightbox
        lightboxFrameEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Lightbox Frame subtle 3D hover matching the grid frames
    lightboxFrameEl.addEventListener('mousemove', (e) => {
        const rect = lightboxFrameEl.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        const maxTilt = 8;
        const tiltX = -(y / (rect.height / 2)) * maxTilt;
        const tiltY = (x / (rect.width / 2)) * maxTilt;
        
        lightboxFrameEl.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
    });

    lightboxFrameEl.addEventListener('mouseleave', () => {
        lightboxFrameEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });

});
