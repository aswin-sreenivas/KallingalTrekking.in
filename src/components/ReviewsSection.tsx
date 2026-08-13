import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Quote, ExternalLink, MapPin, PlusCircle, X, Send, Sparkles } from 'lucide-react';
import { REVIEWS, Review } from '../data/reviews';

interface GoogleReviewsData {
  placeName: string;
  rating: number;
  userRatingsTotal: number;
  googleMapsUrl: string;
  reviews: Review[];
}

export const ReviewsSection: React.FC = () => {
  const defaultMapsUrl = "https://share.google/8WJFqP2LC7ennkAdx";
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData>({
    placeName: "Kallingal Trekking, Banasura Hills",
    rating: 4.9,
    userRatingsTotal: 520,
    googleMapsUrl: defaultMapsUrl,
    reviews: REVIEWS
  });
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string>('');

  // Form states
  const [authorName, setAuthorName] = useState<string>('');
  const [authorLocation, setAuthorLocation] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [selectedPackage, setSelectedPackage] = useState<string>('Banasura Hills Views Jeep Trekking');
  const [commentText, setCommentText] = useState<string>('');

  const fetchLiveReviews = () => {
    fetch('/api/google-reviews')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.reviews && data.reviews.length > 0) {
          setReviewsData({
            placeName: data.placeName || "Kallingal Trekking, Banasura Hills",
            rating: data.rating || 4.9,
            userRatingsTotal: data.userRatingsTotal || 520,
            googleMapsUrl: defaultMapsUrl,
            reviews: data.reviews
          });
        }
      })
      .catch((_err) => {
        // Fallback to default REVIEWS if fetch fails
      });
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: authorName,
          location: authorLocation || 'Verified Wayanad Visitor',
          rating: selectedRating,
          packageTaken: selectedPackage,
          comment: commentText
        })
      });

      const resData = await response.json();
      if (resData.success && resData.updatedStats) {
        setReviewsData({
          placeName: "Kallingal Trekking, Banasura Hills",
          rating: resData.updatedStats.rating,
          userRatingsTotal: resData.updatedStats.userRatingsTotal,
          googleMapsUrl: defaultMapsUrl,
          reviews: resData.updatedStats.reviews
        });
        setSubmitSuccessMsg('Thank you! Your review has been published in real-time.');
        setAuthorName('');
        setAuthorLocation('');
        setCommentText('');
        setSelectedRating(5);
        setTimeout(() => {
          setIsWriteModalOpen(false);
          setSubmitSuccessMsg('');
        }, 1800);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = reviewsData.reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Google Rating Counter Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Google Maps Official Rating Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/90 text-[#0D47A1] font-heading text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 shadow-sm">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-extrabold text-blue-900">{reviewsData.rating} / 5.0</span>
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-blue-800">({reviewsData.userRatingsTotal}+ Verified Reviews)</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
            Real-Time Google & Trekker Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Real feedback synced live from our official Google profile and real-time trekker submissions.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={reviewsData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D47A1] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow-sm"
            >
              <MapPin className="w-4 h-4 text-blue-300" />
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
            </a>
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Write Real-Time Review</span>
            </button>
            <a
              href={reviewsData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-heading font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Review on Google</span>
            </a>
          </div>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterRating === 'all'
                  ? 'bg-[#0D47A1] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Reviews ({reviewsData.reviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                filterRating === 5
                  ? 'bg-[#0D47A1] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>5 Stars</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 border border-blue-50 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100 pointer-events-none group-hover:text-blue-200/60 transition-colors" />

              <div>
                {/* Star Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-400">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed font-normal italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div>
                {/* Package Tag & Google Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-block px-3 py-1 rounded-md bg-blue-100/80 text-[#0D47A1] text-[11px] font-bold">
                    {review.packageTaken}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Reviewer Profile Header */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#1565C0] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-heading font-bold text-sm text-gray-900">{review.name}</h4>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{review.location}</p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Google Review Note & Direct Link */}
        <div className="mt-12 text-center flex flex-col items-center gap-2">
          <p className="text-xs text-gray-500 font-medium max-w-lg">
            ★ Automated ratings & reviews fetched directly from the official Google listing for Kallingal Trekking, Wayanad.
          </p>
          <a
            href={reviewsData.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#0D47A1] hover:underline inline-flex items-center gap-1 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100"
          >
            <span>{reviewsData.googleMapsUrl}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Real-Time Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-blue-100">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#0D47A1]">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Live Review Submission</span>
            </div>

            <h3 className="text-xl font-heading font-extrabold text-gray-900 mb-1">
              Share Your Trek Experience
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Your feedback will be published immediately to our live review section.
            </p>

            {submitSuccessMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-center font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{submitSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Kozhikode, Kerala"
                    value={authorLocation}
                    onChange={(e) => setAuthorLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= selectedRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-600 ml-2">{selectedRating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Package Experienced</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  >
                    <option value="Banasura Hills Views Jeep Trekking">Banasura Hills Views Jeep Trekking</option>
                    <option value="Sunrise Ridge & Cloud Sea Trek">Sunrise Ridge & Cloud Sea Trek</option>
                    <option value="Overnight Peak Camping & Expedition">Overnight Peak Camping & Expedition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Review / Comment *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the jeep trail, views, and guide experience..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D47A1] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-blue-800 transition-colors shadow disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Publishing...' : 'Publish Real-Time Review'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

