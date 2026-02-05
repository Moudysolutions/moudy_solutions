"use client";

import { useEffect, useState } from "react";
import { supabase, Message } from "@/lib/supabase";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error(error);
        else setMessages(data || []);
        setLoading(false);
    }

    async function markAsRead(id: string) {
        const { error } = await supabase
            .from("messages")
            .update({ read: true })
            .eq("id", id);

        if (!error) {
            setMessages(
                messages.map((m) => (m.id === id ? { ...m, read: true } : m))
            );
        }
    }

    async function deleteMessage(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;

        const { error } = await supabase.from("messages").delete().eq("id", id);
        if (!error) {
            setMessages(messages.filter((m) => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    }

    function openMessage(message: Message) {
        setSelectedMessage(message);
        if (!message.read) {
            markAsRead(message.id!);
        }
    }

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div style={{ padding: "30px" }}>
            {/* Header */}
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "5px" }}>
                    Messages
                    {unreadCount > 0 && (
                        <span
                            style={{
                                background: "#FF6B6B",
                                color: "#fff",
                                padding: "3px 12px",
                                borderRadius: "20px",
                                fontSize: "0.9rem",
                                marginLeft: "15px",
                                verticalAlign: "middle",
                            }}
                        >
                            {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
                        </span>
                    )}
                </h1>
                <p style={{ color: "var(--text-muted)" }}>
                    Messages reçus via le formulaire de contact
                </p>
            </div>

            {/* Message Detail Modal */}
            {selectedMessage && (
                <MessageDetail
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                    onDelete={() => {
                        deleteMessage(selectedMessage.id!);
                    }}
                />
            )}

            {/* Messages List */}
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
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            onClick={() => openMessage(message)}
                            style={{
                                padding: "20px",
                                borderBottom: "1px solid var(--glass-border)",
                                cursor: "pointer",
                                display: "flex",
                                gap: "15px",
                                alignItems: "flex-start",
                                background: message.read
                                    ? "transparent"
                                    : "rgba(135, 206, 235, 0.05)",
                                transition: "background 0.2s",
                            }}
                        >
                            {/* Avatar */}
                            <div
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                    background: message.read
                                        ? "rgba(255,255,255,0.1)"
                                        : "var(--gradient-1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <i
                                    className="fas fa-user"
                                    style={{
                                        color: message.read ? "var(--text-muted)" : "var(--dark)",
                                    }}
                                ></i>
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: message.read ? 400 : 600,
                                        }}
                                    >
                                        {message.name}
                                    </span>
                                    <span
                                        style={{
                                            color: "var(--text-muted)",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        {message.created_at
                                            ? new Date(message.created_at).toLocaleDateString("fr-FR", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : ""}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        color: "var(--primary)",
                                        fontSize: "0.9rem",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {message.email}
                                </div>
                                {message.subject && (
                                    <div
                                        style={{
                                            fontWeight: message.read ? 400 : 600,
                                            marginBottom: "5px",
                                        }}
                                    >
                                        {message.subject}
                                    </div>
                                )}
                                <p
                                    style={{
                                        color: "var(--text-muted)",
                                        fontSize: "0.9rem",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        margin: 0,
                                    }}
                                >
                                    {message.message}
                                </p>
                            </div>

                            {/* Unread indicator */}
                            {!message.read && (
                                <div
                                    style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        background: "var(--primary)",
                                        flexShrink: 0,
                                    }}
                                ></div>
                            )}
                        </div>
                    ))}

                    {messages.length === 0 && (
                        <div style={{ textAlign: "center", padding: "80px 20px" }}>
                            <i
                                className="fas fa-inbox"
                                style={{
                                    fontSize: "4rem",
                                    color: "var(--text-muted)",
                                    marginBottom: "20px",
                                }}
                            ></i>
                            <h3 style={{ marginBottom: "10px" }}>Aucun message</h3>
                            <p style={{ color: "var(--text-muted)" }}>
                                Les messages du formulaire de contact apparaîtront ici
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function MessageDetail({
    message,
    onClose,
    onDelete,
}: {
    message: Message;
    onClose: () => void;
    onDelete: () => void;
}) {
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
                {/* Header */}
                <div
                    style={{
                        padding: "20px",
                        borderBottom: "1px solid var(--glass-border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>Message</h2>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={onDelete}
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
                        <button onClick={onClose} style={closeBtn}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                    {/* Sender info */}
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            marginBottom: "25px",
                        }}
                    >
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                background: "var(--gradient-1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <i
                                className="fas fa-user"
                                style={{ fontSize: "1.3rem", color: "var(--dark)" }}
                            ></i>
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                                {message.name}
                            </div>
                            <a
                                href={`mailto:${message.email}`}
                                style={{ color: "var(--primary)" }}
                            >
                                {message.email}
                            </a>
                            {message.phone && (
                                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                    <i className="fas fa-phone"></i> {message.phone}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subject */}
                    {message.subject && (
                        <div style={{ marginBottom: "20px" }}>
                            <div
                                style={{
                                    color: "var(--text-muted)",
                                    fontSize: "0.85rem",
                                    marginBottom: "5px",
                                }}
                            >
                                Sujet
                            </div>
                            <div style={{ fontWeight: 600 }}>{message.subject}</div>
                        </div>
                    )}

                    {/* Message */}
                    <div>
                        <div
                            style={{
                                color: "var(--text-muted)",
                                fontSize: "0.85rem",
                                marginBottom: "10px",
                            }}
                        >
                            Message
                        </div>
                        <div
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                padding: "20px",
                                borderRadius: "var(--radius-md)",
                                lineHeight: 1.7,
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {message.message}
                        </div>
                    </div>

                    {/* Date */}
                    <div
                        style={{
                            marginTop: "20px",
                            color: "var(--text-muted)",
                            fontSize: "0.85rem",
                            textAlign: "right",
                        }}
                    >
                        Reçu le{" "}
                        {message.created_at
                            ? new Date(message.created_at).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : ""}
                    </div>

                    {/* Reply button */}
                    <div style={{ marginTop: "25px" }}>
                        <a
                            href={`mailto:${message.email}?subject=Re: ${message.subject || "Votre message"}`}
                            className="btn btn-primary"
                            style={{ width: "100%", textAlign: "center" }}
                        >
                            <i className="fas fa-reply"></i> Répondre
                        </a>
                    </div>
                </div>
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
