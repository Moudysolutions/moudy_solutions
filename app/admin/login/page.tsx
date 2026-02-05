"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (login(password)) {
            router.push("/admin");
        } else {
            setError("Mot de passe incorrect");
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--dark)",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            background: "var(--gradient-1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 20px",
                        }}
                    >
                        <i
                            className="fas fa-shield-alt"
                            style={{ fontSize: "2rem", color: "var(--dark)" }}
                        ></i>
                    </div>
                    <h1 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>
                        Administration
                    </h1>
                    <p style={{ color: "var(--text-muted)" }}>
                        Connectez-vous pour accéder au tableau de bord
                    </p>
                </div>

                {error && (
                    <div
                        className="flash-message error"
                        style={{ marginBottom: "20px" }}
                    >
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            <i className="fas fa-lock"></i> Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: "100%", marginTop: "20px" }}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Connexion...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i> Se connecter
                            </>
                        )}
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <a
                        href="/"
                        style={{ color: "var(--primary)", fontSize: "0.9rem" }}
                    >
                        <i className="fas fa-arrow-left"></i> Retour au site
                    </a>
                </div>
            </div>
        </div>
    );
}
