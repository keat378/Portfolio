// Certificates modal/lightbox
const cards = Array.from(document.querySelectorAll('.cert-card'));
const modal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const downloadBtn = document.getElementById('downloadBtn');
const closeBtn = modal ? modal.querySelector('.modal-close') : null;
const prevBtn = modal ? modal.querySelector('.modal-nav.prev') : null;
const nextBtn = modal ? modal.querySelector('.modal-nav.next') : null;

let currentIndex = 0;

function openModal(index) {
    const card = cards[index];
    const imgSrc = card.dataset.img;
    const title = card.dataset.title;
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    downloadBtn.href = imgSrc;
    modal.setAttribute('aria-hidden', 'false');
    currentIndex = index;
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function showNext(delta) {
    currentIndex = (currentIndex + delta + cards.length) % cards.length;
    openModal(currentIndex);
}

if (cards.length) {
    cards.forEach((card, i) => {
        card.addEventListener('click', () => openModal(i));
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => showNext(-1));
    nextBtn.addEventListener('click', () => showNext(1));

    document.addEventListener('keydown', e => {
        if (modal.getAttribute('aria-hidden') === 'true') return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showNext(-1);
        if (e.key === 'ArrowRight') showNext(1);
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
}

// ✅ 点击大图时全屏显示 / 退出全屏
modalImg.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        modalImg.requestFullscreen().catch(err => {
            console.error("Fullscreen failed:", err);
        });
    } else {
        document.exitFullscreen();
    }
});
