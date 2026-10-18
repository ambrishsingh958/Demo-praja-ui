import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CivicPost,
  DailyBriefing,
  ReelStory,
  UserNotification,
  Vacancy,
  CivicQuiz,
  Badge,
  LearnModule,
  UserProfile,
  ToastMessage,
  CivicCategory,
  IssuePriority,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_BRIEFING,
  INITIAL_POSTS,
  INITIAL_REELS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VACANCIES,
  INITIAL_QUIZZES,
  INITIAL_BADGES,
  INITIAL_MODULES,
} from '../mockData/initialData';

interface AppContextType {
  user: UserProfile;
  isLoggedIn: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  posts: CivicPost[];
  createReport: (report: {
    title: string;
    category: CivicCategory;
    description: string;
    locality: string;
    priority: IssuePriority;
    imageUrl?: string;
    images?: string[];
  }) => string;
  toggleUpvote: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  toggleBookmark: (postId: string) => void;
  voteInPoll: (postId: string, optionId: string) => void;
  briefing: DailyBriefing;
  reels: ReelStory[];
  toggleReelLike: (reelId: string) => void;
  toggleReelSave: (reelId: string) => void;
  addReelComment: (reelId: string, text: string) => void;
  notifications: UserNotification[];
  unreadNotificationsCount: number;
  markAllNotificationsAsRead: () => void;
  markNotificationAsRead: (id: string) => void;
  vacancies: Vacancy[];
  appliedVacancies: string[];
  applyVacancy: (vacancyId: string, applicantNote?: string) => void;
  quizzes: CivicQuiz[];
  completedQuizzes: Record<string, { score: number; pointsEarned: number }>;
  completeQuiz: (quizId: string, score: number, pointsEarned: number) => void;
  badges: Badge[];
  modules: LearnModule[];
  completeModuleLesson: (moduleId: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'reward') => void;
  removeToast: (id: string) => void;
  selectedPostForDetail: CivicPost | null;
  setSelectedPostForDetail: (post: CivicPost | null) => void;
  selectedPostForComments: CivicPost | null;
  setSelectedPostForComments: (post: CivicPost | null) => void;
  selectedPostForShare: CivicPost | null;
  setSelectedPostForShare: (post: CivicPost | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('prajapulse_auth');
    return saved !== null ? JSON.parse(saved) : true; // Default logged in for immediate hackathon evaluation
  });

  // User Profile State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('prajapulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (['Bronze', 'Silver', 'Gold', 'Platinum', 'Legend'].includes(parsed.level)) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_USER;
  });

  // Posts State
  const [posts, setPosts] = useState<CivicPost[]>(() => {
    const saved = localStorage.getItem('prajapulse_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hydrated = parsed.map((p: CivicPost) => {
            const initial = INITIAL_POSTS.find((ip) => ip.id === p.id);
            if (initial && initial.images && initial.images.length > 0) {
              return { ...p, images: initial.images };
            }
            if (!p.images || p.images.length <= 1) {
              return {
                ...p,
                images: [
                  p.imageUrl,
                  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
                  'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80',
                ],
              };
            }
            return p;
          });
          localStorage.setItem('prajapulse_posts', JSON.stringify(hydrated));
          return hydrated;
        }
      } catch (e) {
        // fallback to INITIAL_POSTS
      }
    }
    return INITIAL_POSTS;
  });

  // Briefing
  const [briefing] = useState<DailyBriefing>(INITIAL_BRIEFING);

  // Reels
  const [reels, setReels] = useState<ReelStory[]>(() => {
    const saved = localStorage.getItem('prajapulse_reels');
    return saved ? JSON.parse(saved) : INITIAL_REELS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem('prajapulse_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Vacancies
  const [vacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [appliedVacancies, setAppliedVacancies] = useState<string[]>(() => {
    const saved = localStorage.getItem('prajapulse_applied_vacancies');
    return saved ? JSON.parse(saved) : [];
  });

  // Quizzes
  const [quizzes] = useState<CivicQuiz[]>(INITIAL_QUIZZES);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, { score: number; pointsEarned: number }>>(() => {
    const saved = localStorage.getItem('prajapulse_completed_quizzes');
    return saved ? JSON.parse(saved) : {};
  });

  // Badges (7 badges matching user design specification)
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('prajapulse_badges');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_BADGES.length && parsed[0]?.requirement) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_BADGES;
  });

  // Learning Modules
  const [modules, setModules] = useState<LearnModule[]>(() => {
    const saved = localStorage.getItem('prajapulse_modules');
    return saved ? JSON.parse(saved) : INITIAL_MODULES;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<CivicPost | null>(null);
  const [selectedPostForComments, setSelectedPostForComments] = useState<CivicPost | null>(null);
  const [selectedPostForShare, setSelectedPostForShare] = useState<CivicPost | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('prajapulse_auth', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('prajapulse_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('prajapulse_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('prajapulse_reels', JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem('prajapulse_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('prajapulse_applied_vacancies', JSON.stringify(appliedVacancies));
  }, [appliedVacancies]);

  useEffect(() => {
    localStorage.setItem('prajapulse_completed_quizzes', JSON.stringify(completedQuizzes));
  }, [completedQuizzes]);

  useEffect(() => {
    localStorage.setItem('prajapulse_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('prajapulse_modules', JSON.stringify(modules));
  }, [modules]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'reward' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email?: string, name?: string) => {
    setIsLoggedIn(true);
    if (email || name) {
      setUser((prev) => ({
        ...prev,
        email: email || prev.email,
        name: name || prev.name,
      }));
    }
    addToast('Welcome back, ' + (name || user.name), 'Connected to PrajaPulse Bengaluru Network', 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('Logged out successfully', 'See you soon!', 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    addToast('Profile Updated', 'Changes saved successfully', 'success');
  };

  const createReport = (report: {
    title: string;
    category: CivicCategory;
    description: string;
    locality: string;
    priority: IssuePriority;
    imageUrl?: string;
    images?: string[];
  }): string => {
    const newId = `post-${Date.now().toString().slice(-4)}`;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    const sampleCategoryImages: Record<CivicCategory, { url: string; grad: string }> = {
      Roads: {
        url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #2b3a32 0%, #155638 100%)',
      },
      Water: {
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #1b384f 0%, #237A50 100%)',
      },
      Sanitation: {
        url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #32251a 0%, #5e4835 100%)',
      },
      Streetlights: {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #1b2820 0%, #237A50 100%)',
      },
      'Public Safety': {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #3d2417 0%, #c45d22 100%)',
      },
      Parks: {
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #1c4b32 0%, #3bb177 100%)',
      },
      Community: {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        grad: 'linear-gradient(135deg, #155638 0%, #237A50 100%)',
      },
    };

    const mainImg = report.imageUrl || sampleCategoryImages[report.category].url;
    const allImages =
      report.images && report.images.length > 0
        ? report.images
        : [
            mainImg,
            'https://images.unsplash.com/photo-1578991624414-276ef23a534f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
          ];

    const newPost: CivicPost = {
      id: newId,
      reporter: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        isVerified: true,
        wardOrArea: report.locality || `${user.neighborhood} · ${user.wardNumber}`,
      },
      timestamp: now.toISOString(),
      formattedTime,
      category: report.category,
      title: report.title,
      description: report.description,
      status: 'Reported',
      priority: report.priority,
      imageUrl: mainImg,
      images: allImages,
      imageFallbackGradient: sampleCategoryImages[report.category].grad,
      upvotes: 1,
      hasUpvoted: true,
      commentsCount: 0,
      comments: [],
      isBookmarked: false,
      whyItMatters: `Civic issue reported directly by resident to ${user.wardNumber} engineering desk.`,
      communityActionLabel: 'Support this issue',
      aiInsight: `Auto-triaged: Assigned to Ward ${user.wardNumber} Junior Engineer. Estimated dispatch in 24 hours.`,
    };

    setPosts((prev) => [newPost, ...prev]);

    // Update user points and reports count
    const pointsToAdd = 50;
    setUser((prev) => ({
      ...prev,
      points: prev.points + pointsToAdd,
      stats: {
        ...prev.stats,
        reportsCount: prev.stats.reportsCount + 1,
      },
    }));

    // Add notification
    const newNotif: UserNotification = {
      id: 'notif-' + Date.now(),
      type: 'report_update',
      title: 'Report Submitted Successfully',
      message: `Your report #${newId.toUpperCase()} for "${report.title}" has been assigned to Ward ${user.wardNumber} desk.`,
      timestamp: 'Just now',
      isRead: false,
      group: 'Today',
      relatedPostId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast(
      'Report Submitted! +50 Points',
      `Assigned tracking ID: #${newId.toUpperCase()}`,
      'reward'
    );

    return newId;
  };

  const toggleUpvote = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasUpvoted = !post.hasUpvoted;
          const upvotes = hasUpvoted ? post.upvotes + 1 : Math.max(0, post.upvotes - 1);
          
          if (hasUpvoted) {
            addToast('Issue Endorsed', 'Your support helps prioritize this report for the Ward Committee.', 'success');
            setUser((u) => ({
              ...u,
              points: u.points + 5,
              stats: { ...u.stats, supportedCount: u.stats.supportedCount + 1 },
            }));
          } else {
            addToast('Endorsement Removed', undefined, 'info');
            setUser((u) => ({
              ...u,
              stats: { ...u.stats, supportedCount: Math.max(0, u.stats.supportedCount - 1) },
            }));
          }

          return { ...post, hasUpvoted, upvotes };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'comm-' + Date.now(),
      author: user.name,
      avatar: user.avatar,
      text: text.trim(),
      time: 'Just now',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );

    if (selectedPostForDetail && selectedPostForDetail.id === postId) {
      setSelectedPostForDetail((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [...prev.comments, newComment],
            }
          : null
      );
    }

    if (selectedPostForComments && selectedPostForComments.id === postId) {
      setSelectedPostForComments((prev) =>
        prev
          ? {
              ...prev,
              commentsCount: prev.commentsCount + 1,
              comments: [...prev.comments, newComment],
            }
          : null
      );
    }

    addToast('Comment Posted', 'Thank you for adding your voice to the neighborhood discussion.', 'info');
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isBookmarked = !post.isBookmarked;
          addToast(
            isBookmarked ? 'Saved to Bookmarks' : 'Removed from Bookmarks',
            isBookmarked ? 'Access saved civic issues anytime in your profile.' : undefined,
            'info'
          );
          return { ...post, isBookmarked };
        }
        return post;
      })
    );
  };

  const voteInPoll = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.poll) {
          if (post.poll.userVotedId === optionId) return post; // already voted this
          const currentVotedId = post.poll.userVotedId;
          const updatedOptions = post.poll.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            if (currentVotedId && opt.id === currentVotedId) {
              return { ...opt, votes: Math.max(0, opt.votes - 1) };
            }
            return opt;
          });

          addToast('Vote Counted!', 'Thank you for participating in the community consultation poll.', 'success');

          return {
            ...post,
            poll: {
              ...post.poll,
              options: updatedOptions,
              userVotedId: optionId,
            },
          };
        }
        return post;
      })
    );
  };

  const toggleReelLike = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          const hasLiked = !reel.hasLiked;
          const likes = hasLiked ? reel.likes + 1 : Math.max(0, reel.likes - 1);
          if (hasLiked) {
            addToast('Impact Celebrated!', 'Inspired by community transformation.', 'success');
          }
          return { ...reel, hasLiked, likes };
        }
        return reel;
      })
    );
  };

  const toggleReelSave = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          const isSaved = !reel.isSaved;
          addToast(
            isSaved ? 'Impact Story Saved' : 'Story Removed',
            isSaved ? 'Find this in your saved community stories.' : undefined,
            'info'
          );
          return { ...reel, isSaved };
        }
        return reel;
      })
    );
  };

  const addReelComment = (reelId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'rc-' + Date.now(),
      author: user.name,
      text: text.trim(),
      time: 'Just now',
    };
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          return {
            ...reel,
            commentsCount: reel.commentsCount + 1,
            comments: [...reel.comments, newComment],
          };
        }
        return reel;
      })
    );
    addToast('Comment Added', undefined, 'info');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All Caught Up', 'Marked all notifications as read', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const applyVacancy = (vacancyId: string, applicantNote?: string) => {
    if (appliedVacancies.includes(vacancyId)) {
      addToast('Application Already Received', 'The team is reviewing your profile.', 'info');
      return;
    }
    setAppliedVacancies((prev) => [...prev, vacancyId]);
    setUser((u) => ({ ...u, points: u.points + 25 }));
    addToast('Application Submitted! +25 Points', 'The organizing NGO will contact you via email.', 'reward');
  };

  const completeQuiz = (quizId: string, score: number, pointsEarned: number) => {
    setCompletedQuizzes((prev) => ({
      ...prev,
      [quizId]: { score, pointsEarned },
    }));

    setUser((u) => ({
      ...u,
      points: u.points + pointsEarned,
    }));

    addToast(
      `Quiz Complete! +${pointsEarned} Points`,
      `Score: ${score} points earned for civic knowledge!`,
      'reward'
    );
  };

  const completeModuleLesson = (moduleId: string) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          const nextProgress = Math.min(100, mod.progress + 25);
          const isCertified = nextProgress >= 100;
          if (isCertified && !mod.certified) {
            setUser((u) => ({ ...u, points: u.points + 60 }));
            addToast('Module Certified! +60 Points', `Congratulations on completing "${mod.title}"!`, 'reward');
          }
          return {
            ...mod,
            progress: nextProgress,
            certified: isCertified,
          };
        }
        return mod;
      })
    );
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        posts,
        createReport,
        toggleUpvote,
        addComment,
        toggleBookmark,
        voteInPoll,
        briefing,
        reels,
        toggleReelLike,
        toggleReelSave,
        addReelComment,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        vacancies,
        appliedVacancies,
        applyVacancy,
        quizzes,
        completedQuizzes,
        completeQuiz,
        badges,
        modules,
        completeModuleLesson,
        toasts,
        addToast,
        removeToast,
        selectedPostForDetail,
        setSelectedPostForDetail,
        selectedPostForComments,
        setSelectedPostForComments,
        selectedPostForShare,
        setSelectedPostForShare,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
