
import { siteConfig } from '@/config/site.config';
import React from 'react';

interface PopularTopicsProps {
    onTopicSelect: (topicId: string | null) => void;
}

const popularTopicsData = [
    { name: "Heizung tauschen", posts: 25, savings: "bis 40%" },
    { name: "Dämmung planen", posts: 18, savings: "bis 50%" },
    { name: "Förderung beantragen", posts: 22, savings: "bis 70%" },
    { name: "Fenster erneuern", posts: 12, savings: "bis 20%" }
];

const PopularTopics = ({ onTopicSelect }: PopularTopicsProps) => {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-4">Beliebte Themen</h3>
            <div className="space-y-3">
                {popularTopicsData.map((topic, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                    <button
                    onClick={() => onTopicSelect(siteConfig.contentTopics.find(t => t.name.includes(topic.name.split(' ')[0]))?.id || null)}
                    className="block w-full text-left group"
                    >
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                        {topic.name}
                        </span>
                        <span className="text-xs text-green-600 font-medium">{topic.savings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{topic.posts} Artikel</span>
                        <span className="text-xs text-gray-400">→</span>
                    </div>
                    </button>
                </div>
                ))}
            </div>
        </div>
    );
};

export default PopularTopics;
