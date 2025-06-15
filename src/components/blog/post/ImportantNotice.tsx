
import { AlertCircle } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlogPosts';

interface ImportantNoticeProps {
    post: Pick<BlogPost, 'important_notice'>;
}

const ImportantNotice = ({ post }: ImportantNoticeProps) => {
    if (!post.important_notice) return null;

    return (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="text-yellow-800 font-medium mb-1">Wichtiger Hinweis:</p>
                    <p className="text-yellow-700">{post.important_notice}</p>
                </div>
            </div>
        </div>
    );
};

export default ImportantNotice;
