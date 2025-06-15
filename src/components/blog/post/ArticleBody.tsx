
import { BlogPost } from '@/hooks/useBlogPosts';

interface ArticleBodyProps {
    post: Pick<BlogPost, 'content'>;
}

const ArticleBody = ({ post }: ArticleBodyProps) => (
    <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
    </div>
);

export default ArticleBody;
