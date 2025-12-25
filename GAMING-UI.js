// BYFORCEUK Home Page JavaScript - Enhanced Creative Version

document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initHelpButton();
  initNavigation();
  initCtaButton();
  initFeatureAnimations();
  initCoinAnimations();
  initPixelIconEffects();
  initMouseTrail();
  initAudioButtonRipple();
});

// Create floating particles
function initParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
  document.body.appendChild(particleContainer);

  // Create floating particles
  for (let i = 0; i < 20; i++) {
    createParticle(particleContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  const size = Math.random() * 8 + 4;
  const startX = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 10;

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${startX}%;
        bottom: -20px;
        animation: floatUp ${duration}s linear ${delay}s infinite;
    `;

  container.appendChild(particle);
}

// Float animation is now in Gaming-UI.css

// Help button functionality - renamed to match .audio-button in HTML
function initHelpButton() {
  const helpBtn = document.querySelector(".audio-button");
  if (helpBtn) {
    helpBtn.addEventListener("click", function () {
      createModal();
    });

    // Add hover sound effect (visual)
    helpBtn.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "helpPulse 3s ease-in-out infinite";
      }, 10);
    });
  }
}

function createModal() {
  const modal = document.createElement("div");
  modal.innerHTML = `
        <div class="help-modal-content">
            <div class="modal-sparkle"></div>
            <h3>✨ Need Help? ✨</h3>
            <p>Contact us at:</p>
            <p><strong>📧 Email:</strong> info@byforce.uk</p>
            <p><strong>📞 Phone:</strong> +44 7500 324 868</p>
            <button class="close-modal">CLOSE</button>
        </div>
    `;

  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: modalFadeIn 0.4s ease;
        backdrop-filter: blur(5px);
    `;

  const content = modal.querySelector(".help-modal-content");
  content.style.cssText = `
        background: linear-gradient(180deg, #5BC8C8, #80DDB8);
        padding: 40px 50px;
        border-radius: 25px;
        text-align: center;
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 100px rgba(91, 200, 200, 0.3);
        border: 5px solid rgba(255, 255, 255, 0.4);
        animation: modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
    `;

  content.querySelector("h3").style.cssText = `
        font-size: 18px;
        margin-bottom: 25px;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);
    `;

  content.querySelectorAll("p").forEach((p) => {
    p.style.cssText = `
            font-size: 10px;
            margin-bottom: 12px;
            line-height: 2;
        `;
  });

  const closeBtn = content.querySelector(".close-modal");
  closeBtn.style.cssText = `
        font-family: 'Press Start 2P', cursive;
        font-size: 11px;
        padding: 15px 40px;
        background: linear-gradient(180deg, #fff, #f0f0f0);
        color: #333;
        border: 3px solid #ddd;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 20px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 0 #bbb;
    `;

  document.body.appendChild(modal);

  // Add sparkle effect
  const sparkle = content.querySelector(".modal-sparkle");
  sparkle.style.cssText = `
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
        animation: sparkleMove 3s linear infinite;
    `;

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.transform = "translateY(-3px)";
    closeBtn.style.boxShadow = "0 7px 0 #bbb";
  });

  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.transform = "";
    closeBtn.style.boxShadow = "0 4px 0 #bbb";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.animation = "modalFadeOut 0.3s ease forwards";
    setTimeout(() => modal.remove(), 300);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.animation = "modalFadeOut 0.3s ease forwards";
      setTimeout(() => modal.remove(), 300);
    }
  });
}

// Navigation
function initNavigation() {
  const navBtns = document.querySelectorAll(".nav-link");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
      }

      // Ripple effect
      const ripple = document.createElement("span");
      ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// CTA button click effect - updated to use .home-cta-btn
function initCtaButton() {
  const ctaBtn = document.querySelector(".home-cta-btn");
  if (ctaBtn) {
    ctaBtn.addEventListener("click", function (e) {
      // Create burst particles
      for (let i = 0; i < 12; i++) {
        createBurstParticle(e.clientX, e.clientY);
      }
    });
  }
}

