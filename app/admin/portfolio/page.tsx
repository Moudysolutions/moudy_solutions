"use client";

import { useEffect, useState } from "react";
import { supabase, Project } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function AdminPortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showForm, setShowForm] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchProjects();
        if (searchParams.get("action") === "new") {
            setShowForm(true);
        }
    }, [searchParams]);

    async function fetchProjects() {
        const { data, error } = await supabase
            .from("portfolio")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setProjects(data || []);
        setLoading(false);
    }

    async function deleteProject(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

        const { error } = await supabase.from("portfolio").delete().eq("id", id);
        if (error) {
            alert("Erreur lors de la suppression");
        } else {
            setProjects(projects.filter((p) => p.id !== id));
        }
    }

    function openEdit(project: Project) {
        setEditingProject(project);
        setShowForm(true);
    }

    function openNew() {
        setEditingProject(null);
        setShowForm(true);
    }

    function closeForm() {
        setEditingProject(null);
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
                    <h1 style={{ fontSize: "2rem", marginBottom: "5px" }}>Portfolio</h1>
                    <p style={{ color: "var(--text-muted)" }}>Gérez vos projets</p>
                </div>
                <button className="btn btn-primary" onClick={openNew}>
                    <i className="fas fa-plus"></i> Nouveau projet
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onClose={closeForm}
                    onSave={() => {
                        closeForm();
                        fetchProjects();
                    }}
                />
            )}

            {/* Grid */}
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
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                borderRadius: "var(--radius-md)",
                                overflow: "hidden",
                            }}
                        >
                            {/* Image placeholder */}
                            <div
                                style={{
                                    height: "160px",
                                    background: "var(--gradient-1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <i
                                    className="fas fa-image"
                                    style={{ fontSize: "3rem", color: "var(--dark)" }}
                                ></i>
                                {project.status === "in-progress" && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "10px",
                                            right: "10px",
                                            background: "#FF6B6B",
                                            color: "#fff",
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        En cours
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: "20px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <span
                                        style={{
                                            background: "rgba(135, 206, 235, 0.2)",
                                            color: "var(--primary)",
                                            padding: "3px 10px",
                                            borderRadius: "15px",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: "10px" }}>{project.title}</h3>
                                <p
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: "0.9rem",
                                        marginBottom: "15px",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                {project.technologies && project.technologies.length > 0 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "5px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    background: "rgba(255,255,255,0.1)",
                                                    padding: "2px 8px",
                                                    borderRadius: "10px",
                                                    fontSize: "0.75rem",
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        onClick={() => openEdit(project)}
                                        className="btn btn-secondary"
                                        style={{ flex: 1, padding: "8px" }}
                                    >
                                        <i className="fas fa-edit"></i> Modifier
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project.id)}
                                        style={{
                                            background: "rgba(255, 107, 107, 0.2)",
                                            color: "#FF6B6B",
                                            border: "none",
                                            borderRadius: "8px",
                                            padding: "8px 15px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && projects.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "80px 20px",
                        background: "var(--glass-bg)",
                        borderRadius: "var(--radius-md)",
                    }}
                >
                    <i
                        className="fas fa-briefcase"
                        style={{
                            fontSize: "4rem",
                            color: "var(--text-muted)",
                            marginBottom: "20px",
                        }}
                    ></i>
                    <h3 style={{ marginBottom: "10px" }}>Aucun projet</h3>
                    <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                        Commencez par ajouter votre premier projet
                    </p>
                    <button className="btn btn-primary" onClick={openNew}>
                        <i className="fas fa-plus"></i> Ajouter un projet
                    </button>
                </div>
            )}
        </div>
    );
}

function ProjectForm({
    project,
    onClose,
    onSave,
}: {
    project: Project | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [formData, setFormData] = useState({
        title: project?.title || "",
        description: project?.description || "",
        category: project?.category || "web",
        type: project?.type || "web",
        image: project?.image || "",
        link: project?.link || "",
        technologies: project?.technologies?.join(", ") || "",
        status: project?.status || "completed",
    });
    const [saving, setSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const data = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            type: formData.type,
            image: formData.image,
            link: formData.link,
            technologies: formData.technologies
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
            status: formData.status,
        };

        let error;
        if (project) {
            ({ error } = await supabase
                .from("portfolio")
                .update(data)
                .eq("id", project.id));
        } else {
            ({ error } = await supabase.from("portfolio").insert([data]));
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
                    maxWidth: "600px",
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
                    <h2>{project ? "Modifier le projet" : "Nouveau projet"}</h2>
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

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <div className="form-group">
                            <label className="form-label">Catégorie</label>
                            <select
                                className="form-input"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                            >
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                                <option value="design">Design</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Statut</label>
                            <select
                                className="form-input"
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({ ...formData, status: e.target.value })
                                }
                            >
                                <option value="completed">Terminé</option>
                                <option value="in-progress">En cours</option>
                            </select>
                        </div>
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
                        <label className="form-label">Lien du projet</label>
                        <input
                            type="url"
                            className="form-input"
                            value={formData.link}
                            onChange={(e) =>
                                setFormData({ ...formData, link: e.target.value })
                            }
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Technologies (séparées par des virgules)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.technologies}
                            onChange={(e) =>
                                setFormData({ ...formData, technologies: e.target.value })
                            }
                            placeholder="Next.js, React, Tailwind"
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

const closeBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "var(--text-muted)",
    fontSize: "1.2rem",
    cursor: "pointer",
};
