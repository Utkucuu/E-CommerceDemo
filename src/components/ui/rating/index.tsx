import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

interface RatingProps {
  rating: number;
  maxRating: number;
}

export default function Rating({ rating, maxRating }: RatingProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <span key={index}>
          {index < roundedRating ? (
            <StarFilledIcon className="text-yellow-500" />
          ) : (
            <StarIcon className="text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
}
