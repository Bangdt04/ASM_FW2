import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";

interface Comment {
  user: string;
  comment: string;
  userImage: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  reviews: string;
  image: string;
  date: string;
  likes: number;
  comments: Comment[];
}

interface ReviewsSummary {
  averageRating: number;  // Điểm trung bình đánh giá của sản phẩm
  [key: number]: number;  // Số lượng đánh giá cho từng số sao
}

interface Product {
  id: number;
  name: string;
  desc: string;
  longDesc: string;
  price: number;
  discount: number;
  image: string;
  images: string[];
}

const About: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSummary, setReviewSummary] = useState<ReviewsSummary>({
    averageRating: 0,
  });

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      if (!id) return;

      try {
        const productResponse = await fetch(`http://localhost:3000/products/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);

        const reviewsResponse = await fetch(`http://localhost:3000/products/${id}/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        const summaryResponse = await fetch(`http://localhost:3000/products/${id}/reviewSummary`);
        const summaryData = await summaryResponse.json();
        setReviewSummary(summaryData);
      } catch (error) {
        console.error("Error fetching product and reviews:", error);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const averageRating = reviewSummary.averageRating || 0;
  const totalReviews = Object.values(reviewSummary).reduce(
    (acc, value) => acc + value,
    0
  );

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <p className="text-lime-700 text-3xl font-normal">About</p>
        <p className="text-stone-600 text-xl font-light mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          <br />
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          <br />
          type and scrambled it.
        </p>
      </div>
      {product && (
        <div className="flex items-start justify-between w-full sm:w-2/3">
          <div className="flex gap-3 items-center">
            <img
              src={product.image}
              className="w-48 object-cover rounded-lg"
              alt={product.name}
            />
            <div>
              <div className="flex mb-2">
                {Array.from({ length: 5 }, (_, i) =>
                  i < Math.round(averageRating) ? (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ) : (
                    <AiOutlineStar key={i} className="text-yellow-400" />
                  )
                )}
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-lime-700 text-3xl font-normal">
                  {averageRating.toFixed(1)}
                </p>
                <p>({totalReviews})</p>
              </div>
              <p className="text-stone-600 text-sm mt-1">{product.desc}</p>
            </div>
          </div>
          <button className="bg-[#4E7C32] py-2 px-4 rounded-xl text-white text-sm font-normal">
            Write reviews
          </button>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-lime-700 text-base font-medium">
                {review.name}
              </div>
              {review.rating > 0 && (
                <div className="flex ml-auto">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? (
                      <AiFillStar key={i} className="text-yellow-400" />
                    ) : (
                      <AiOutlineStar key={i} className="text-yellow-400" />
                    )
                  )}
                </div>
              )}
            </div>
            <p className="text-stone-600 text-sm mb-2">{review.reviews}</p>
            <div className="flex flex-col gap-3">
              {review.comments.map((comment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img
                    src={comment.userImage}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{comment.user}</p>
                    <p className="text-gray-600 text-sm">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
