
import { useParams } from "react-router-dom";
import { useBlogPost } from "@/hooks/useBlogPosts";
import BlogPostHeader from "@/components/blog/post/BlogPostHeader";
import BlogPostContentSEO from "@/components/blog/post/BlogPostContentSEO";
import BlogPostNotFound from "@/components/blog/post/BlogPostNotFound";
import BlogPostSkeleton from "@/components/blog/post/BlogPostSkeleton";
import BlogPostSidebar from "@/components/blog/post/BlogPostSidebar";
import ArticleBody from "@/components/blog/post/ArticleBody";
import CommentSystem from "@/components/comments/CommentSystem";
import RelatedCalculators from "@/components/shared/RelatedCalculators";

/** Map blog topic + keywords to calculator topic vocabulary. */
const TOPIC_KEYWORD_MAP: Record<string, string[]> = {
  "heizung modernisieren": ["heizung", "waermepumpe", "gas", "modernisierung"],
  "dämmung & isolierung": ["daemmung", "fassade", "dach", "keller", "u-wert"],
  "fenster & türen": ["daemmung", "u-wert"],
  "solarenergie": ["solar", "photovoltaik", "pv", "batterie", "wallbox"],
  "fördermittel": ["foerderung", "bafa", "kfw", "zuschuss"],
  "smart home": ["energie", "check"],
  "fassade": ["daemmung", "fassade"],
  "dach": ["daemmung", "dach"],
  "fenster": ["daemmung", "u-wert"],
};

const KEYWORD_CANON: Array<[RegExp, string]> = [
  [/wärmepumpe|waermepumpe/i, "waermepumpe"],
  [/heizung/i, "heizung"],
  [/dämmung|daemmung|isolier/i, "daemmung"],
  [/fassade/i, "fassade"],
  [/dach/i, "dach"],
  [/keller/i, "keller"],
  [/u-?wert/i, "u-wert"],
  [/solar|photovoltaik|pv\b/i, "solar"],
  [/batterie|speicher/i, "batterie"],
  [/wallbox|e-auto/i, "wallbox"],
  [/förder|foerder|bafa|kfw|zuschuss/i, "foerderung"],
  [/amortisation|payback|roi/i, "amortisation"],
  [/kosten|budget/i, "kosten"],
  [/sanierung/i, "sanierung"],
];

function deriveTopics(topic?: string, keywords?: string[] | null, title?: string): string[] {
  const topics = new Set<string>();
  const mapped = TOPIC_KEYWORD_MAP[(topic || "").toLowerCase()] || [];
  mapped.forEach((t) => topics.add(t));
  const haystack = [title || "", ...(keywords || [])].join(" ");
  for (const [re, canon] of KEYWORD_CANON) {
    if (re.test(haystack)) topics.add(canon);
  }
  return Array.from(topics);
}

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
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 max-w-none">
              <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 lg:p-12">
                  <BlogPostHeader post={post} />
                  <div className="prose prose-lg max-w-4xl mx-auto">
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
