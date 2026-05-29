import { useState, useEffect, useMemo } from 'react';
import type { UserCatalog } from '@/api/user/user.types';
import { fetchUserCatalog, toggleLike, togglePlaylist } from '@/api/user/user.api';

export function useUserCatalog(userId: string) {
  const [userCatalog, setUserCatalog] = useState<UserCatalog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadCatalog() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchUserCatalog(userId);

        if (!ignore) {
          setUserCatalog(data);
        }
      } catch {
        if (!ignore) {
          setError(`Failed to load user catalog for userId "${userId}"`);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, [userId]);

  const likedItemIds = useMemo(() => new Set(userCatalog?.likedItemIds ?? []), [userCatalog]);

  const playlistItemIds = useMemo(() => new Set(userCatalog?.playlistItemIds ?? []), [userCatalog]);

  const isLiked = (itemId: string) => likedItemIds.has(itemId);
  const isInPlaylist = (itemId: string) => playlistItemIds.has(itemId);

  const handleToggleLike = async (itemId: string) => {
    try {
      setError(null);

      const updatedCatalog = await toggleLike(userId, itemId);

      setUserCatalog(updatedCatalog);
    } catch {
      setError(`Failed to toggle like - itemId: "${itemId}", userId "${userId}"`);
    }
  };

  const handleTogglePlaylist = async (itemId: string) => {
    try {
      setError(null);

      const updatedCatalog = await togglePlaylist(userId, itemId);

      setUserCatalog(updatedCatalog);
    } catch {
      setError(`Failed to toggle playlist - itemId: "${itemId}", userId "${userId}"`);
    }
  };

  return {
    isLoading,
    error,
    userCatalog,
    isLiked,
    isInPlaylist,
    handleToggleLike,
    handleTogglePlaylist,
  };
}
