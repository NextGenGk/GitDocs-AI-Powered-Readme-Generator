import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSection() {
    const features = [
        {
            title: "Built for developers",
            description: "Built for engineers, developers, dreamers, thinkers and doers.",
            icon: <IconTerminal2 size={28} />,
            gradient: "from-blue-500 to-cyan-600",
            category: "Development"
        },
        {
            title: "Ease of use",
            description: "It's as easy as using an Apple, and as expensive as buying one.",
            icon: <IconEaseInOut size={28} />,
            gradient: "from-emerald-500 to-teal-600",
            category: "Experience"
        },
        {
            title: "Pricing like no other",
            description: "Our prices are best in the market. No cap, no lock, no credit card required.",
            icon: <IconCurrencyDollar size={28} />,
            gradient: "from-amber-500 to-orange-600",
            category: "Pricing"
        },
        {
            title: "100% Uptime guarantee",
            description: "We just cannot be taken down by anyone.",
            icon: <IconCloud size={28} />,
            gradient: "from-indigo-500 to-purple-600",
            category: "Reliability"
        },
        {
            title: "Multi-tenant Architecture",
            description: "You can simply share passwords instead of buying new seats",
            icon: <IconRouteAltLeft size={28} />,
            gradient: "from-pink-500 to-rose-600",
            category: "Architecture"
        },
        {
            title: "24/7 Customer Support",
            description: "We are available a 100% of the time. At least our AI Agents are.",
            icon: <IconHelp size={28} />,
            gradient: "from-violet-500 to-purple-600",
            category: "Support"
        },
        {
            title: "Money back guarantee",
            description: "If you don't like EveryAI, we will convince you to like us.",
            icon: <IconAdjustmentsBolt size={28} />,
            gradient: "from-red-500 to-pink-600",
            category: "Guarantee"
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <IconHeart size={28} />,
            gradient: "from-rose-500 to-pink-600",
            category: "Extras"
        },
    ];

    return (
        <section className="bg-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                        ✨ Powerful Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything you need to
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> succeed</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover the comprehensive suite of features designed to accelerate your development process and enhance your productivity.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Feature key={feature.title} {...feature} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                {/*<div className="text-center mt-16">*/}
                {/*    <div className="inline-flex flex-col sm:flex-row gap-4">*/}
                {/*        <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">*/}
                {/*            Get Started Free*/}
                {/*        </button>*/}
                {/*        <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">*/}
                {/*            View Documentation*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </section>
    );
}

const Feature = ({
                     title,
                     description,
                     icon,
                     index,
                     gradient,
                     category,
                 }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
    gradient: string;
    category: string;
}) => {
    return (
        <div className="group relative">
            <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative p-8">
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mb-4">
                        {category}
                    </div>

                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                            {icon}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm group-hover:text-gray-700 transition-colors">
                        {description}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-3xl opacity-50" />
                    <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`} />
                </div>

                {/* Subtle Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 blur`} />
            </div>
        </div>
    );
};