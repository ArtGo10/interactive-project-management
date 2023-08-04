const pageLinks = document.querySelectorAll('.page-link');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const modalToggles = document.querySelectorAll('.modal-toggler');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggler');
const modal = document.getElementById('modal');
const modalSuccess = document.getElementById('modal-success');
const formSuccess = document.getElementById('form-success');
const modals = document.querySelectorAll('.modal');
const paginationWrapper = document.getElementById('pagination');
const slider = document.getElementById('slider');
const slideLeftBtn = document.getElementById('slide-left');
const slideRightBtn = document.getElementById('slide-right');
const slides = Array.from(document.querySelectorAll('.slide'));
const animatedBlocks = document.querySelectorAll('.animated-block');
const detailItems = document.querySelectorAll('.detail-item');
const forms = document.querySelectorAll('.form');
const video = document.getElementById('video');
const videoController = document.getElementById('video-controller');

let activeSlideIndex = 0;

emailjs.init('ax7ySooPu_KFomJRO');

const renderPagination = () => {
    if (!paginationWrapper) return;
    paginationWrapper.innerHTML = `
        ${slides?.map((slide, index) => (
            `<li ${index === activeSlideIndex ? 'class="pagination-item pagination-active"' : 'class="pagination-item"'}></li>`
        )).join('')}
    `;
}

const addScrollListenerToNavLinks = (items, linkPrefix) => {
    items?.forEach(item => {
        let topOfPageSection = document.getElementById(item.dataset.dest).offsetTop;
        if (window.scrollY < topOfPageSection) {
            item.classList.remove(`${linkPrefix}-active-link`);
        }
        if (window.scrollY >= topOfPageSection) {
            document.querySelector(`.${linkPrefix}-active-link`)?.classList.remove(`${linkPrefix}-active-link`);
            item.classList.add(`${linkPrefix}-active-link`);
        }
    });
}

const addModalOpenedClass = elem => {
    elem?.classList.add('modal-opened');
}

const removeModalOpenedClass = elem => {
    elem?.classList.remove('modal-opened');
}

menuToggle?.addEventListener('click', () => {
    header?.classList.toggle('menu-opened');
    menuToggle?.classList.toggle('bx-menu');
    menuToggle?.classList.toggle('bx-x');
});

modalToggles?.forEach(toggle => toggle.addEventListener('click', () => {
    addModalOpenedClass(modal);
}));

modals?.forEach(modal => {
    modal.addEventListener('click', event => {
        if (event.target === modal) removeModalOpenedClass(modal);
    });

    const closeModalBtn = modal.querySelector('.close-modal');
    closeModalBtn?.addEventListener('click', () => {
        removeModalOpenedClass(modal);
    });
})

pageLinks?.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({
        top: document.getElementById(link.dataset.dest).offsetTop,
        behavior: "smooth"
    });
}));

detailItems.forEach(item => item.addEventListener('click', () => {
    item.classList.toggle('expanded');
    item.querySelector('.bx').classList.toggle('bx-up-arrow-alt');
    item.querySelector('.bx').classList.toggle('bx-down-arrow-alt');
}));

window.addEventListener('scroll', () => {
    addScrollListenerToNavLinks(navLinks, 'desktop');
    addScrollListenerToNavLinks(mobileNavLinks, 'mobile');

    animatedBlocks?.forEach(block => {
        const blockTop = block.getBoundingClientRect().top + window.scrollY - document.documentElement.clientTop;

        const animateIn = window.scrollY + window.innerHeight;
        const blockBottom = blockTop + block.offsetHeight;

        if (animateIn > blockBottom) {
            block.classList.add('animated');
        }
    })
});

slider?.addEventListener('scroll', (event) => {
    const paginationItems = document.querySelectorAll('.pagination-item');
    if (activeSlideIndex !== slides.length - 1 && (event.target.scrollLeft + slider.getBoundingClientRect().width / 2) >= slides[activeSlideIndex + 1].offsetLeft) {
        document.querySelector('.pagination-active')?.classList.remove('pagination-active');
        paginationItems[activeSlideIndex + 1].classList.add('pagination-active');
        activeSlideIndex++;
    }
    if (event.target.scrollLeft + slider.getBoundingClientRect().width / 2 < slides[activeSlideIndex].offsetLeft) {
        if (activeSlideIndex === 0) return;
        document.querySelector('.pagination-active')?.classList.remove('pagination-active');
        paginationItems[activeSlideIndex - 1]?.classList.add('pagination-active');
        activeSlideIndex--;
    }
});

slideLeftBtn.addEventListener('click', () => {
    if (activeSlideIndex === 0) return;
    slider.scrollTo({
        left: slides[activeSlideIndex - 1].offsetLeft - slider.offsetLeft,
        behavior: 'smooth'
    })
});

slideRightBtn.addEventListener('click', () => {
    if (activeSlideIndex === slides.length - 1) return;
    slider.scrollTo({
        left: slides[activeSlideIndex + 1].offsetLeft - slider.offsetLeft,
        behavior: 'smooth'
    })
});

forms.forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.fullName?.value || !form.email?.value) return;
        this.emailjsNumber.value = Math.random() * 100000 | 0;
        emailjs.sendForm('service_svvy1sj', 'template_c68wutp', this)
            .then(function() {
                if (form.classList.contains('modal-form')) {
                    removeModalOpenedClass(modal);
                    addModalOpenedClass(modalSuccess);
                    form.reset();
                }
                if (form.classList.contains('page-form')) {
                    addModalOpenedClass(formSuccess);
                    form.reset();
                }
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
    form.addEventListener('change', function (event) {
        event.target.value = event.target.value.trim();
    });
    form.email.addEventListener('blur', function (event) {
        event.target.value = event.target.value.trim();
    });
});

videoController.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        videoController.classList.remove('bx-play');
        videoController.classList.add('bx-pause');
    } else {
        video.pause();
        videoController.classList.remove('bx-pause');
        videoController.classList.add('bx-play');
    }
});

renderPagination();