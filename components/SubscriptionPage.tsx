import React from 'react'
import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
    return (
        <section className="py-16 w-full sm:py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-10">Supercharge Your Repos with Smarter READMEs</h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6">
                        Choose the plan that fits your workflow — whether you're a solo developer, a fast-moving startup, or a growing team. Get powerful README generation features, AI customization, and seamless GitHub integration at every level.
                    </p>
                </div>
                <PricingTable />
            </div>
        </section>
    )
}

export default Subscription