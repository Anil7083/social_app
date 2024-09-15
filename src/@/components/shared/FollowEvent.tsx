import React, { useState, useEffect } from 'react';
import { followUser, isFollowing, unFollowUser} from '@/@/lib/appwrite/api';

interface FollowButtonProps {
  currentUserId: string;
  targetUserId: string;
}

const FollowEvent: React.FC<FollowButtonProps> = ({ currentUserId, targetUserId }) => {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const checkFollowing = async () => {
      // Assuming isFollowing returns a boolean
      const status = await isFollowing(currentUserId, targetUserId);
      setFollowing(status !== null);
    };
    checkFollowing();
  }, [currentUserId, targetUserId]);

  const handleFollowClick = async () => {
    try {
      if (following) {
        // Fetch the document ID of the follow relationship
        const followDocumentId = await isFollowing(currentUserId, targetUserId);
        
        if (followDocumentId) {
          // Unfollow user if document ID is found
          await unFollowUser(followDocumentId);
        } else {
          console.log('Follow document not found');
        }
      } else {
        // Follow user
        await followUser(currentUserId, targetUserId);
      }
      
      // Toggle following state
      setFollowing(!following);
    } catch (error) {
      console.error('Error handling follow/unfollow:', error);
    }
  };

  return (
    <button onClick={handleFollowClick}>
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowEvent;
