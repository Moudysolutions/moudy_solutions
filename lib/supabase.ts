import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les tables
export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    created_at?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    image: string;
    link: string;
    technologies: string[];
    status: string;
    created_at?: string;
}

export interface Message {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    read?: boolean;
    created_at?: string;
}
