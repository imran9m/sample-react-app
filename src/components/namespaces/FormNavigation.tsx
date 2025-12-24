import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

interface FormNavigationProps {
  sections: Section[];
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      // Find the section that's currently in view
      let currentSection = sections[0].id;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentSection = sections[i].id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Set initial active section
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30 max-h-[80vh] overflow-y-auto">
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4 min-w-[200px]">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-2 sticky top-0 bg-white/90 dark:bg-gray-900/90">
          Sections
        </h4>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

