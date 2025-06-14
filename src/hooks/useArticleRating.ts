
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useArticleRating = (postId: string) => {
  const queryClient = useQueryClient();

  // Ratings holen
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["article-rating", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_post_ratings")
        .select("rating")
        .eq("post_id", postId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!postId,
  });

  const ratings: number[] = data?.map((r: any) => Number(r.rating)) ?? [];
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? ratings.reduce((acc, cur) => acc + cur, 0) / totalRatings
      : null;

  // Userwertung aus LocalStorage
  let userRating: number | null = null;
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`blogPostRating:${postId}`);
    userRating = stored ? Number(stored) : null;
  }

  // Bewertung absenden
  const { mutateAsync: submitRating } = useMutation({
    mutationFn: async (rating: number) => {
      // Insert rating
      const { error } = await supabase
        .from("blog_post_ratings")
        .insert([{ post_id: postId, rating }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article-rating", postId] });
    },
  });

  return {
    averageRating,
    totalRatings,
    isLoading,
    submitRating: async (val: number) => {
      try {
        await submitRating(val);
        return true;
      } catch {
        return false;
      }
    },
    userRating,
    refetch,
  };
};
