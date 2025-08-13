import { useState } from 'react';
import { NeobrutalistSectionHeading } from './neobrutalist-section-heading';

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: 'What is GitDocs?',
    answer: 'GitHub to Markdown Converter is a web application that automatically converts GitHub repository links into polished README.md files using AI. Simply paste your GitHub repository URL, and our AI-powered system generates a comprehensive README file that you can edit and download.',
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is simple: 1) Sign in using your account through authentication, 2) Paste a GitHub repository URL (e.g., https://github.com/username/repository), 3) Click "Generate README", 4) Wait for AI to create your README, 5) Edit if needed, and 6) Download your polished README.md file.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'Yes, you need to sign in through authentication to use the service. This helps us provide a secure, personalized experience and ensures the quality of generated content. Creating an account is quick and free.',
  },
  {
    question: 'What GitHub repositories can I convert?',
    answer: 'You can convert any public GitHub repository by providing its URL. The AI analyzes the repository structure, code, and existing documentation to generate a comprehensive README.md file. Private repositories are not currently supported.',
  },
  {
    question: 'Can I edit the generated README before downloading?',
    answer: 'Absolutely! After the AI generates your README, it appears in an editable textarea where you can make any modifications, add custom sections, or adjust the content to better fit your project before downloading the final file.',
  },
  {
    question: 'How long does it take to generate a README?',
    answer: 'README generation typically takes 10-30 seconds depending on the repository size and complexity. The AI needs time to analyze your code structure, dependencies, and project details to create a comprehensive document.',
  },
  {
    question: 'What information is included in the generated README?',
    answer: 'Generated READMEs typically include: project description, features list, installation instructions, usage examples, API documentation (if applicable), technology stack, prerequisites, troubleshooting guides, and license information - all tailored to your specific repository.',
  },
  {
    question: 'Is my repository data secure?',
    answer: 'Yes, we only access publicly available repository information through GitHub\'s public API. We don\'t store your repository data permanently - it\'s only used temporarily to generate your README. All authentication is handled securely through Clerk.',
  },
  {
    question: 'What file formats can I download?',
    answer: 'Currently, you can download your generated documentation as a standard README.md file (Markdown format). This format is universally supported by GitHub, GitLab, and other code hosting platforms.',
  },
  {
    question: 'Can I use this for private repositories?',
    answer: 'Currently, the service only works with public GitHub repositories since we access repository information through GitHub\'s public API. Support for private repositories with proper authentication may be added in future updates.',
  },
  {
    question: 'What happens if my repository URL is invalid?',
    answer: 'The application validates GitHub URLs before processing. If you enter an invalid URL, you\'ll receive an error message asking you to provide a valid GitHub repository URL in the format: https://github.com/username/repository',
  },
  {
    question: 'Is the service free to use?',
    answer: 'Yes, this service is absolutely free.',
  },
  {
    question: 'Can I regenerate a README for the same repository?',
    answer: 'Yes, you can generate multiple README files for the same repository. Each generation may produce slightly different results as the AI considers various aspects of your project. You can compare results and choose the best version.',
  },
  {
    question: 'Can I customize the generated README?',
    answer: 'Absolutely! After generation, you can edit the README directly in the editor before downloading or copying it.',
  },
];

interface NeobrutalistFaqProps {
  noPadding?: boolean;
}

export default function NeobrutalistFaq({ noPadding = false }: NeobrutalistFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f0fdf4] w-full">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
        <NeobrutalistSectionHeading 
          title="FAQ"
          subtitle={"Get instant answers to common questions\nand learn how to maximize your documentation's impact"}
        />
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                border-2 border-black rounded-lg overflow-hidden relative
                transition-all duration-300 ease-in-out
                hover:shadow-[8px_8px_0px_0px_rgba(5,225,122,1)]
                hover:-translate-y-1 hover:-translate-x-1
                group/faq
                ${openIndex === index ? 'bg-[#05e17a]' : 'bg-white'}
                hover:z-10
                ${openIndex === index ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}
                before:absolute before:inset-0 before:bg-[#05e17a] before:opacity-0 hover:before:opacity-5
                before:transition-opacity before:duration-300
              `}
            >
              <button
                className={`
                  w-full px-6 py-4 text-left flex justify-between items-center
                  transition-all duration-300
                  relative z-10
                  ${openIndex === index ? 'bg-[#05e17a]' : 'bg-white'}
                  hover:bg-[#05e17a]/20
                  group-hover/faq:bg-[#05e17a]/10
                `}
                onClick={() => toggleFaq(index)}
              >
                <span className={`
                  text-lg font-bold relative
                  ${openIndex === index ? 'text-black' : 'text-gray-900'}
                  group-hover/faq:text-black
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:transition-all after:duration-300
                  after:w-0 group-hover/faq:after:w-full
                `}>
                  {faq.question}
                </span>
                <span className={`
                  text-2xl transition-all duration-300
                  ${openIndex === index ? 'rotate-180' : 'group-hover/faq:rotate-90'}
                  group-hover/faq:scale-125 group-hover/faq:text-[#05e17a]
                  w-6 h-6 flex items-center justify-center
                  border-2 border-black rounded-full
                  group-hover/faq:border-[#05e17a]
                `}>
                  <span className="relative -top-0.5">+</span>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t-2 border-black">
                  <p className="text-gray-800">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
