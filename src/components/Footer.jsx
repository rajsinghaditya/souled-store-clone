// =====================================================
// Footer.jsx
// Concepts: .map over arrays of objects for links
// =====================================================
import React from "react";
import "../styles/Footer.css";

function Footer() {
  // Array of objects — rendered with .map
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog",     href: "#" },
        { label: "Press",    href: "#" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "FAQs",             href: "#" },
        { label: "Size Guide",       href: "#" },
        { label: "Track My Order",   href: "#" },
        { label: "Returns Policy",   href: "#" },
      ],
    },
    {
      title: "Shop",
      links: [
        { label: "Men",   href: "#" },
        { label: "Women", href: "#" },
        { label: "Kids",  href: "#" },
        { label: "Sale",  href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: "📘", label: "Facebook" },
    { icon: "📸", label: "Instagram" },
    { icon: "🐦", label: "Twitter" },
    { icon: "▶️",  label: "YouTube" },
  ];

  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon-sm">S</span>
            <span>The Souled Store</span>
          </div>
          <p className="footer-tagline">
            India's #1 Officially Licensed Fan Merchandise Store.
            Find your fandom, wear your passion.
          </p>
          {/* Social — .map over socialLinks */}
          <div className="footer-social">
            {socialLinks.map((s) => (
              <a key={s.label} href="#" className="social-link" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links — .map over footerLinks array of objects */}
        {footerLinks.map((section) => (
          <div key={section.title} className="footer-section">
            <h4 className="footer-section-title">{section.title}</h4>
            <ul className="footer-links">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© 2024 The Souled Store. All rights reserved.</p>
        <div className="footer-payments">
          {["💳 Visa", "💳 Mastercard", "📱 UPI", "💰 COD"].map((p) => (
            <span key={p} className="payment-badge">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
