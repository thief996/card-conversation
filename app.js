const products = {
  feeling: { name: "感覺卡", price: 400, form: "feelings" },
  needs: { name: "需要卡", price: 400, form: "feelings" },
  stuck: { name: "我好卡", price: 400, form: "reflection" },
  great: { name: "你卡好", price: 400, form: "reflection" }
};

const forms = {
  feelings: "https://forms.gle/RAubpzDNVLbu5bgW9",
  reflection: "https://forms.gle/pJF5EZMwwSQ1Dfei9"
};

const cart = {};
const overlay = document.querySelector("[data-cart-overlay]");
const itemsElement = document.querySelector("[data-cart-items]");
const emptyElement = document.querySelector("[data-cart-empty]");
const summaryElement = document.querySelector("[data-cart-summary]");
const countElements = document.querySelectorAll("[data-cart-count]");
const money = value => `NT$${value.toLocaleString("zh-TW")}`;

function getQuantity() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function getPricing() {
  const quantity = getQuantity();
  const regular = Object.entries(cart).reduce(
    (sum, [id, amount]) => sum + products[id].price * amount, 0
  );
  const paired = Math.floor(quantity / 2) * 700 + (quantity % 2) * 400;
  const completeSets = Math.floor(quantity / 4);
  const remainder = quantity % 4;
  const completePrice = completeSets * 1400 + Math.floor(remainder / 2) * 700 + (remainder % 2) * 400;
  const subtotal = Math.min(regular, paired, completePrice);
  const shipping = quantity > 0 && quantity < 4 ? 50 : 0;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  const quantity = getQuantity();
  countElements.forEach(element => { element.textContent = quantity; });
  itemsElement.innerHTML = "";

  Object.entries(cart).forEach(([id, amount]) => {
    if (!amount) return;
    const product = products[id];
    const item = document.createElement("article");
    item.className = "cart-item";
    item.innerHTML = `
      <div>
        <h3>${product.name}</h3>
        <p>${money(product.price)}／盒</p>
      </div>
      <div class="quantity" aria-label="${product.name}數量">
        <button type="button" data-change="${id}" data-delta="-1" aria-label="減少一盒">−</button>
        <strong>${amount}</strong>
        <button type="button" data-change="${id}" data-delta="1" aria-label="增加一盒">＋</button>
      </div>
    `;
    itemsElement.appendChild(item);
  });

  emptyElement.hidden = quantity > 0;
  summaryElement.hidden = quantity === 0;
  if (quantity > 0) {
    const pricing = getPricing();
    document.querySelector("[data-subtotal]").textContent = money(pricing.subtotal);
    document.querySelector("[data-shipping]").textContent = pricing.shipping ? money(pricing.shipping) : "免運";
    document.querySelector("[data-total]").textContent = money(pricing.total);
  }
}

function addProduct(id, quantity = 1) {
  cart[id] = (cart[id] || 0) + quantity;
  renderCart();
  openCart();
}

function openCart() {
  overlay.hidden = false;
  document.body.classList.add("cart-open");
}

function closeCart() {
  overlay.hidden = true;
  document.body.classList.remove("cart-open");
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  if (add) addProduct(add.dataset.add);

  const bundle = event.target.closest("[data-add-bundle]");
  if (bundle?.dataset.addBundle === "reflection") {
    cart.stuck = (cart.stuck || 0) + 1;
    cart.great = (cart.great || 0) + 1;
    renderCart();
    openCart();
  }
  if (bundle?.dataset.addBundle === "complete") {
    Object.keys(products).forEach(id => { cart[id] = (cart[id] || 0) + 1; });
    renderCart();
    openCart();
  }

  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();

  const change = event.target.closest("[data-change]");
  if (change) {
    const id = change.dataset.change;
    cart[id] = Math.max(0, (cart[id] || 0) + Number(change.dataset.delta));
    if (cart[id] === 0) delete cart[id];
    renderCart();
  }

  if (event.target === overlay) closeCart();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !overlay.hidden) closeCart();
});

document.querySelector("[data-checkout]").addEventListener("click", async () => {
  const lines = Object.entries(cart)
    .filter(([, amount]) => amount > 0)
    .map(([id, amount]) => `${products[id].name} × ${amount}`);
  const pricing = getPricing();
  const summary = [
    "越翔牌卡訂單摘要",
    ...lines,
    `商品小計：${money(pricing.subtotal)}`,
    `運費：${pricing.shipping ? money(pricing.shipping) : "免運"}`,
    `合計：${money(pricing.total)}`
  ].join("\n");

  try {
    await navigator.clipboard.writeText(summary);
    document.querySelector("[data-copy-status]").textContent = "訂單摘要已複製，請貼到表單備註欄。";
  } catch {
    document.querySelector("[data-copy-status]").textContent = "請在表單中依照購物袋內容選擇品項。";
  }

  const hasReflection = (cart.stuck || 0) + (cart.great || 0) > 0;
  const hasFeelings = (cart.feeling || 0) + (cart.needs || 0) > 0;
  const destination = hasReflection ? forms.reflection : forms.feelings;
  window.open(destination, "_blank", "noopener");

  if (hasReflection && hasFeelings) {
    document.querySelector("[data-copy-status]").textContent =
      "完整訂單已複製。請在新表單選擇「有感連動」並將摘要貼到備註欄。";
  }
});

renderCart();
