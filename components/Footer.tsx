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
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                {/*<div className="py-12 lg:py-16">*/}
                {/*    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">*/}
                {/*        /!* Company Info *!/*/}
                {/*        <div className="lg:col-span-2">*/}
                {/*            <div className="flex items-center space-x-2 mb-4">*/}
                {/*                <h3 className="text-4xl font-bold text-white">GitDocs</h3>*/}
                {/*            </div>*/}
                {/*            <p className="text-slate-400 mb-6 max-w-sm">*/}
                {/*                Built for engineers, developers, dreamers, thinkers and doers.*/}
                {/*                Empowering the future with AI-driven solutions.*/}
                {/*            </p>*/}

                {/*            /!* Contact Info *!/*/}
                {/*            /!*<div className="space-y-2 text-sm text-slate-400">*!/*/}
                {/*            /!*    <div className="flex items-center space-x-2">*!/*/}
                {/*            /!*        <IconMail size={16} />*!/*/}
                {/*            /!*        <span>hello@everyai.com</span>*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*    <div className="flex items-center space-x-2">*!/*/}
                {/*            /!*        <IconPhone size={16} />*!/*/}
                {/*            /!*        <span>+1 (555) 123-4567</span>*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*    <div className="flex items-center space-x-2">*!/*/}
                {/*            /!*        <IconMapPin size={16} />*!/*/}
                {/*            /!*        <span>San Francisco, CA</span>*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*</div>*!/*/}
                {/*        </div>*/}

                {/*        /!* Links Sections *!/*/}
                {/*        <div>*/}
                {/*            <h4 className="text-white font-semibold mb-4">Product</h4>*/}
                {/*            <ul className="space-y-2">*/}
                {/*                {footerLinks.product.map((link) => (*/}
                {/*                    <li key={link.name}>*/}
                {/*                        <a*/}
                {/*                            href={link.href}*/}
                {/*                            className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"*/}
                {/*                        >*/}
                {/*                            {link.name}*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <h4 className="text-white font-semibold mb-4">Company</h4>*/}
                {/*            <ul className="space-y-2">*/}
                {/*                {footerLinks.company.map((link) => (*/}
                {/*                    <li key={link.name}>*/}
                {/*                        <a*/}
                {/*                            href={link.href}*/}
                {/*                            className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"*/}
                {/*                        >*/}
                {/*                            {link.name}*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <h4 className="text-white font-semibold mb-4">Support</h4>*/}
                {/*            <ul className="space-y-2">*/}
                {/*                {footerLinks.support.map((link) => (*/}
                {/*                    <li key={link.name}>*/}
                {/*                        <a*/}
                {/*                            href={link.href}*/}
                {/*                            className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"*/}
                {/*                        >*/}
                {/*                            {link.name}*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}

                {/*        <div>*/}
                {/*            <h4 className="text-white font-semibold mb-4">Legal</h4>*/}
                {/*            <ul className="space-y-2">*/}
                {/*                {footerLinks.legal.map((link) => (*/}
                {/*                    <li key={link.name}>*/}
                {/*                        <a*/}
                {/*                            href={link.href}*/}
                {/*                            className="text-slate-400 hover:text-purple-400 transition-colors duration-200 text-sm"*/}
                {/*                        >*/}
                {/*                            {link.name}*/}
                {/*                        </a>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*/!* Newsletter Section *!/*/}
                {/*/!*<div className="py-8 border-t border-slate-800">*!/*/}
                {/*/!*    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">*!/*/}
                {/*/!*        <div className="mb-4 lg:mb-0">*!/*/}
                {/*/!*            <h4 className="text-white font-semibold mb-2">Stay updated</h4>*!/*/}
                {/*/!*            <p className="text-slate-400 text-sm">Get the latest news and updates from GitDocs.</p>*!/*/}
                {/*/!*        </div>*!/*/}
                {/*/!*        <div className="flex flex-col sm:flex-row gap-3 max-w-md">*!/*/}
                {/*/!*            <input*!/*/}
                {/*/!*                type="email"*!/*/}
                {/*/!*                placeholder="Enter your email"*!/*/}
                {/*/!*                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"*!/*/}
                {/*/!*            />*!/*/}
                {/*/!*            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium">*!/*/}
                {/*/!*                Subscribe*!/*/}
                {/*/!*            </button>*!/*/}
                {/*/!*        </div>*!/*/}
                {/*/!*    </div>*!/*/}
                {/*/!*</div>*!/*/}

                {/* Bottom Section */}
                <div className="py-6 border-t border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                            <p className="text-slate-400 text-sm">
                                © {new Date().getFullYear()} GitDocs. All rights reserved.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                                            aria-label={social.name}
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors duration-200 group"
                        >
                            <span className="text-sm">Back to top</span>
                            <IconArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}