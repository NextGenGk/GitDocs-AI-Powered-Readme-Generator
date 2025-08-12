import { Code, Zap, GitBranch, Clock, FileText, Cpu } from 'lucide-react';
import { NeobrutalistSectionHeading } from './neobrutalist-section-heading';

interface NeobrutalistFeaturesProps {
  noPadding?: boolean;
}

export default function NeobrutalistFeatures({ noPadding = false }: NeobrutalistFeaturesProps) {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast Generation',
      description: 'Create professional READMEs in under 30 seconds with our optimized AI engine.',
      benefits: ['Instant setup', 'One-click generation', 'Rapid iteration']
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean & Consistent Code',
      description: 'Generate perfectly formatted Markdown that follows industry best practices.',
      benefits: ['Standardized formatting', 'Semantic structure', 'Best practices']
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: 'GitHub Optimized',
      description: 'Get GitHub-ready documentation with proper badges, shields, and repository integration.',
      benefits: ['Badge support', 'Emoji integration', 'GFM compatible']
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Massive Time Saver',
      description: 'Reduce documentation time from hours to minutes with AI-powered templates.',
      benefits: ['90% faster', 'Minimal input', 'Maximal output']
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Custom Templates',
      description: 'Choose from templates for different project types - from libraries to enterprise apps.',
      benefits: ['Multiple categories', 'Easy customization', 'Community templates']
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'AI-Powered Intelligence',
      description: 'Advanced AI analyzes your project and suggests relevant sections and keywords.',
      benefits: ['Smart suggestions', 'SEO optimized', 'Context-aware']
    }
  ];

  return (
    <section id="features" className={`py-16 ${noPadding ? '' : 'px-4'} sm:px-6 lg:px-8 bg-[#f0fdf4]`} aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto">
        <NeobrutalistSectionHeading 
          id="features-heading"
          title="FEATURES"
          subtitle={"Discover powerful tools that streamline your workflow\nand make your projects stand out from the crowd"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {features.map((feature, index) => (
            <article 
              key={index}
              role="listitem"
              className="
                relative p-8 bg-white 
                border border-black
                rounded-lg
                transition-all duration-200 ease-in-out
                cursor-pointer
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                text-gray-900
                hover:border-2 hover:border-black
                hover:shadow-[4px_4px_0px_0px_rgba(5,225,122,1)]
                active:translate-x-0.5 active:translate-y-0.5
                active:shadow-[2px_2px_0px_0px_rgba(5,225,122,1)]
                group
                h-72
                flex flex-col
                items-start
                text-left
              "
            >
              <div className="w-12 h-12 bg-[#05e17a] text-black flex items-center justify-center rounded-lg mb-4 group-hover:bg-[#05e17a] group-hover:text-black" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-900">{feature.title}</h3>
              <p className="text-gray-700 group-hover:text-gray-700">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
