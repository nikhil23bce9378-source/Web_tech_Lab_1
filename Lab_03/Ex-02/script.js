let cart = [
  { name: "Laptop", price: 50000, quantity: 1, category: "electronics" },
  { name: "Book", price: 500, quantity: 2, category: "education" },
  { name: "Airpods",price: 2000,quantity: 1,category: "electronics"}
];

let appliedCoupon = "";

renderCart();

/* ---------------- Render Cart ---------------- */
// function renderCart() {
//   const tbody = document.querySelector("#cartTable tbody");
//   tbody.innerHTML = "";

//   let cartTotal = 0;

//   cart.forEach((item, index) => {
//     let itemTotal = item.price * item.quantity;

//     // Bulk Discount
//     if (item.quantity >= 5) {
//       itemTotal *= 0.9;
//     }

//     // Category Discount
//     if (item.category === "electronics") {
//       itemTotal *= 0.85;
//     }

//     cartTotal += itemTotal;

//     tbody.innerHTML += `
//       <tr>
//         <td>${item.name}</td>
//         <td>₹${item.price}</td>
//         <td>
//           <button onclick="updateQty(${index}, -1)">-</button>
//           ${item.quantity}
//           <button onclick="updateQty(${index}, 1)">+</button>
//         </td>
//         <td>₹${itemTotal.toFixed(2)}</td>
//         <td><button onclick="removeItem(${index})">❌</button></td>
//       </tr>
//     `;
//   });

//   cartTotal = applyTimeDiscount(cartTotal);
//   cartTotal = applyCouponDiscount(cartTotal);

//   document.getElementById("finalAmount").innerText =
//     "Final Amount: ₹" + cartTotal.toFixed(2);
// }

function renderCart() {
  const tbody = document.querySelector("#cartTable tbody");
  const discountDiv = document.getElementById("discountDetails");
  tbody.innerHTML = "";
  discountDiv.innerHTML = "";

  let subtotal = 0;
  let bulkDiscount = 0;
  let categoryDiscount = 0;
  let timeDiscount = 0;
  let couponDiscount = 0;

  cart.forEach((item, index) => {
    let baseTotal = item.price * item.quantity;
    subtotal += baseTotal;

    let finalItemTotal = baseTotal;

    // Bulk Discount
    if (item.quantity >= 5) {
      const discount = finalItemTotal * 0.10;
      bulkDiscount += discount;
      finalItemTotal -= discount;
    }

    // Category Discount
    if (item.category === "electronics") {
      const discount = finalItemTotal * 0.15;
      categoryDiscount += discount;
      finalItemTotal -= discount;
    }

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="updateQty(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQty(${index}, 1)">+</button>
        </td>
        <td>₹${finalItemTotal.toFixed(2)}</td>
        <td><button onclick="removeItem(${index})">❌</button></td>
      </tr>
    `;
  });

  // Time Discount
  let totalAfterItemDiscounts =
    subtotal - bulkDiscount - categoryDiscount;

  const hour = new Date().getHours();
  if (hour >= 18 && hour <= 21) {
    timeDiscount = totalAfterItemDiscounts * 0.05;
  }

  let totalAfterTime = totalAfterItemDiscounts - timeDiscount;

  // Coupon Discount
  if (appliedCoupon === "SAVE10") {
    couponDiscount = totalAfterTime * 0.10;
  } else if (appliedCoupon === "FREESHIP") {
    couponDiscount = 50;
  }

  let finalAmount =
    totalAfterTime - couponDiscount;

  // Display Discount Breakdown
  discountDiv.innerHTML = `
    <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
    <p>Bulk Discount: -₹${bulkDiscount.toFixed(2)}</p>
    <p>Category Discount: -₹${categoryDiscount.toFixed(2)}</p>
    <p>Time Discount: -₹${timeDiscount.toFixed(2)}</p>
    <p>Coupon Discount: -₹${couponDiscount.toFixed(2)}</p>
    <hr>
    <strong>Final Amount: ₹${finalAmount.toFixed(2)}</strong>
  `;

  document.getElementById("finalAmount").innerText =
    "Final Amount: ₹" + finalAmount.toFixed(2);
}


/* ---------------- Quantity Update ---------------- */
function updateQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

/* ---------------- Remove Item ---------------- */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* ---------------- Time Discount ---------------- */
function applyTimeDiscount(total) {
  const hour = new Date().getHours();
  if (hour >= 18 && hour <= 21) {
    total *= 0.95;
  }
  return total;
}

/* ---------------- Coupon Parsing ---------------- */
function applyCoupon() {
  appliedCoupon = document
    .getElementById("coupon")
    .value
    .trim()
    .toUpperCase();
  renderCart();
}

function applyCouponDiscount(total) {
  if (appliedCoupon === "SAVE10") {
    return total * 0.9;
  }
  if (appliedCoupon === "FREESHIP") {
    return total - 50;
  }
  return total;
}
