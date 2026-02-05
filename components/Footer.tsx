import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-waves">
                <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,100 350,0 500,50 C650,100 800,0 1000,50 C1200,100 1350,0 1440,50 L1440,100 L0,100 Z"></path>
                </svg>
            </div>

            <div className="footer-content">
                <div className="container">
                    <div className="footer-grid">
                        {/* About */}
                        <div className="footer-section">
                            <h3 className="footer-title">
                                <span className="logo-text">Moudy</span>
                                <span className="logo-accent">Solutions</span>
                            </h3>
                            <p className="footer-desc">
                                {siteConfig.tagline}. Nous transformons vos idées en réalité
                                numérique.
                            </p>
                            <div className="footer-social">
                                <a
                                    href={siteConfig.social.facebook}
                                    className="social-link"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    href={siteConfig.social.twitter}
                                    className="social-link"
                                    aria-label="Twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    href={siteConfig.social.linkedin}
                                    className="social-link"
                                    aria-label="LinkedIn"
                                >
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a
                                    href={siteConfig.social.instagram}
                                    className="social-link"
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Liens Rapides</h4>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/">
                                        <i className="fas fa-chevron-right"></i> Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <i className="fas fa-chevron-right"></i> Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/portfolio">
                                        <i className="fas fa-chevron-right"></i> Portfolio
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <i className="fas fa-chevron-right"></i> Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Nos Services</h4>
                            <ul className="footer-links">
                                <li>
                                    <Link href="/services">
                                        <i className="fas fa-chevron-right"></i> Développement Web
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <i className="fas fa-chevron-right"></i> Applications
                                        Mobiles
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <i className="fas fa-chevron-right"></i> Design UI/UX
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services">
                                        <i className="fas fa-chevron-right"></i> Marketing Digital
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="footer-section">
                            <h4 className="footer-heading">Contact</h4>
                            <ul className="footer-contact">
                                <li>
                                    <i className="fas fa-envelope"></i> {siteConfig.email}
                                </li>
                                <li>
                                    <i className="fas fa-phone"></i> {siteConfig.phone}
                                </li>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i> {siteConfig.address}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>
                        &copy; {currentYear} {siteConfig.name}. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
