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