function createBurstParticle(x, y) {
  const particle = document.createElement("div");
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 100 + 50;
  const size = Math.random() * 10 + 5;

  particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, #5BC8C8, #f1c40f);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9999;
        animation: burst 0.8s ease-out forwards;
        --tx: ${Math.cos(angle) * velocity}px;
        --ty: ${Math.sin(angle) * velocity}px;
    `;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 800);
}

// Feature items animation on scroll
function initFeatureAnimations() {
  const featureItems = document.querySelectorAll(
    ".feature-item, .content-section, .pricing-section, .urgency-section, .trust-section, .benefits-section, .shipping-section, .cta-section"
  );

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  featureItems.forEach((item) => {
    observer.observe(item);
  });
}

// Product card image hover animations - renamed to match .product.card_image_class in HTML
function initCoinAnimations() {
  const productImages = document.querySelectorAll(".product.card_image_class");
  productImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)";
      this.style.filter = "drop-shadow(15px 15px 30px rgba(0, 0, 0, 0.25))";
    });

    img.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.filter = "drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.2))";
    });

    img.addEventListener("click", function () {
      // Click effect on product image
      const rect = this.getBoundingClientRect();
      showCoinCollect(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
}

function showCoinCollect(x, y) {
  const text = document.createElement("div");
  text.textContent = "+1 🪙";
  text.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-family: 'Press Start 2P', cursive;
        font-size: 14px;
        color: #f1c40f;
        text-shadow: 2px 2px 0 #333;
        pointer-events: none;
        z-index: 9999;
        animation: coinCollect 1s ease-out forwards;
    `;
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 1000);
}

// Section icon hover effects - updated to use .section-icon
function initPixelIconEffects() {
  const icons = document.querySelectorAll(".section-icon");
  icons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      // Create sparkles around icon
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createIconSparkle(this), i * 100);
      }
    });
  });
}

function createIconSparkle(element) {
  const rect = element.getBoundingClientRect();
  const sparkle = document.createElement("div");

  sparkle.textContent = "✨";
  sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        font-size: ${Math.random() * 10 + 10}px;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle 0.8s ease-out forwards;
    `;

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}

// Mouse trail effect
function initMouseTrail() {
  let lastX = 0,
    lastY = 0;
  let throttle = false;

  document.addEventListener("mousemove", (e) => {
    if (throttle) return;
    throttle = true;

    setTimeout(() => {
      if (
        Math.abs(e.clientX - lastX) > 30 ||
        Math.abs(e.clientY - lastY) > 30
      ) {
        createTrailDot(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
      throttle = false;
    }, 50);
  });
}

function createTrailDot(x, y) {
  const dot = document.createElement("div");
  dot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(91, 200, 200, 0.6);
        border-radius: 50%;
        left: ${x - 4}px;
        top: ${y - 4}px;
        pointer-events: none;
        z-index: 9998;
        animation: trailFade 0.5s ease-out forwards;
    `;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 500);
}

// Add all animations
const gamingUIStyle = document.createElement("style");
gamingUIStyle.textContent = `
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes modalPop {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes sparkleMove {
        0% { transform: translateX(-100%) rotate(45deg); }
        100% { transform: translateX(100%) rotate(45deg); }
    }
    
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes burst {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
    
    @keyframes coinCollect {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
    }
    
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1.5) rotate(180deg); opacity: 0; }
    }
    
    @keyframes trailFade {
        0% { transform: scale(1); opacity: 0.6; }
        100% { transform: scale(0); opacity: 0; }
    }
`;
document.head.appendChild(gamingUIStyle);

// Audio button ripple animation
function initAudioButtonRipple() {
  const audioButton = document.getElementById("tts-toggle");

  if (audioButton) {
    audioButton.addEventListener("click", function (e) {
      // Create multiple concentric circles expanding from center
      const numberOfRipples = 5;

      for (let i = 0; i < numberOfRipples; i++) {
        setTimeout(() => {
          createAudioRipple(audioButton);
        }, i * 150); // Stagger the ripples by 150ms for more visible waves
      }
    });
  }
}

function createAudioRipple(button) {
  const ripple = document.createElement("div");
  ripple.className = "audio-ripple";

  // Get button dimensions
  const rect = button.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Position the ripple at the center of the button
  ripple.style.left = centerX + "px";
  ripple.style.top = centerY + "px";
  ripple.style.transform = "translate(-50%, -50%)";

  button.appendChild(ripple);

  // Remove the ripple after animation completes
  setTimeout(() => {
    ripple.remove();
  }, 1500);
}
