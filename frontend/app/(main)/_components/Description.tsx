import { CircleUserRound } from "lucide-react";
import React from "react";

type Review = {
  username: string;
  review: string;
  date: string;
};

export default function Description({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-gray-500">No reviews available.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Descriptions
      </h2>
      <ul className="space-y-4">
        {reviews.map((review, index) => (
          <li
            key={index}
            className="border-b border-gray-200 pb-4 last:border-none"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-gray-900 flex">
                <CircleUserRound className="mr-2 " />

                {review.username}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
