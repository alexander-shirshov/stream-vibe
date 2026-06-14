import { useState, useEffect, useMemo } from 'react';
import type { PersistedUserState, UserReview } from '@/api/user/user.types';
import {
  toggleLike,
  togglePlaylist,
  fetchUserState,
  toggleMuted,
  addReview,
  deleteReview,
  updateReview,
} from '@/api/user/user.api';

export function useUserState(userId: string) {
  const [userState, setUserState] = useState<PersistedUserState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadUserState() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchUserState(userId);

        if (!ignore) {
          setUserState(data);
        }
      } catch {
        if (!ignore) {
          setError(`Failed to load user state for userId "${userId}"`);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadUserState();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const likedItemIds = useMemo(
    () => new Set(userState?.catalog?.likedItemIds ?? []),
    [userState?.catalog?.likedItemIds]
  );

  const playlistItemIds = useMemo(
    () => new Set(userState?.catalog?.playlistItemIds ?? []),
    [userState?.catalog?.playlistItemIds]
  );

  const isMuted = userState?.preferences.isMuted ?? false;

  const userReviews = userState?.reviews.items ?? [];

  const userCatalog = userState?.catalog ?? null;
  const userPreferences = userState?.preferences ?? null;

  const isLiked = (itemId: string) => likedItemIds.has(itemId);
  const isInPlaylist = (itemId: string) => playlistItemIds.has(itemId);

  const handleToggleLike = async (itemId: string) => {
    try {
      setError(null);

      const updatedState = await toggleLike(userId, itemId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to toggle like - itemId: "${itemId}", userId "${userId}"`);
    }
  };

  const handleTogglePlaylist = async (itemId: string) => {
    try {
      setError(null);

      const updatedState = await togglePlaylist(userId, itemId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to toggle playlist - itemId: "${itemId}", userId "${userId}"`);
    }
  };

  const handleToggleMuted = async () => {
    try {
      setError(null);

      const updatedState = await toggleMuted(userId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to toggle muted, userId "${userId}"`);
    }
  };

  const getReviewForEntity = (entityId: string, entityType: UserReview['entityType']) => {
    return userReviews.find(
      review => review.entityId === entityId && review.entityType === entityType
    );
  };

  const handleAddReview = async (review: UserReview) => {
    try {
      setError(null);

      const updatedState = await addReview(review, userId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to add review - entityId: "${review.entityId}", userId "${userId}"`);
    }
  };

  const handleUpdateReview = async (review: UserReview) => {
    try {
      setError(null);

      const updatedState = await updateReview(review, userId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to update review - entityId: "${review.entityId}", userId "${userId}"`);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      setError(null);

      const updatedState = await deleteReview(reviewId, userId);

      setUserState(updatedState);
    } catch {
      setError(`Failed to delete review - reviewId: "${reviewId}", userId "${userId}"`);
    }
  };

  return {
    isLoading,
    error,
    userState,
    userCatalog,
    userPreferences,
    userReviews,
    isLiked,
    isInPlaylist,
    isMuted,
    handleToggleLike,
    handleTogglePlaylist,
    handleToggleMuted,
    getReviewForEntity,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
  };
}
