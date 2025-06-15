/**
 * This utility helps remove the X buttons from product cards that appear in the corner
 * of product images. These buttons might be added by a third-party library or component.
 */

export const removeProductXButtons = () => {
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    // More aggressive approach - target all buttons with circular white background in product images
    const allProductImages = document.querySelectorAll('.blinkit-product-image');
    
    allProductImages.forEach(productImage => {
      // Get all buttons inside the product image that are not our AR camera button
      const buttons = productImage.querySelectorAll('button:not(.ar-camera-icon)');
      buttons.forEach(button => {
        // Remove all non-AR buttons from product images
        button.remove();
      });
    });
    
    // Also try to find by specific selectors that might be used
    const possibleSelectors = [
      // Target all buttons in product images except AR camera
      '.blinkit-product-image button:not(.ar-camera-icon)',
      '.blinkit-product-card button:not(.ar-camera-icon):not(.blinkit-add-btn):not(.blinkit-quantity-btn)',
      // Target by appearance - circular buttons with X
      '.blinkit-product-image [class*="close"]',
      '.blinkit-product-image [class*="dismiss"]',
      '.blinkit-product-image [class*="remove"]',
      // SVG icons
      '.blinkit-product-card svg[class*="x"]',
      '.blinkit-product-card path[d*="M18 6 6 18"]',
      '.blinkit-product-card path[d*="m6 6 12 12"]',
      // Target by position - typically these are positioned absolute in the corner
      '.blinkit-product-image > :not(img):not(.ar-camera-icon):not(.ar-hint):not(.blinkit-discount-badge)',
    ];

    possibleSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Only remove if it looks like a close button (positioned in corner, has X content, etc)
        if (el.textContent === '×' || 
            el.textContent === 'X' || 
            el.textContent === 'x' || 
            el.getAttribute('aria-label')?.toLowerCase().includes('close') || 
            el.getAttribute('aria-label')?.toLowerCase().includes('remove')) {
          el.remove();
        }
      });
    });    // Create a style to hide these elements using CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Hide any X buttons on product cards */
      .blinkit-product-image button:not(.ar-camera-icon) {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        visibility: hidden !important;
      }
      /* Hide any SVG X icons */
      .blinkit-product-image svg:not(.ar-camera-icon svg) {
        display: none !important;
      }
      /* Target circular buttons often used for close buttons */
      .blinkit-product-image button[class*="close"],
      .blinkit-product-image button[class*="dismiss"],
      .blinkit-product-image button[class*="remove"],
      .blinkit-product-card .x-icon,
      .blinkit-product-card .close-icon,
      .blinkit-product-card .remove-icon {
        display: none !important;
      }
    `;
    document.head.appendChild(style);    // Set up a mutation observer to remove any that get added later
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as Element;
              
              // Check for any buttons inside product images
              if (el.tagName === 'BUTTON' || el.tagName === 'svg' || el.querySelector('button') || el.querySelector('svg')) {
                const isInsideProductImage = !!el.closest('.blinkit-product-image');
                const isARButton = el.classList.contains('ar-camera-icon') || 
                                   (!!el.closest('.ar-camera-icon'));
                
                if (isInsideProductImage && !isARButton) {
                  el.remove();
                }
                
                // Also check any child buttons
                if (el.querySelectorAll) {
                  const childButtons = el.querySelectorAll('button:not(.ar-camera-icon)');
                  childButtons.forEach(button => {
                    const isInsideProductImage = !!button.closest('.blinkit-product-image');
                    if (isInsideProductImage) {
                      button.remove();
                    }
                  });
                }
              }
            }
          });
        }
      });
    });
      // Start observing the whole document body for any new elements
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
    
    // Run the removal process again after a short delay and again after images may have loaded
    setTimeout(removeProductXButtons, 1000);
    setTimeout(removeProductXButtons, 2500);
  }, 500);
  
  // Also add a direct CSS rule to the head
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    /* Global CSS to hide X buttons on product cards */
    .blinkit-product-image button:not(.ar-camera-icon),
    .blinkit-product-image [class*="close"]:not(.ar-camera-icon),
    .blinkit-product-image [class*="dismiss"]:not(.ar-camera-icon),
    .blinkit-product-image [class*="remove"]:not(.ar-camera-icon) {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
    /* Target the specific X buttons seen in the screenshots */
    .blinkit-product-image button[style*="position: absolute"] {
      display: none !important;
    }
  `;
  document.head.appendChild(styleElement);
};

export default removeProductXButtons;
