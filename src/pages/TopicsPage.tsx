import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site.config';
import { glossary } from '@/data/glossary';

const TopicsPage = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>Themen\u00fcbersicht \u2013 Sanieren & Sparen</title>
        <meta
          name="description"
          content="\u00dcbersicht \u00fcber alle Themen unseres Blogs plus Glossar wichtiger Begriffe."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Themen\u00fcbersicht</h1>
      <p className="text-gray-600 mb-8">
        Entdecken Sie unsere wichtigsten Inhalte rund um energieeffizientes Sanieren und Modernisieren.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {siteConfig.contentTopics.map((topic) => (
          <Link
            key={topic.id}
            to={topic.seoUrl}
            className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{topic.name}</h2>
            <p className="text-gray-600 text-sm">{topic.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-4">Glossar</h2>
      <dl className="space-y-4">
        {glossary.map((item) => (
          <div key={item.term}>
            <dt className="font-semibold">{item.term}</dt>
            <dd className="text-gray-600 text-sm">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default TopicsPage;
