
import { siteConfig } from '@/config/site.config';

interface TopicFilterProps {
  selectedTopic: string | null;
  onTopicChange: (topic: string | null) => void;
}

const TopicFilter = ({ selectedTopic, onTopicChange }: TopicFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onTopicChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedTopic === null
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Alle Themen
      </button>
      
      {siteConfig.contentTopics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => onTopicChange(topic.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTopic === topic.id
              ? 'text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{
            backgroundColor: selectedTopic === topic.id ? topic.color : undefined
          }}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
};

export default TopicFilter;
