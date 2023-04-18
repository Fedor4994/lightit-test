export const getStarsByAverageRating = (rating: number) => {
  const stars = Array(Math.floor(rating)).fill(1);
  if (rating % 1 !== 0) {
    stars.push(0.5);
  }

  while (stars.length < 5) {
    stars.push(0);
  }

  return stars;
};
