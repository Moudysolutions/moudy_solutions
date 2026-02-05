import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase, Service, Project } from "@/lib/supabase";

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  return data || [];
}

async function getPortfolio(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const services = await getServices();
  const portfolio = await getPortfolio();

  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          <div className="hero-content">
            <span className="hero-badge">
              <i className="fas fa-rocket"></i> Solutions Numériques Innovantes
            </span>

            <h1 className="hero-title">
              Transformez vos idées en{" "}
              <span className="highlight">Réalité Numérique</span>
            </h1>

            <p className="hero-description">
              Nous créons des solutions web et mobiles sur mesure pour propulser
              votre entreprise vers le succès digital.
            </p>

            <div className="hero-buttons">
              <Link href="/contact" className="btn btn-primary btn-glow">
                <i className="fas fa-paper-plane"></i> Démarrer un Projet
              </Link>
              <Link href="/portfolio" className="btn btn-secondary">
                <i className="fas fa-eye"></i> Voir nos Réalisations
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section" style={{ background: "var(--dark-light)" }}>
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projets Réalisés</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Clients Satisfaits</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Années d&apos;Expérience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Disponible</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Nos Services</span>
              <h2 className="section-title">
                Ce que nous <span className="highlight">Proposons</span>
              </h2>
              <p className="section-description">
                Des solutions complètes pour répondre à tous vos besoins
                numériques
              </p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="card">
                  <div className="card-icon">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-description">{service.description}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link href="/services" className="btn btn-secondary">
                <i className="fas fa-arrow-right"></i> Voir tous les services
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="section" style={{ background: "var(--dark-light)" }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Portfolio</span>
              <h2 className="section-title">
                Nos Dernières <span className="highlight">Réalisations</span>
              </h2>
              <p className="section-description">
                Découvrez quelques-uns de nos projets récents
              </p>
            </div>

            <div className="portfolio-grid">
              {portfolio.map((item) => (
                <div key={item.id} className="portfolio-item">
                  <div
                    className="portfolio-image"
                    style={{
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
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{item.category}</span>
                    <h3 className="portfolio-title">{item.title}</h3>
                    <Link href={item.link || "#"} className="portfolio-link">
                      Voir le projet <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Link href="/portfolio" className="btn btn-secondary">
                <i className="fas fa-briefcase"></i> Voir tout le portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="section parallax-container"
          style={{ background: "var(--gradient-dark)", padding: "100px 0" }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                Prêt à démarrer votre projet ?
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.2rem",
                  marginBottom: "40px",
                  maxWidth: "600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Contactez-nous dès aujourd&apos;hui et discutons de la façon
                dont nous pouvons vous aider à atteindre vos objectifs.
              </p>
              <Link href="/contact" className="btn btn-primary btn-glow">
                <i className="fas fa-comments"></i> Contactez-nous
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
