
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogCard from "@/components/blog/BlogCard";

interface TaggedBlogPostsGridProps {
  tag: string; // z.B. "Fenster"
  limit?: number;
  title?: string;
}

const TaggedBlogPostsGrid = ({ tag, limit = 3, title }: TaggedBlogPostsGridProps) => {
  const { data: posts, isLoading } = useBlogPosts(undefined, limit, tag);

  if (isLoading) return <div>Lädt passende Artikel...</div>;
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-5">{title || `Empfohlene Artikel zum Thema`}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <div key={post.id} className="animate-fade-in">
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaggedBlogPostsGrid;
