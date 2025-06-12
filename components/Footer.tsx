'use client'

import {
    IconBrandTwitter,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandInstagram,
    IconMail,
    IconPhone,
    IconMapPin,
    IconArrowUp
} from "@tabler/icons-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = {
        product: [
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "API", href: "#api" },
            { name: "Documentation", href: "#docs" },
        ],
        company: [
            { name: "About", href: "#about" },
            { name: "Blog", href: "#blog" },
            { name: "Careers", href: "#careers" },
            { name: "Press", href: "#press" },
        ],
        support: [
            { name: "Help Center", href: "#help" },
            { name: "Contact", href: "#contact" },
            { name: "Status", href: "#status" },
            { name: "Community", href: "#community" },
        ],
        legal: [
            { name: "Privacy", href: "#privacy" },
            { name: "Terms", href: "#terms" },
            { name: "Cookie Policy", href: "#cookies" },
            { name: "Licenses", href: "#licenses" },
        ],
    };

    const socialLinks = [
        { name: "Twitter", icon: IconBrandTwitter, href: "#twitter" },
        { name: "GitHub", icon: IconBrandGithub, href: "#github" },
        { name: "LinkedIn", icon: IconBrandLinkedin, href: "#linkedin" },
        { name: "Instagram", icon: IconBrandInstagram, href: "#instagram" },
    ];

    return (
        <footer className="bg-slate-900 border-t border-slate-800 relative w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 flex flex-col items-center justify-center">
                <p className="text-sm text-slate-400 break-words max-w-full">
                    © {new Date().getFullYear()} Made with <span className="text-red-500 animate-pulse">♥</span> by <strong>GitDocs</strong>
                </p>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50"
                aria-label="Scroll to top"
            >
                <IconArrowUp size={16} />
            </button>
        </footer>
    );
}

