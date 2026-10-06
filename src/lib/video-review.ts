// Video testimonials shown in the home page's reviews wall and on /developers.
// One real review today; more are expected soon, so VIDEO_REVIEWS also carries
// placeholder slots (video: null) that render as "coming soon" cards instead
// of being hidden, so the wall doesn't look like a single lonely clip.
export type VideoReview = {
  name: string | null;
  role: string;
  org: string;
  background?: string;
  video: string | null;
  // a still from the clip and a square crop of it, so nothing of the video
  // file loads before play
  poster?: string;
  avatar?: string;
  // the clip's pixel size: its frame takes this shape before the video loads
  width: number;
  height: number;
};

export const VIDEO_REVIEWS: VideoReview[] = [
  {
    name: "Krishna Prasad Yerramilli",
    role: "Founder & Executive",
    org: "Synthesis Trust",
    background: "Ex-Vice President, Enterprise Solution Delivery, Cognizant",
    video: "/videos/synthesis-trust-founder-review.mp4",
    poster: "/reviews/synthesis-trust-founder-poster.jpg",
    avatar: "/reviews/synthesis-trust-founder-avatar.jpg",
    width: 478,
    height: 850,
  },
  // Placeholder slots for reviews expected soon — kept so the wall reads as
  // "more are coming" rather than shrinking back to one card.
  { name: null, role: "", org: "", video: null, width: 478, height: 850 },
  { name: null, role: "", org: "", video: null, width: 478, height: 850 },
];

export const VIDEO_REVIEW = VIDEO_REVIEWS[0];

// The two header lines of a video review card: who it is, then where they're from.
export function videoReviewHeader(review: VideoReview): readonly [string, string] {
  return review.name
    ? ([review.name, `${review.role}, ${review.org}`] as const)
    : ([review.role, review.org] as const);
}

export const VIDEO_REVIEW_HEADER = videoReviewHeader(VIDEO_REVIEW);
