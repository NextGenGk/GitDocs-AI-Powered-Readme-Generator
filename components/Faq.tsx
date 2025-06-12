'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Github, FileText, Zap, Shield, Download, Edit3 } from 'lucide-react';

const GitDocsFAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedItems, setExpandedItems] = useState(new Set([0])); // First item expanded by default

    const categories = [
        { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
        { id: 'getting-started', name: 'Getting Started', icon: <Zap className="w-4 h-4" /> },
        { id: 'usage', name: 'Usage & Features', icon: <FileText className="w-4 h-4" /> },
        { id: 'technical', name: 'Technical', icon: <Github className="w-4 h-4" /> },
        { id: 'account', name: 'Account & Billing', icon: <Shield className="w-4 h-4" /> }
    ];

    const faqData = [
        {
            id: 0,
            category: 'getting-started',
            question: 'What is GitHub to Markdown Converter?',
            answer: 'GitHub to Markdown Converter is a web application that automatically converts GitHub repository links into polished README.md files using AI. Simply paste your GitHub repository URL, and our AI-powered system generates a comprehensive README file that you can edit and download.',
            tags: ['overview', 'readme', 'github']
        },
        {
            id: 1,
            category: 'getting-started',
            question: 'How do I get started?',
            answer: 'Getting started is simple: 1) Sign in using your account through authentication, 2) Paste a GitHub repository URL (e.g., https://github.com/username/repository), 3) Click "Generate README", 4) Wait for AI to create your README, 5) Edit if needed, and 6) Download your polished README.md file.',
            tags: ['setup', 'start', 'tutorial']
        },
        {
            id: 2,
            category: 'account',
            question: 'Do I need to create an account?',
            answer: 'Yes, you need to sign in through authentication to use the service. This helps us provide a secure, personalized experience and ensures the quality of generated content. Creating an account is quick and free.',
            tags: ['account', 'auth', 'clerk']
        },
        {
            id: 3,
            category: 'usage',
            question: 'What GitHub repositories can I convert?',
            answer: 'You can convert any public GitHub repository by providing its URL. The AI analyzes the repository structure, code, and existing documentation to generate a comprehensive README.md file. Private repositories are not currently supported.',
            tags: ['repositories', 'public', 'github']
        },
        {
            id: 4,
            category: 'usage',
            question: 'Can I edit the generated README before downloading?',
            answer: 'Absolutely! After the AI generates your README, it appears in an editable textarea where you can make any modifications, add custom sections, or adjust the content to better fit your project before downloading the final file.',
            tags: ['edit', 'customize', 'download']
        },
        {
            id: 5,
            category: 'technical',
            question: 'How long does it take to generate a README?',
            answer: 'README generation typically takes 10-30 seconds depending on the repository size and complexity. The AI needs time to analyze your code structure, dependencies, and project details to create a comprehensive document.',
            tags: ['speed', 'generation', 'time']
        },
        {
            id: 6,
            category: 'usage',
            question: 'What information is included in the generated README?',
            answer: 'Generated READMEs typically include: project description, features list, installation instructions, usage examples, API documentation (if applicable), technology stack, prerequisites, troubleshooting guides, and license information - all tailored to your specific repository.',
            tags: ['content', 'features', 'documentation']
        },
        {
            id: 7,
            category: 'technical',
            question: 'Is my repository data secure?',
            answer: 'Yes, we only access publicly available repository information through GitHub\'s public API. We don\'t store your repository data permanently - it\'s only used temporarily to generate your README. All authentication is handled securely through Clerk.',
            tags: ['security', 'privacy', 'data']
        },
        {
            id: 8,
            category: 'technical',
            question: 'What file formats can I download?',
            answer: 'Currently, you can download your generated documentation as a standard README.md file (Markdown format). This format is universally supported by GitHub, GitLab, and other code hosting platforms.',
            tags: ['download', 'formats', 'markdown']
        },
        {
            id: 9,
            category: 'usage',
            question: 'Can I use this for private repositories?',
            answer: 'Currently, the service only works with public GitHub repositories since we access repository information through GitHub\'s public API. Support for private repositories with proper authentication may be added in future updates.',
            tags: ['private', 'repositories', 'limitations']
        },
        {
            id: 10,
            category: 'technical',
            question: 'What happens if my repository URL is invalid?',
            answer: 'The application validates GitHub URLs before processing. If you enter an invalid URL, you\'ll receive an error message asking you to provide a valid GitHub repository URL in the format: https://github.com/username/repository',
            tags: ['validation', 'errors', 'url']
        },
        {
            id: 11,
            category: 'account',
            question: 'Is the service free to use?',
            answer: 'Pricing information is available on our subscription page. We offer different tiers to accommodate various usage needs, from individual developers to enterprise teams. Check our pricing section for current plans and features.',
            tags: ['pricing', 'free', 'subscription']
        },
        {
            id: 12,
            category: 'usage',
            question: 'Can I regenerate a README for the same repository?',
            answer: 'Yes, you can generate multiple README files for the same repository. Each generation may produce slightly different results as the AI considers various aspects of your project. You can compare results and choose the best version.',
            tags: ['regenerate', 'multiple', 'versions']
        }
    ];

    const toggleExpanded = (id: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const filteredFAQs = faqData.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-white py-38 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <HelpCircle className="w-4 h-4" />
                        Support Center
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Frequently Asked
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Questions</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about GitHub to Markdown Converter.
                        Can't find what you're looking for? Contact our support team.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                activeCategory === category.id
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            {category.icon}
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4 mb-12">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching questions found</h3>
                            <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
                        </div>
                    ) : (
                        filteredFAQs.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                            >
                                <button
                                    onClick={() => toggleExpanded(item.id)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                                    {expandedItems.has(item.id) ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {expandedItems.has(item.id) && (
                                    <div className="px-6 pb-5 border-t border-gray-100">
                                        <div className="pt-4">
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {item.answer}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                                    >
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Quick Actions */}
                {/*<div className="grid md:grid-cols-3 gap-6 mb-12">*/}
                {/*    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">*/}
                {/*        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">*/}
                {/*            <FileText className="w-6 h-6 text-white" />*/}
                {/*        </div>*/}
                {/*        <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>*/}
                {/*        <p className="text-gray-600 text-sm mb-4">*/}
                {/*            Read our comprehensive guides and tutorials*/}
                {/*        </p>*/}
                {/*        <button className="text-blue-600 hover:text-blue-700 font-medium">*/}
                {/*            View Docs →*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">*/}
                {/*        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">*/}
                {/*            <Github className="w-6 h-6 text-white" />*/}
                {/*        </div>*/}
                {/*        <h3 className="text-lg font-semibold text-gray-900 mb-2">Try Demo</h3>*/}
                {/*        <p className="text-gray-600 text-sm mb-4">*/}
                {/*            Test the converter with a sample repository*/}
                {/*        </p>*/}
                {/*        <button className="text-purple-600 hover:text-purple-700 font-medium">*/}
                {/*            Start Demo →*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">*/}
                {/*        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">*/}
                {/*            <HelpCircle className="w-6 h-6 text-white" />*/}
                {/*        </div>*/}
                {/*        <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>*/}
                {/*        <p className="text-gray-600 text-sm mb-4">*/}
                {/*            Get help from our friendly support team*/}
                {/*        </p>*/}
                {/*        <button className="text-orange-600 hover:text-orange-700 font-medium">*/}
                {/*            Get Help →*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Still Need Help */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                    <p className="text-xl mb-6 text-blue-100">
                        Our support team is here to help you succeed with GitHub to Markdown Converter.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.open('https://github.com/NextGenGk/', '_blank')}
                            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                        >
                            Contact Support
                        </button>
                        {/*<button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">*/}
                        {/*    Schedule a Call*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitDocsFAQ;