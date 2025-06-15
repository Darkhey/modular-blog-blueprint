
import { useParams } from "react-router-dom";
import { useBlogPost } from "@/hooks/useBlogPosts";
import BlogPostHeader from "@/components/blog/post/BlogPostHeader";
import BlogPostContentSEO from "@/components/blog/post/BlogPostContentSEO";
import BlogPostNotFound from "@/components/blog/post/BlogPostNotFound";
import BlogPostSkeleton from "@/components/blog/post/BlogPostSkeleton";
import BlogPostSidebar from "@/components/blog/post/BlogPostSidebar";
import ArticleBody from "@/components/blog/post/ArticleBody";
import CommentSystem from "@/components/comments/CommentSystem";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (error || !post) {
    return <BlogPostNotFound />;
  }

  return (
    <>
      <BlogPostContentSEO post={post} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 max-w-none">
              <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 lg:p-12">
                  <BlogPostHeader post={post} />
                  <div className="prose prose-lg max-w-none">
                    <ArticleBody post={post} />
                  </div>
                </div>
              </article>
              
              {/* Comment System */}
              <div className="mt-8">
                <CommentSystem postId={post.id} postSlug={post.slug} />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <BlogPostSidebar post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
