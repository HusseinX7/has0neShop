(function () {
  let statusTimer;

  document.addEventListener("DOMContentLoaded", () => {
    bindCookieBanner();
    bindButtons();
    bindContactForm();
    fillBuyPage();
  });

  function bindCookieBanner() {
    const banner = document.getElementById("cookie-banner");
    const button = document.getElementById("cookie-accept");

    if (!banner || !button) {
      return;
    }

    if (readStorage("cookie_consent") === "accepted") {
      banner.hidden = true;
      banner.style.display = "none";
      return;
    }

    banner.hidden = false;
    banner.style.display = "flex";

    button.addEventListener("click", () => {
      writeStorage("cookie_consent", "accepted");
      banner.hidden = true;
      banner.style.display = "none";
    });
  }

  function bindButtons() {
    document.addEventListener("click", (event) => {
      const buyButton = event.target.closest("[data-buy]");

      if (buyButton) {
        showStatus("Demo Kauf abgeschlossen!");
      }
    });
  }

  function bindContactForm() {
    const form = document.getElementById("contact-form");
    const message = document.getElementById("form-message");

    if (!form || !message) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      message.hidden = false;
      message.textContent = "Danke für deine Nachricht. In dieser Demo wurde sie nicht wirklich versendet.";
      showStatus("Danke für deine Nachricht. In dieser Demo wurde sie nicht wirklich versendet.");
    });
  }

  function fillBuyPage() {
    const nameNode = document.getElementById("buy-product-name");
    const priceNode = document.getElementById("buy-product-price");
    const button = document.querySelector("[data-buy]");

    if (!nameNode || !priceNode || !button) {
      return;
    }

    const products = {
      combat: { name: "has0ne Combat Kit", price: "19,99 EUR" },
      movement: { name: "has0ne Movement Kit", price: "14,99 EUR" },
      ui: { name: "has0ne UI Pack", price: "9,99 EUR" },
      vfx: { name: "has0ne VFX Pack", price: "7,99 EUR" },
      adminlite: { name: "has0ne Admin Lite", price: "kostenlos" },
      fullpack: { name: "has0ne Full Creator Bundle", price: "39,99 EUR" }
    };

    const params = new URLSearchParams(window.location.search);
    const key = params.get("product");
    const product = products[key] || { name: "Unbekanntes Produkt", price: "-" };

    nameNode.textContent = product.name;
    priceNode.textContent = product.price;
    button.setAttribute("data-buy", product.name);
  }

  function showStatus(text) {
    const status = document.getElementById("site-status");
    if (!status) {
      return;
    }

    status.hidden = false;
    status.textContent = text;
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      status.hidden = true;
      status.textContent = "";
    }, 2600);
  }

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      return;
    }
  }
})();
