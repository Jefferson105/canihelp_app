export const ratingAverage = (rating) => {
    if (rating.isProReview) {
        return (
            (rating?.Agility +
                rating?.Cordiality +
                rating?.Price +
                rating?.Professionalism +
                rating?.Punctuality +
                rating?.Quality) /
            6
        ).toFixed(2);
    } else {
        return rating?.Total?.toFixed(2);
    }
};
