
import React, { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useArticleRating } from "@/hooks/useArticleRating";
import { Button } from "@/components/ui/button";

// Hilfsfunktion Fingerprint: Einfache LocalStorage Lösung für Demo
const getUserRatingKey = (postId: string) => `blogPostRating:${postId}`;

type ArticleRatingProps = {
  postId: string;
};

const ArticleRating: React.FC<ArticleRatingProps> = ({ postId }) => {
  const { averageRating, totalRatings, submitRating, isLoading, userRating, refetch } =
    useArticleRating(postId);

  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState<boolean>(false);

  useEffect(() => {
    // Prüfe LocalStorage beim Mount
    const stored = localStorage.getItem(getUserRatingKey(postId));
    if (stored) setHasRated(true);
  }, [postId]);

  const handleRate = async (value: number) => {
    if (hasRated || isLoading) return;

    const ok = await submitRating(value);
    if (ok) {
      setHasRated(true);
      localStorage.setItem(getUserRatingKey(postId), value.toString());
      refetch();
    }
  };

  return (
    <div className="my-12 px-4 py-8 rounded-xl border bg-gradient-to-br from-green-50 to-white text-center mx-auto max-w-2xl">
      <h4 className="text-lg font-semibold mb-3">Wie hilfreich fanden Sie diesen Artikel?</h4>
      <div className="flex items-center justify-center space-x-2 mb-2 mt-3">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onMouseEnter={() => setHoverValue(val)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => handleRate(val)}
            disabled={isLoading || hasRated}
            className="transition-transform"
            style={{ transform: hoverValue === val ? "scale(1.25)" : "scale(1)" }}
            aria-label={`Wertung: ${val} Sterne`}
          >
            <Star
              size={32}
              className={
                "drop-shadow " +
                (
                  ((hoverValue || userRating) ?? 0) >= val
                    ? "text-yellow-400 fill-yellow-300"
                    : "text-gray-300"
                )
              }
              fill={
                ((hoverValue || userRating) ?? 0) >= val ? "#fde047" : "none"
              }
              strokeWidth={2}
            />
          </button>
        ))}
      </div>
      {hasRated && (
        <span className="block mt-1 text-green-700 font-medium text-sm">
          Danke für Ihre Bewertung!
        </span>
      )}
      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
        {isLoading && (
          <>
            <Loader2 className="animate-spin" size={18} /> Bewertung wird aktualisiert...
          </>
        )}
        {!isLoading && (
          <>
            <span>
              Durchschnitt:{" "}
              <span className="font-semibold text-yellow-600">
                {averageRating ? averageRating.toFixed(1).replace(".", ",") : "?"}
              </span>
              {" "}({totalRatings} Bewertung{totalRatings !== 1 ? "en" : ""})
            </span>
          </>
        )}
      </div>
      {!hasRated && (
        <div className="mt-2 text-xs text-gray-400">
          Sie können diesen Artikel einmal bewerten.
        </div>
      )}
    </div>
  );
};

export default ArticleRating;
