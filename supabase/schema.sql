-- ===========================================
-- Moudy Solutions - Supabase Schema
-- Exécutez ce script dans Supabase SQL Editor
-- ===========================================

-- Table des services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des projets (portfolio)
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  type TEXT,
  image TEXT,
  link TEXT,
  technologies TEXT[],
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique (services et portfolio)
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON portfolio FOR SELECT USING (true);

-- Policy pour insertion publique des messages (formulaire contact)
CREATE POLICY "Allow public insert" ON messages FOR INSERT WITH CHECK (true);

-- Policies pour les opérations admin (services)
CREATE POLICY "Allow all for services" ON services FOR ALL USING (true);

-- Policies pour les opérations admin (portfolio)
CREATE POLICY "Allow all for portfolio" ON portfolio FOR ALL USING (true);

-- Policies pour les opérations admin (messages)
CREATE POLICY "Allow all for messages" ON messages FOR ALL USING (true);

-- ===========================================
-- Données initiales - Services
-- ===========================================
INSERT INTO services (title, description, icon, features) VALUES
('Développement Web', 'Création de sites web modernes, responsives et optimisés pour le référencement. Solutions sur mesure adaptées à vos besoins.', 'fa-code', ARRAY['Sites vitrine', 'E-commerce', 'Applications web', 'SEO optimisé']),
('Applications Mobiles', 'Développement d''applications mobiles natives et hybrides pour iOS et Android. Expérience utilisateur exceptionnelle.', 'fa-mobile-alt', ARRAY['iOS & Android', 'Design moderne', 'Performance optimale', 'Maintenance incluse']),
('Design graphique', 'Conception des logos et des flyer et tout sorte des support de communications', 'fa-palette', ARRAY['Logo', 'Support des communication', 'Identité visuelle']),
('Marketing Digital', 'Stratégies de marketing digital pour augmenter votre visibilité en ligne et attirer plus de clients.', 'fa-bullhorn', ARRAY['SEO/SEM', 'Réseaux sociaux', 'Email marketing', 'Analytics']),
('Maintenance & Support', 'Services de maintenance et support technique pour assurer le bon fonctionnement de vos projets.', 'fa-wrench', ARRAY['Mises à jour', 'Sécurité', 'Optimisation', 'Assistance technique']);

-- ===========================================
-- Données initiales - Portfolio
-- ===========================================
INSERT INTO portfolio (title, description, category, type, image, link, technologies, status) VALUES
('Site E-commerce Mode', 'Boutique en ligne complète avec paiement intégré et gestion des stocks', 'web', 'web', '/images/portfolio/ecommerce.jpg', '#', ARRAY['Next.js', 'Stripe', 'PostgreSQL'], 'completed'),
('Application Mobile Livraison', 'Application de livraison de repas avec géolocalisation et suivi en temps réel', 'mobile', 'mobile', '/images/portfolio/delivery-app.jpg', '#', ARRAY['Flutter', 'Firebase', 'Google Maps'], 'completed'),
('Identité Visuelle Restaurant', 'Création complète de l''identité visuelle pour un restaurant gastronomique', 'design', 'design', '/images/portfolio/restaurant-branding.jpg', '#', ARRAY['Illustrator', 'Photoshop'], 'completed');
