(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".site-nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var ONE_TIME_BASE = 28.0;
  var SUB_PRICE = 23.8; // 15% off one-time base
  var SUB_MIN = 1;
  var SUB_MAX = 4;
  var SERVINGS_PER_BAG = 100;
  var BAG_GRAMS = 500;

  function money(n) {
    return n.toFixed(2);
  }
  function grams(n) {
    return n.toFixed(3);
  }

  // ---- Subscription calculator ----
  var subQtyEl = document.getElementById("subQty");
  if (subQtyEl) {
    var subQty = 1;
    var subDown = document.getElementById("subDown");
    var subUp = document.getElementById("subUp");
    var subTotal = document.getElementById("subTotal");
    var subServing = document.getElementById("subServing");
    var subGram = document.getElementById("subGram");
    var subSavings = document.getElementById("subSavings");
    var subCtaPrice = document.getElementById("subCtaPrice");
    var subCta = document.getElementById("subCta");
    var subConfirm = document.getElementById("subConfirm");
    var subConfirmPrice = document.getElementById("subConfirmPrice");

    function renderSub() {
      var total = SUB_PRICE * subQty;
      subTotal.textContent = money(total);
      subServing.textContent = "$" + money(SUB_PRICE / SERVINGS_PER_BAG);
      subGram.textContent = "$" + grams(SUB_PRICE / BAG_GRAMS);
      subSavings.textContent = money((ONE_TIME_BASE - SUB_PRICE) * subQty);
      subCtaPrice.textContent = money(total);
      subConfirm.classList.remove("is-visible");
    }

    subDown.addEventListener("click", function () {
      subQty = Math.max(SUB_MIN, subQty - 1);
      subQtyEl.textContent = subQty;
      renderSub();
    });
    subUp.addEventListener("click", function () {
      subQty = Math.min(SUB_MAX, subQty + 1);
      subQtyEl.textContent = subQty;
      renderSub();
    });
    subCta.addEventListener("click", function () {
      subConfirmPrice.textContent = money(SUB_PRICE * subQty);
      subConfirm.classList.add("is-visible");
    });

    renderSub();
  }

  // ---- Shop (one-time / quantity) calculator ----
  var shopQtyEl = document.getElementById("shopQty");
  if (shopQtyEl) {
    var shopQty = 1;
    var SHOP_MIN = 1;
    var SHOP_MAX = 12;
    var shopDown = document.getElementById("shopDown");
    var shopUp = document.getElementById("shopUp");
    var tierBtns = document.querySelectorAll(".tier-btn");
    var shopTotal = document.getElementById("shopTotal");
    var shopUnit = document.getElementById("shopUnit");
    var shopServing = document.getElementById("shopServing");
    var shopGram = document.getElementById("shopGram");
    var shopSavingsWrap = document.getElementById("shopSavingsWrap");
    var shopSavings = document.getElementById("shopSavings");
    var shopCtaQty = document.getElementById("shopCtaQty");
    var shopCtaPrice = document.getElementById("shopCtaPrice");
    var shopCta = document.getElementById("shopCta");
    var shopConfirm = document.getElementById("shopConfirm");
    var shopConfirmQty = document.getElementById("shopConfirmQty");
    var shopConfirmPrice = document.getElementById("shopConfirmPrice");

    function unitPriceFor(qty) {
      if (qty >= 6) return 23.0;
      if (qty >= 3) return 25.0;
      return ONE_TIME_BASE;
    }

    function syncTierButtons() {
      tierBtns.forEach(function (btn) {
        var pressed = Number(btn.dataset.qty) === shopQty;
        btn.setAttribute("aria-pressed", pressed ? "true" : "false");
      });
    }

    function renderShop() {
      var unit = unitPriceFor(shopQty);
      var total = unit * shopQty;
      shopTotal.textContent = money(total);
      shopUnit.textContent = "$" + money(unit);
      shopServing.textContent = "$" + money(unit / SERVINGS_PER_BAG);
      shopGram.textContent = "$" + grams(unit / BAG_GRAMS);

      if (unit < ONE_TIME_BASE) {
        shopSavingsWrap.style.visibility = "visible";
        shopSavings.textContent = money((ONE_TIME_BASE - unit) * shopQty);
      } else {
        shopSavingsWrap.style.visibility = "hidden";
      }

      shopCtaQty.textContent = shopQty;
      shopCtaPrice.textContent = money(total);
      shopConfirm.classList.remove("is-visible");
      syncTierButtons();
    }

    shopDown.addEventListener("click", function () {
      shopQty = Math.max(SHOP_MIN, shopQty - 1);
      shopQtyEl.textContent = shopQty;
      renderShop();
    });
    shopUp.addEventListener("click", function () {
      shopQty = Math.min(SHOP_MAX, shopQty + 1);
      shopQtyEl.textContent = shopQty;
      renderShop();
    });
    tierBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        shopQty = Number(btn.dataset.qty);
        shopQtyEl.textContent = shopQty;
        renderShop();
      });
    });
    shopCta.addEventListener("click", function () {
      shopConfirmQty.textContent = shopQty;
      shopConfirmPrice.textContent = money(unitPriceFor(shopQty) * shopQty);
      shopConfirm.classList.add("is-visible");
    });

    renderShop();
  }
})();
