"use client";

import { useEffect, useState } from "react";
import { supabase, Service } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [showForm, setShowForm] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchServices();
        if (searchParams.get("action") === "new") {
            setShowForm(true);
        }
    }, [searchParams]);

    async function fetchServices() {
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .order("created_at", { ascending: true });

        if (error) console.error(error);
        else setServices(data || []);
        setLoading(false);
    }

    async function deleteService(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;

        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) {
            alert("Erreur lors de la suppression");
        } else {
            setServices(services.filter((s) => s.id !== id));
        }
    }

    function openEdit(service: Service) {
        setEditingService(service);
        setShowForm(true);
    }

    function openNew() {
        setEditingService(null);
        setShowForm(true);
    }

    function closeForm() {
        setEditingService(null);
        setShowForm(false);
    }

    return (
        <div style={{ padding: "30px" }}>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "2rem", marginBottom: "5px" }}>Services</h1>
                    <p style={{ color: "var(--text-muted)" }}>
                        Gérez les services proposés
                    </p>
                </div>
                <button className="btn btn-primary" onClick={openNew}>
                    <i className="fas fa-plus"></i> Nouveau service
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <ServiceForm
                    service={editingService}
                    onClose={closeForm}
                    onSave={() => {
                        closeForm();
                        fetchServices();
                    }}
                />
            )}

            {/* Table */}
            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <i
                        className="fas fa-spinner fa-spin"
                        style={{ fontSize: "2rem", color: "var(--primary)" }}
                    ></i>
                </div>
            ) : (
                <div
                    style={{
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                                <th style={thStyle}>Icône</th>
                                <th style={thStyle}>Titre</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} style={{ borderBottom: "1px solid var(--glass-border)" }}>
                                    <td style={tdStyle}>
                                        <i
                                            className={`fas ${service.icon}`}
                                            style={{
                                                fontSize: "1.5rem",
                                                color: "var(--primary)",
                                            }}
                                        ></i>
                                    </td>
                                    <td style={tdStyle}>{service.title}</td>
                                    <td style={{ ...tdStyle, maxWidth: "300px" }}>
                                        <span
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                color: "var(--text-muted)",
                                            }}
                                        >
                                            {service.description}
                                        </span>
                                    </td>
                                    <td style={tdStyle}>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <button
                                                onClick={() => openEdit(service)}
                                                style={{
                                                    ...btnSmall,
                                                    background: "rgba(135, 206, 235, 0.2)",
                                                    color: "var(--primary)",
                                                }}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => deleteService(service.id)}
                                                style={{
                                                    ...btnSmall,
                                                    background: "rgba(255, 107, 107, 0.2)",
                                                    color: "#FF6B6B",
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {services.length === 0 && (
                        <div style={{ textAlign: "center", padding: "50px" }}>
                            <i
                                className="fas fa-cogs"
                                style={{
                                    fontSize: "3rem",
                                    color: "var(--text-muted)",
                                    marginBottom: "15px",
                                }}
                            ></i>
                            <p style={{ color: "var(--text-muted)" }}>Aucun service</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ServiceForm({
    service,
    onClose,
    onSave,
}: {
    service: Service | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [formData, setFormData] = useState({
        title: service?.title || "",
        description: service?.description || "",
        icon: service?.icon || "fa-code",
        features: service?.features?.join("\n") || "",
    });
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const data = {
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            features: formData.features.split("\n").filter((f) => f.trim()),
        };

        let error;
        if (service) {
            ({ error } = await supabase
                .from("services")
                .update(data)
                .eq("id", service.id));
        } else {
            ({ error } = await supabase.from("services").insert([data]));
        }

        if (error) {
            alert("Erreur: " + error.message);
            setSaving(false);
        } else {
            onSave();
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "var(--dark-light)",
                    borderRadius: "var(--radius-lg)",
                    width: "100%",
                    maxWidth: "500px",
                    maxHeight: "90vh",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        padding: "20px",
                        borderBottom: "1px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>{service ? "Modifier le service" : "Nouveau service"}</h2>
                    <button onClick={onClose} style={closeBtn}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
                    <div className="form-group">
                        <label className="form-label">Titre</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Icône (Font Awesome)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.icon}
                            onChange={(e) =>
                                setFormData({ ...formData, icon: e.target.value })
                            }
                            placeholder="fa-code"
                        />
                        <small style={{ color: "var(--text-muted)" }}>
                            Ex: fa-code, fa-mobile-alt, fa-palette
                        </small>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Fonctionnalités (une par ligne)</label>
                        <textarea
                            className="form-textarea"
                            value={formData.features}
                            onChange={(e) =>
                                setFormData({ ...formData, features: e.target.value })
                            }
                            rows={4}
                            placeholder="Sites vitrine&#10;E-commerce&#10;Applications web"
                        />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                            style={{ flex: 1 }}
                        >
                            {saving ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fas fa-save"></i>
                            )}{" "}
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: "15px",
    textAlign: "left",
    fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
    padding: "15px",
};

const btnSmall: React.CSSProperties = {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const closeBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "1.2rem",
    cursor: "pointer",
};
