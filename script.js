let cart = [];
let total = 0;

// إظهار الأقسام
function showSection(id) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}

// إضافة للسلة
function addToCart(btn, name, price) {
    const card = btn.parentElement;
    const quantity = parseInt(card.querySelector(".quantity-input").value);
    cart.push({ name, price, quantity });
    total += price * quantity;
    updateCart();
}

// تحديث السلة
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price} جنيه × ${item.quantity} `;

        // زر الحذف
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌ حذف";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

// إزالة منتج من السلة
function removeFromCart(index) {
    const item = cart[index];
    total -= item.price * item.quantity;
    cart.splice(index, 1);
    updateCart();
}

// إرسال واتساب
function sendWhatsApp() {
    if (cart.length === 0) {
        alert("السلة فاضية ❌");
        return;
    }

    const nameVal = document.getElementById("name").value.trim();
    const addressVal = document.getElementById("address").value.trim();
    const cityVal = document.getElementById("city").value.trim();
    const phone1Val = document.getElementById("phone1").value.trim();

    if (!nameVal || !addressVal || !cityVal || !phone1Val) {
        alert("من فضلك املا كل البيانات الأساسية قبل إرسال الطلب ⚠️");
        return;
    }

    if (!confirm("هل أنت متأكد من طلب المنتجات المختارة؟")) return;

    let message = "طلب جديد من سنتر مريومه%0A%0A";

    cart.forEach(item => {
        message += `- ${item.name}: ${item.price} جنيه × ${item.quantity}%0A`;
    });

    message += `%0Aالإجمالي: ${total} جنيه%0A`;
    message += `الاسم: ${nameVal}%0A`;
    message += `العنوان: ${addressVal}%0A`;
    message += `المحافظة: ${cityVal}%0A`;
    message += `تليفون: ${phone1Val}`;

    window.location.href = `https://wa.me/201116368325?text=${message}`;
}

