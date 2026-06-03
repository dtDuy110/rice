import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from './Button';
import api from '../../services/api';

export default function ReviewSection({ productId, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/products/${productId}/reviews`);
      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Vui lòng đăng nhập để đánh giá', 'error');
      return;
    }
    if (!comment.trim()) {
      showToast('Vui lòng nhập nội dung đánh giá', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(`/products/${productId}/reviews`, {
        rating,
        comment
      });
      if (res.data.success) {
        showToast('Đánh giá thành công', 'success');
        setComment('');
        setRating(5);
        fetchReviews();
        if (onReviewAdded) onReviewAdded();
      }
    } catch (error) {
      showToast(error.response?.data?.error || 'Không thể gửi đánh giá', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Check if current user already reviewed
  const hasReviewed = user && reviews.some(r => r.user?._id === user._id || r.user === user._id);

  if (loading) return <div className="py-8 text-center text-on-surface-variant">Đang tải đánh giá...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Review Form */}
      {user ? (
        hasReviewed ? (
          <div className="bg-surface-container-low p-6 rounded-2xl text-center text-on-surface-variant border border-outline-variant/30">
            Bạn đã đánh giá sản phẩm này rồi. Cảm ơn phản hồi của bạn!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-2xl border border-surface-variant shadow-sm space-y-4">
            <h3 className="font-semibold text-lg text-on-surface" style={{ fontFamily: 'var(--font-family-heading)' }}>Viết đánh giá</h3>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${rating >= star ? 'text-yellow-400' : 'text-outline-variant'}`}
                >
                  <Star fill={rating >= star ? 'currentColor' : 'none'} size={24} />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              className="w-full h-32 bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary resize-none"
            />
            
            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
              </Button>
            </div>
          </form>
        )
      ) : (
        <div className="bg-surface-container-low p-6 rounded-2xl text-center text-on-surface-variant border border-outline-variant/30">
          Vui lòng <a href="/dang-nhap" className="text-primary hover:underline">đăng nhập</a> để đánh giá sản phẩm này.
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-on-surface" style={{ fontFamily: 'var(--font-family-heading)' }}>
          Khách hàng đánh giá ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <p className="text-on-surface-variant text-body-md py-4">Chưa có đánh giá nào cho sản phẩm này.</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="border-b border-outline-variant/30 py-6 last:border-0">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-on-surface">{review.user?.name || 'Khách hàng'}</p>
                  <p className="text-label-sm text-on-surface-variant mt-0.5">
                    {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-outline-variant'} />
                  ))}
                </div>
              </div>
              <p className="text-body-md text-on-surface-variant leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
