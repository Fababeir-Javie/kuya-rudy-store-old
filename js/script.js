const cartCount = document.querySelector('#cart-count');

document.querySelectorAll('.variant-select').forEach((select) => {
    select.addEventListener('change', () => {
        const selectedOption = select.options[select.selectedIndex];
        const productCard = select.closest('.product-card');
        const productImage = productCard.querySelector('.product-image img');
        const productName = productCard.querySelector('.variant-name');

        productImage.src = selectedOption.dataset.image;
        productImage.alt = selectedOption.dataset.productName;
        productName.textContent = selectedOption.dataset.productName;
    });
});

document.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', () => {
        cartCount.textContent = Number(cartCount.textContent) + 1;
        button.classList.add('added');
        button.innerHTML = 'Added to basket <span>✓</span>';
        setTimeout(() => button.classList.remove('added'), 900);
    });
});

/* =========================================
   CONTACT FORM HANDLING
   ========================================= */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const subjectSelect = contactForm.querySelector('#subject');
    const messageInput = contactForm.querySelector('#message');
    const submitBtn = contactForm.querySelector('.submit-button');
    const successMsg = contactForm.querySelector('.form-success-message');
    const errorMsg = contactForm.querySelector('.form-error-message');

    /* ---------- helper: show / clear error ---------- */
    function showError(input, message) {
        input.classList.add('input-error');
        let errEl = input.parentNode.querySelector('.field-error');
        if (!errEl) {
            errEl = document.createElement('span');
            errEl.className = 'field-error';
            input.parentNode.insertBefore(errEl, input.nextSibling);
        }
        errEl.textContent = message;
    }

    function clearError(input) {
        input.classList.remove('input-error');
        const errEl = input.parentNode.querySelector('.field-error');
        if (errEl) errEl.remove();
    }

    /* ---------- validate a single field ---------- */
    function validateField(input) {
        const val = input.value.trim();

        if (input.required && !val) {
            showError(input, 'This field is required.');
            return false;
        }

        if (input.type === 'email' && val) {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(val)) {
                showError(input, 'Please enter a valid email address.');
                return false;
            }
        }

        clearError(input);
        return true;
    }

    /* ---------- live validation on blur ---------- */
    [nameInput, emailInput, subjectSelect, messageInput].forEach((el) => {
        if (!el) return;
        el.addEventListener('blur', () => validateField(el));
        el.addEventListener('input', () => {
            if (el.classList.contains('input-error')) validateField(el);
        });
    });

    /* ---------- form submit via Formspree ---------- */
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let allValid = true;
        [nameInput, emailInput, subjectSelect, messageInput].forEach((el) => {
            if (!validateField(el)) allValid = false;
        });

        if (!allValid) return;

        /* Hide any previous messages */
        if (successMsg) successMsg.classList.remove('visible');
        if (errorMsg) { errorMsg.classList.remove('visible'); errorMsg.textContent = ''; }

        /* Disable button while sending */
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                [nameInput, emailInput, subjectSelect, messageInput].forEach(clearError);

                if (successMsg) {
                    successMsg.classList.add('visible');
                    setTimeout(() => successMsg.classList.remove('visible'), 5000);
                }
            } else {
                const data = await response.json().catch(() => ({}));
                const msg = data.error || 'Something went wrong. Please try again.';
                if (errorMsg) {
                    errorMsg.textContent = msg;
                    errorMsg.classList.add('visible');
                }
            }
        } catch (err) {
            if (errorMsg) {
                errorMsg.textContent = 'Network error. Please check your connection and try again.';
                errorMsg.classList.add('visible');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send message';
        }
    });
}
