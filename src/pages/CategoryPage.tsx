import { useParams } from 'react-router-dom';
import CategoryBenefits from '@/components/category/CategoryBenefits';
import CategoryArticleSearch from "@/components/category/CategoryArticleSearch";
import React, { useState, useMemo } from "react";
import { useBlogCategoryBySlug } from '@/hooks/useBlogCategories';
import { useBlogPosts } from '@/hooks/useBlogPosts';

import CategoryPageSkeleton from '@/components/category/CategoryPageSkeleton';
import CategoryNotFound from '@/components/category/CategoryNotFound';
import CategoryHero from '@/components/category/CategoryHero';
import CategoryArticleList from '@/components/category/CategoryArticleList';
import CategorySidebar from '@/components/category/CategorySidebar';
import TaggedBlogPostsGrid from '@/components/blog/TaggedBlogPostsGrid';
import CategoryPageSEO from '@/components/seo/CategoryPageSEO';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: currentTopic, isLoading: topicLoading } = useBlogCategoryBySlug(slug);
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  
  const { data: relatedPosts, isLoading: postsLoading } = useBlogPosts(currentTopic?.name, undefined);

  const filteredAndSortedPosts = useMemo(() => {
    if (!relatedPosts) return [];
    let filtered = relatedPosts;
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt?.toLowerCase().includes(term)
      );
    }

    let sorted = [...filtered];
    switch (sortBy) {
      case "date_asc":
        sorted.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        break;
      case "read_time_asc":
        sorted.sort((a, b) => (a.read_time || 0) - (b.read_time || 0));
        break;
      case "read_time_desc":
        sorted.sort((a, b) => (b.read_time || 0) - (a.read_time || 0));
        break;
      case "date_desc":
      default:
        sorted.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    }
    return sorted;
  }, [relatedPosts, search, sortBy]);

  if (topicLoading) {
    return <CategoryPageSkeleton />;
  }

  if (!currentTopic) {
    return <CategoryNotFound />;
  }

  return (
    <>
      <CategoryPageSEO category={currentTopic} postCount={filteredAndSortedPosts.length} />
      <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <CategoryHero category={currentTopic} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <CategoryBenefits categoryId={slug!} color={currentTopic.color || '#cccccc'} />
            <CategoryArticleSearch
              search={search}
              onSearch={setSearch}
              sortBy={sortBy}
              onSort={setSortBy}
            />
            <CategoryArticleList 
              posts={filteredAndSortedPosts} 
              isLoading={postsLoading}
              categoryName={currentTopic.name}
            />
            {/* Empfohlene Artikel (passende Tags zum Thema) */}
            <TaggedBlogPostsGrid
              tag={currentTopic.name}
              title={`Weitere spannende Artikel zu ${currentTopic.name}:`}
            />
          </div>

          <div className="lg:col-span-1">
            <CategorySidebar currentCategorySlug={slug} />
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default CategoryPage;
