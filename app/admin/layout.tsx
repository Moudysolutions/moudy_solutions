"use client";

import { AuthProvider, useAuth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

function AdminContent({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isAuthenticated && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [isAuthenticated, pathname, router]);

    // Show login page without layout
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Wait for auth check
    if (!isAuthenticated) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--dark)",
                }}
            >
                <i
                    className="fas fa-spinner fa-spin"
                    style={{ fontSize: "2rem", color: "var(--primary)" }}
                ></i>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: "260px",
                    background: "var(--dark-light)",
                    borderRight: "1px solid var(--glass-border)",
                    padding: "20px 0",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    overflowY: "auto",
                }}
            >
                {/* Logo */}
                <div style={{ padding: "0 20px", marginBottom: "30px" }}>
                    <Link
                        href="/admin"
                        style={{
                            fontSize: "1.4rem",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <span className="logo-text">Moudy</span>
                        <span className="logo-accent">Admin</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav>
                    <NavLink href="/admin" icon="fa-tachometer-alt" exact>
                        Dashboard
                    </NavLink>
                    <NavLink href="/admin/services" icon="fa-cogs">
                        Services
                    </NavLink>
                    <NavLink href="/admin/portfolio" icon="fa-briefcase">
                        Portfolio
                    </NavLink>
                    <NavLink href="/admin/messages" icon="fa-envelope">
                        Messages
                    </NavLink>
                </nav>

                {/* Footer */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "20px",
                        borderTop: "1px solid var(--glass-border)",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "var(--text-muted)",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <i className="fas fa-external-link-alt"></i>
                        Voir le site
                    </Link>
                    <button
                        onClick={logout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#ff6b6b",
                            padding: "10px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            width: "100%",
                            fontSize: "1rem",
                        }}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                style={{
                    flex: 1,
                    marginLeft: "260px",
                    background: "var(--dark)",
                    minHeight: "100vh",
                }}
            >
                {children}
            </main>
        </div>
    );
}

function NavLink({
    href,
    icon,
    children,
    exact = false,
}: {
    href: string;
    icon: string;
    children: React.ReactNode;
    exact?: boolean;
}) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
        <Link
            href={href}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                color: isActive ? "var(--primary)" : "var(--text-light)",
                background: isActive ? "rgba(135, 206, 235, 0.1)" : "transparent",
                borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                transition: "all 0.2s ease",
            }}
        >
            <i className={`fas ${icon}`} style={{ width: "20px" }}></i>
            {children}
        </Link>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminContent>{children}</AdminContent>
        </AuthProvider>
    );
}
