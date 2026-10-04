// The one video review on the site, shown in the home page's reviews wall and on /developers.
export const VIDEO_REVIEW = {
  // Not supplied yet. Until it is, the card leads with the role and organisation.
  name: null as string | null,
  role: "Founder & Executive",
  org: "Synthesis Trust",
  background: "Ex-Vice President, Enterprise Solution Delivery, Cognizant",
  video: "/videos/synthesis-trust-founder-review.mp4",
  // a still from the clip and a square crop of it, so nothing of the 14 MB file loads before play
  poster: "/reviews/synthesis-trust-founder-poster.jpg",
  avatar: "/reviews/synthesis-trust-founder-avatar.jpg",
  // the clip's pixel size: its frame takes this shape before the video loads
  width: 478,
  height: 850,
};

// The two header lines of the card: who it is, then where they are from.
export const VIDEO_REVIEW_HEADER = VIDEO_REVIEW.name
  ? ([VIDEO_REVIEW.name, `${VIDEO_REVIEW.role}, ${VIDEO_REVIEW.org}`] as const)
  : ([VIDEO_REVIEW.role, VIDEO_REVIEW.org] as const);
