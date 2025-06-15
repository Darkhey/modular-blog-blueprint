
import { siteConfig } from '@/config/site.config';
import { Link } from 'react-router-dom';

const QuickNavigation = () => {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold text-gray-900 mb-4">Schnellzugriff</h3>
      <div className="space-y-2">
        {siteConfig.contentTopics.slice(0, 4).map((topic) => (
          <a
            key={topic.id}
            href={topic.seoUrl}
            className="block w-full text-left px-3 py-2 rounded text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600 transition-colors"
          >
            {topic.name}
          </a>
        ))}
        <Link
          to="/blog/moderne-fenster-ratgeber-2025"
          className="block w-full text-left px-3 py-2 rounded text-sm text-green-700 bg-blue-50 hover:bg-blue-100 hover:underline transition-colors font-medium"
        >
          Fenster-Ratgeber
        </Link>
      </div>
    </div>
  );
};

export default QuickNavigation;
