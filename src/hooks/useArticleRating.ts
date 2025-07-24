
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
      // Validate rating value
      if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
        throw new Error("Rating must be an integer between 1 and 5");
      }
      
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
        // Store rating in localStorage after successful submission
        await submitRating(val);
        if (typeof window !== "undefined") {
          localStorage.setItem(`blogPostRating:${postId}`, val.toString());
        }
        return true;
      } catch (error) {
        console.error("Rating submission failed:", error);
        return false;
      }
    },
    userRating,
    refetch,
  };
};
