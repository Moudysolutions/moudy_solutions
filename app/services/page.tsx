import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { supabase, Service } from "@/lib/supabase";

export const metadata: Metadata = {
    title: "Nos Services",
    description:
        "Une gamme complète de services digitaux pour accompagner votre entreprise dans sa transformation numérique.",
};

const phases = [
    {
        step: "1",
        title: "Analyse et Conception",
        description:
            "Évaluation approfondie de vos besoins pour une solution sur mesure",
    },
    {
        step: "2",
        title: "Planification et Design",
        description:
            "Élaboration de solutions personnalisées et plan d'implémentation",
    },
    {
        step: "3",
        title: "Développement",
        description: "Mise en œuvre experte avec contrôle qualité rigoureux",
    },
    {
        step: "4",
        title: "Support et Évolution",
        description: "Maintenance continue et assistance technique proactive",
    },
];

async function getServices(): Promise<Service[]> {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    return data || [];
}

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <>
            <Header />
            <main className="main-content">
                {/* Hero Section */}
                <section className="section" style={{ paddingTop: "150px", paddingBottom: "30px" }}>
                    <div className="container">
                        <div className="services-hero">
                            <h1 className="section-title">
                                Nos Services Professionnels{" "}
                                <span className="highlight">Complets</span>
                            </h1>
                            <p
                                className="section-description"
                                style={{ fontSize: "1.15rem", maxWidth: "800px", margin: "0 auto" }}
                            >
                                Une gamme complète de services digitaux pour accompagner votre
                                entreprise dans sa transformation numérique. De la conception à
                                la maintenance, nous couvrons tous vos besoins technologiques.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div className="services-grid-new">
                            {services.map((service) => (
                                <div key={service.id} className="service-card-new">
                                    <div className="service-icon">
                                        <i className={`fas ${service.icon}`}></i>
                                    </div>
                                    <h2 className="service-title">{service.title}</h2>
                                    <p className="service-description">{service.description}</p>

                                    {service.features && service.features.length > 0 && (
                                        <ul className="service-features">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="feature-item-list">
                                                    <i className="fas fa-check feature-icon-check"></i>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section
                    className="section process-section"
                    style={{ background: "var(--dark-light)" }}
                >
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">
                                Notre Méthodologie de <span className="highlight">Travail</span>
                            </h2>
                            <p className="section-description">
                                Une approche structurée pour garantir le succès de votre projet
                            </p>
                        </div>

                        <div className="process-steps">
                            {phases.map((phase, index) => (
                                <div key={phase.step} className="process-step">
                                    <div className="step-number">{phase.step}</div>
                                    <h3 className="step-title">{phase.title}</h3>
                                    <p className="step-description">{phase.description}</p>
                                    {index < phases.length - 1 && (
                                        <div className="step-connector"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section
                    className="section services-cta"
                    style={{ background: "var(--gradient-dark)" }}
                >
                    <div className="container" style={{ textAlign: "center" }}>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                            Besoin d&apos;une Solution sur Mesure ?
                        </h2>
                        <p
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "1.1rem",
                                marginBottom: "40px",
                                maxWidth: "700px",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            Du développement web au design graphique, nous avons
                            l&apos;expertise pour répondre à tous vos besoins. Discutons de
                            votre projet dès aujourd&apos;hui.
                        </p>
                        <div
                            className="cta-buttons"
                            style={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Link href="/contact" className="btn btn-primary btn-glow">
                                <i className="fas fa-paper-plane"></i> Demander un devis
                            </Link>
                            <a href="tel:+22791919238" className="btn btn-secondary">
                                <i className="fas fa-phone"></i> Appeler maintenant
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
