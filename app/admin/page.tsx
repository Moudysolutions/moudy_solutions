"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stats {
    services: number;
    portfolio: number;
    messages: number;
    unreadMessages: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        services: 0,
        portfolio: 0,
        messages: 0,
        unreadMessages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [servicesRes, portfolioRes, messagesRes, unreadRes] =
                await Promise.all([
                    supabase.from("services").select("id", { count: "exact" }),
                    supabase.from("portfolio").select("id", { count: "exact" }),
                    supabase.from("messages").select("id", { count: "exact" }),
                    supabase
                        .from("messages")
                        .select("id", { count: "exact" })
                        .eq("read", false),
                ]);

            setStats({
                services: servicesRes.count || 0,
                portfolio: portfolioRes.count || 0,
                messages: messagesRes.count || 0,
                unreadMessages: unreadRes.count || 0,
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            {/* Header */}
            <div style={{ marginBottom: "40px" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
                    Tableau de bord
                </h1>
                <p style={{ color: "var(--text-muted)" }}>
                    Bienvenue dans l&apos;administration de Moudy Solutions
                </p>
            </div>

            {/* Stats Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                    marginBottom: "40px",
                }}
            >
                <StatCard
                    icon="fa-cogs"
                    label="Services"
                    value={stats.services}
                    loading={loading}
                    href="/admin/services"
                    color="#87CEEB"
                />
                <StatCard
                    icon="fa-briefcase"
                    label="Projets"
                    value={stats.portfolio}
                    loading={loading}
                    href="/admin/portfolio"
                    color="#00CED1"
                />
                <StatCard
                    icon="fa-envelope"
                    label="Messages"
                    value={stats.messages}
                    loading={loading}
                    href="/admin/messages"
                    color="#9370DB"
                />
                <StatCard
                    icon="fa-bell"
                    label="Non lus"
                    value={stats.unreadMessages}
                    loading={loading}
                    href="/admin/messages"
                    color="#FF6B6B"
                />
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>
                    Actions rapides
                </h2>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    <Link href="/admin/services?action=new" className="btn btn-primary">
                        <i className="fas fa-plus"></i> Nouveau service
                    </Link>
                    <Link
                        href="/admin/portfolio?action=new"
                        className="btn btn-secondary"
                    >
                        <i className="fas fa-plus"></i> Nouveau projet
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="btn btn-secondary"
                        style={{
                            background: stats.unreadMessages > 0 ? "#FF6B6B" : undefined,
                            borderColor: stats.unreadMessages > 0 ? "#FF6B6B" : undefined,
                            color: stats.unreadMessages > 0 ? "#fff" : undefined,
                        }}
                    >
                        <i className="fas fa-envelope"></i> Voir les messages
                        {stats.unreadMessages > 0 && ` (${stats.unreadMessages})`}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    loading,
    href,
    color,
}: {
    icon: string;
    label: string;
    value: number;
    loading: boolean;
    href: string;
    color: string;
}) {
    return (
        <Link
            href={href}
            style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "var(--radius-md)",
                padding: "25px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                transition: "all 0.2s ease",
            }}
        >
            <div
                style={{
                    width: "60px",
                    height: "60px",
                    background: `${color}20`,
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <i className={`fas ${icon}`} style={{ fontSize: "1.5rem", color }}></i>
            </div>
            <div>
                <div
                    style={{
                        fontSize: "2rem",
                        fontWeight: 700,
                        color,
                        lineHeight: 1,
                    }}
                >
                    {loading ? (
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: "1.5rem" }}></i>
                    ) : (
                        value
                    )}
                </div>
                <div style={{ color: "var(--text-muted)", marginTop: "5px" }}>
                    {label}
                </div>
            </div>
        </Link>
    );
}
