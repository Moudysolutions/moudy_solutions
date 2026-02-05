"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase, Project } from "@/lib/supabase";

const typeLabels: Record<string, string> = {
    web: "App Web",
    mobile: "App Mobile",
    desktop: "App Desktop",
    design: "Design",
    logo: "Logo",
    flyer: "Flyer",
};

const categoryDescriptions: Record<string, { title: string; desc: string }> = {
    all: {
        title: "Tous nos Projets",
        desc: "Découvrez l'ensemble de nos réalisations en design et développement",
    },
    web: {
        title: "Applications Web",
        desc: "Sites web et applications web développés avec les technologies modernes",
    },
    mobile: {
        title: "Applications Mobiles",
        desc: "Applications iOS et Android développées avec Flutter et technologies natives",
    },
    design: {
        title: "Design Graphique",
        desc: "Créations graphiques professionnelles réalisées avec Adobe Creative Suite",
    },
};

export default function PortfolioPage() {
    const [filter, setFilter] = useState("all");
    const [portfolio, setPortfolio] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPortfolio() {
            const { data, error } = await supabase
                .from("portfolio")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching portfolio:", error);
            } else {
                setPortfolio(data || []);
            }
            setLoading(false);
        }

        fetchPortfolio();
    }, []);

    const categories = Array.from(new Set(portfolio.map((p) => p.category)));

    const filteredPortfolio =
        filter === "all"
            ? portfolio
            : portfolio.filter((p) => p.category === filter);

    const currentDescription =
        categoryDescriptions[filter] || categoryDescriptions.all;

    return (
        <>
            <Header />
            <main className="main-content">
                {/* Page Header */}
                <section
                    className="section"
                    style={{ paddingTop: "150px", paddingBottom: "30px" }}
                >
                    <div className="container">
                        <div className="section-header">
                            <h1 className="section-title">
                                Notre Portfolio de{" "}
                                <span className="highlight">Réalisations</span>
                            </h1>
                            <p
                                className="section-description"
                                style={{ fontSize: "1.15rem" }}
                            >
                                Explorez nos projets en design graphique et développement
                                d&apos;applications. Chaque création est unique et adaptée aux
                                besoins spécifiques de nos clients.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Portfolio Section */}
                <section className="section" style={{ paddingTop: 0 }}>
                    <div className="container">
                        {/* Filters */}
                        <div className="portfolio-filters">
                            <button
                                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                                onClick={() => setFilter("all")}
                            >
                                Tous les projets
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`filter-btn ${filter === category ? "active" : ""}`}
                                    onClick={() => setFilter(category)}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Category Description */}
                        <div className="category-description">
                            <div className="description-content active">
                                <h2>{currentDescription.title}</h2>
                                <p>{currentDescription.desc}</p>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div style={{ textAlign: "center", padding: "40px" }}>
                                <i
                                    className="fas fa-spinner fa-spin"
                                    style={{ fontSize: "2rem", color: "var(--primary)" }}
                                ></i>
                                <p style={{ marginTop: "15px", color: "var(--text-muted)" }}>
                                    Chargement...
                                </p>
                            </div>
                        )}

                        {/* Projects Grid */}
                        {!loading && (
                            <div className="projects-grid">
                                {filteredPortfolio.map((project) => {
                                    const typeLabel =
                                        typeLabels[project.type || project.category] ||
                                        project.category.charAt(0).toUpperCase() +
                                        project.category.slice(1);
                                    const isInProgress = project.status === "in-progress";

                                    return (
                                        <div key={project.id} className="project-card">
                                            <div className="project-image">
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        background: "var(--gradient-1)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    <i
                                                        className="fas fa-image"
                                                        style={{ fontSize: "3rem", color: "var(--dark)" }}
                                                    ></i>
                                                </div>
                                                {isInProgress && (
                                                    <div className="project-status">En cours</div>
                                                )}
                                                <div className="project-overlay">
                                                    <Link
                                                        href={project.link || "#"}
                                                        className="project-link-btn"
                                                    >
                                                        <i className="fas fa-external-link-alt"></i>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="project-content">
                                                <div className="project-type">{typeLabel}</div>
                                                <h3 className="project-title">{project.title}</h3>
                                                <p className="project-description">
                                                    {project.description}
                                                </p>

                                                {project.technologies &&
                                                    project.technologies.length > 0 && (
                                                        <div className="project-technologies">
                                                            {project.technologies.map((tech, idx) => (
                                                                <span key={idx} className="tech-tag">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {!loading && filteredPortfolio.length === 0 && (
                            <div style={{ textAlign: "center", padding: "80px 20px" }}>
                                <i
                                    className="fas fa-folder-open"
                                    style={{
                                        fontSize: "5rem",
                                        color: "var(--text-muted)",
                                        marginBottom: "25px",
                                    }}
                                ></i>
                                <h3 style={{ marginBottom: "15px" }}>
                                    Aucun projet dans le portfolio
                                </h3>
                                <p style={{ color: "var(--text-muted)" }}>
                                    Les projets seront ajoutés prochainement.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section
                    className="section portfolio-cta"
                    style={{ background: "var(--dark-light)" }}
                >
                    <div className="container" style={{ textAlign: "center" }}>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                            Vous avez un projet en tête ?
                        </h2>
                        <p
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "1.1rem",
                                marginBottom: "40px",
                            }}
                        >
                            Contactez-nous pour discuter de votre projet et voir comment nous
                            pouvons vous aider à concrétiser vos idées.
                        </p>
                        <Link href="/contact" className="btn btn-primary btn-glow">
                            <i className="fas fa-rocket"></i> Démarrer un Projet
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
