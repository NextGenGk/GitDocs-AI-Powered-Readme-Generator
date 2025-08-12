import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  level?: 'h2' | 'h3';
  id?: string;
}

export const NeobrutalistSectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  level = 'h2',
  id,
}) => {
  const HeadingTag = level;
  return (
    <div className="text-center mb-12">
      <div className="inline-block overflow-visible">
        <div 
          className="bg-[#05e17a] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-3"
          style={{
            transform: 'rotate(-2deg)',
            transformOrigin: 'center',
            padding: '0.5rem 1.5rem',
            display: 'inline-block',
            lineHeight: '1.2'
          }}
        >
          <HeadingTag 
            id={id}
            className="text-3xl font-black text-white text-center"
            style={{
              textShadow: '1px 1px 0 #000',
              lineHeight: '1',
            }}
          >
            {title}
          </HeadingTag>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 font-medium mt-3 text-center">
          {subtitle.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default NeobrutalistSectionHeading;
