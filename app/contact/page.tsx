"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";
import { supabase, Message } from "@/lib/supabase";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            setErrorMessage("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setStatus("loading");

        // Send to Supabase
        const messageData: Message = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            subject: formData.subject || undefined,
            message: formData.message,
        };

        const { error } = await supabase.from("messages").insert([messageData]);

        if (error) {
            console.error("Error sending message:", error);
            setStatus("error");
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        } else {
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (status === "error") setStatus("idle");
    };

    return (
        <>
            <Header />
            <main className="main-content">
                {/* Page Header */}
                <section
                    className="section"
                    style={{ paddingTop: "150px", paddingBottom: "50px" }}
                >
                    <div className="container">
                        <div className="section-header">
                            <span className="section-badge">
                                <i className="fas fa-envelope"></i> Contact
                            </span>
                            <h1 className="section-title">
                                Contactez-<span className="highlight">nous</span>
                            </h1>
                            <p className="section-description">
                                Nous sommes là pour répondre à toutes vos questions
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div className="contact-grid">
                            {/* Contact Info */}
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <div className="contact-label">Adresse</div>
                                        <div className="contact-value">{siteConfig.address}</div>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <div className="contact-label">Email</div>
                                        <div className="contact-value">{siteConfig.email}</div>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <div className="contact-label">Téléphone</div>
                                        <div className="contact-value">{siteConfig.phone}</div>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <div className="contact-label">Horaires</div>
                                        <div className="contact-value">Lun - Ven: 8h - 18h</div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div style={{ marginTop: "30px" }}>
                                    <h4 style={{ marginBottom: "20px" }}>Suivez-nous</h4>
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
                                        <a
                                            href={siteConfig.social.whatsapp}
                                            className="social-link"
                                            aria-label="WhatsApp"
                                        >
                                            <i className="fab fa-whatsapp"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="contact-form">
                                {status === "success" && (
                                    <div className="flash-message success">
                                        <i className="fas fa-check-circle"></i>
                                        Votre message a été envoyé avec succès !
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="flash-message error">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {errorMessage}
                                    </div>
                                )}

                                <h3 style={{ marginBottom: "30px", fontSize: "1.5rem" }}>
                                    Envoyez-nous un message
                                </h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">
                                                Nom complet *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-input"
                                                placeholder="Votre nom"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-input"
                                                placeholder="votre@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="phone">
                                                Téléphone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-input"
                                                placeholder="+227 XX XX XX XX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="subject">
                                                Sujet
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                className="form-input"
                                                placeholder="Objet du message"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="message">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-textarea"
                                            placeholder="Décrivez votre projet ou posez votre question..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-glow"
                                        style={{ width: "100%" }}
                                        disabled={status === "loading"}
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane"></i> Envoyer le Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section
                    className="section"
                    style={{ background: "var(--dark-light)", padding: 0 }}
                >
                    <div
                        style={{
                            background: "var(--glass-bg)",
                            height: "400px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <i
                                className="fas fa-map-marked-alt"
                                style={{
                                    fontSize: "4rem",
                                    color: "var(--secondary)",
                                    marginBottom: "20px",
                                }}
                            ></i>
                            <h3 style={{ marginBottom: "10px" }}>Notre Localisation</h3>
                            <p style={{ color: "var(--text-muted)" }}>{siteConfig.address}</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
