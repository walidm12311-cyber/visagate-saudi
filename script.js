document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    const closeNav = () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 24 + 'px';
      }
    });
  });

  /* ---------- Apply form submission (quick contact form) ---------- */
  const packageSelect = document.getElementById('packageSelect');
  const applyForm = document.getElementById('applyForm');
  const formSuccess = document.getElementById('formSuccess');

  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!applyForm.checkValidity()) {
        applyForm.reportValidity();
        return;
      }

      formSuccess.hidden = false;
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      applyForm.reset();
    });
  }

  /* ---------- Application modal ---------- */
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalForm = document.getElementById('modalForm');
  const modalSuccess = document.getElementById('modalSuccess');
  const mVisaType = document.getElementById('mVisaType');

  if (modalBackdrop && modalForm) {
    const openModal = (visaType) => {
      if (visaType && mVisaType) {
        mVisaType.value = visaType;
      }
      modalBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      const firstField = modalForm.querySelector('input, select, textarea');
      if (firstField) firstField.focus();
    };

    const closeModal = () => {
      modalBackdrop.hidden = true;
      document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-open-modal]').forEach(btn => {
      btn.addEventListener('click', () => openModal());
    });

    document.querySelectorAll('.choose-package').forEach(btn => {
      btn.addEventListener('click', () => {
        const pkg = btn.getAttribute('data-package');
        if (packageSelect && pkg) {
          packageSelect.value = pkg;
        }
        openModal(pkg);
      });
    });

    modalClose.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
    });

    /* ---------- Voucher code ---------- */
    const voucherInput = document.getElementById('mVoucher');
    const applyVoucherBtn = document.getElementById('applyVoucherBtn');
    const voucherMessage = document.getElementById('voucherMessage');

    const BUSINESS_VISA_PRICE = 1899.98;
    const VOUCHER_CODE = 'EXPLORE99';
    const VOUCHER_NAME = 'World Explorer Saudi Deal';
    const VOUCHER_DISCOUNT = 0.20; // 20% off launch promo

    applyVoucherBtn.addEventListener('click', () => {
      const code = voucherInput.value.trim().toUpperCase();
      voucherMessage.hidden = false;

      if (code === '') {
        voucherMessage.textContent = 'Please enter a voucher code.';
        voucherMessage.className = 'voucher-message error';
      } else if (code !== VOUCHER_CODE) {
        voucherMessage.textContent = '❌ Invalid voucher code. Please try again.';
        voucherMessage.className = 'voucher-message error';
      } else if (mVisaType.value !== '10-Year Business') {
        voucherMessage.textContent = '⚠️ This voucher is only valid for the Business Visa package';
        voucherMessage.className = 'voucher-message warning';
      } else {
        const discounted = (BUSINESS_VISA_PRICE * (1 - VOUCHER_DISCOUNT)).toFixed(2);
        voucherMessage.textContent = `🌍 ${VOUCHER_NAME} applied! Was $${BUSINESS_VISA_PRICE.toFixed(2)}, now $${discounted} (20% off)`;
        voucherMessage.className = 'voucher-message success';
      }
    });

    mVisaType.addEventListener('change', () => {
      voucherMessage.hidden = true;
    });

    /* ---------- Modal form submission ---------- */
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!modalForm.checkValidity()) {
        modalForm.reportValidity();
        return;
      }

      modalSuccess.hidden = false;
      modalSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      modalForm.reset();
    });
  }

});
