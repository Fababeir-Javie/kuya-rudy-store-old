/* =========================================
   Kuya Rudy Store — Module 8: JavaScript
   ========================================= */

// 1. Shop-wide constants
const shopName = 'Kuya Rudy Store';
const currentYear = new Date().getFullYear();

// 2. Running total for the shelf calculation
let runningTotal = 0;

// 3. Write the shop name into an element on the page
const shopNameTarget = document.getElementById('shop-name');
if (shopNameTarget) {
    shopNameTarget.textContent = shopName;
}

// 4. Dynamic copyright line in the footer
const copyrightTarget = document.getElementById('copyright');
if (copyrightTarget) {
    copyrightTarget.textContent = '© ' + currentYear + ' ' + shopName + ' • Made in the neighborhood';
}

// 5. Small calculation: count the products on the shelf
//    and add up their prices into the running total
const productCards = document.querySelectorAll('.product-card');
const productCount = productCards.length;

productCards.forEach(function (card) {
    const priceTag = card.querySelector('.price');
    if (!priceTag) return;

    const price = parseFloat(priceTag.textContent.replace(/[^0-9.]/g, ''));
    if (!isNaN(price)) {
        runningTotal += price;
    }
});

// Display the computed value (products with "Varies" prices are skipped)
const shelfTarget = document.getElementById('shelf-count');
if (shelfTarget) {
    shelfTarget.textContent =
        productCount + ' items on the shelf • shelf value ₱' + runningTotal.toFixed(2);
}

// 6. Decide whether a product is in stock
const stockCount = 12;
let stockMessage;
if (stockCount > 10) {
    stockMessage = 'In stock';
} else if (stockCount >= 1 && stockCount <= 10) {
    stockMessage = 'Only a few left';
} else {
    stockMessage = 'Sold out';
}

const stockTarget = document.getElementById('stock-status');
if (stockTarget) {
    stockTarget.textContent = stockMessage;
}

// 7. Calculate delivery and final order total
const orderTotal = 250;
const isMember = true;
const qualifiesForFreeDelivery = orderTotal >= 200 && isMember === true;
const deliveryFee = qualifiesForFreeDelivery ? 0 : 150;
const finalTotal = orderTotal + deliveryFee;

const deliveryTarget = document.getElementById('delivery-total');
if (deliveryTarget) {
    deliveryTarget.textContent = 'Final total: ₱' + finalTotal.toFixed(2);
}

// 8. Show whether the shop is open today
const isShopOpen = true;
const shopStatus = isShopOpen ? 'Open today' : 'Closed today';
const shopStatusTarget = document.getElementById('shop-status');
if (shopStatusTarget) {
    shopStatusTarget.textContent = shopStatus;
}

// 9. Labelled console messages
console.log('shop name:', shopName);
console.log('current year:', currentYear);
console.log('running total:', runningTotal);
console.log('products on shelf:', productCount);
console.log('stock status:', stockMessage);
console.log('final total:', finalTotal);
console.log('shop status:', shopStatus);
