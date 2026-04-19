// =====================================================
// CartDrawer.jsx
// Concepts: useContext (cart state), .map over cartItems array
// =====================================================
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartDrawer.css";

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useContext(CartContext);

  const DELIVERY_THRESHOLD = 999;
  const deliveryCharges = totalPrice >= DELIVERY_THRESHOLD ? 0 : 99;
  const grandTotal = totalPrice + deliveryCharges;

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "overlay-visible" : ""}`}
        onClick={onClose}
        id="cart-overlay"
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? "drawer-open" : ""}`} id="cart-drawer">
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">🛒 Your Cart</h2>
          <button className="cart-close-btn" id="cart-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Empty state */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p className="cart-empty-emoji">🛍️</p>
            <h3>Your cart is empty</h3>
            <p>Add some awesome merchandise!</p>
            <button className="continue-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Delivery progress bar */}
            {totalPrice < DELIVERY_THRESHOLD && (
              <div className="delivery-bar">
                <p className="delivery-text">
                  Add{" "}
                  <strong>₹{DELIVERY_THRESHOLD - totalPrice}</strong> more for
                  FREE delivery!
                </p>
                <div className="delivery-progress-bg">
                  <div
                    className="delivery-progress-fill"
                    style={{
                      width: `${Math.min((totalPrice / DELIVERY_THRESHOLD) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {totalPrice >= DELIVERY_THRESHOLD && (
              <div className="delivery-bar delivery-achieved">
                🎉 You've unlocked FREE delivery!
              </div>
            )}

            {/* Cart items list — .map over cartItems array of objects */}
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const itemKey = `${item.id}-${item.selectedSize}`;
                return (
                  <div className="cart-item" key={itemKey} id={`cart-item-${itemKey}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-meta">
                        Size: <strong>{item.selectedSize}</strong>
                      </p>
                      <p className="cart-item-price">₹{item.price}</p>

                      {/* Quantity controls */}
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          id={`qty-minus-${itemKey}`}
                          onClick={() =>
                            updateQuantity(item.id, item.selectedSize, -1)
                          }
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          id={`qty-plus-${itemKey}`}
                          onClick={() =>
                            updateQuantity(item.id, item.selectedSize, +1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      className="remove-btn"
                      id={`remove-${itemKey}`}
                      onClick={() =>
                        removeFromCart(item.id, item.selectedSize)
                      }
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Cart summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className={deliveryCharges === 0 ? "free-delivery" : ""}>
                  {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
                </span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button className="checkout-btn" id="checkout-btn">
                Proceed to Checkout →
              </button>
              <button
                className="clear-btn"
                id="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;
