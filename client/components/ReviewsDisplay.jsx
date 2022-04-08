import React from 'react';
import Review from './Review.jsx';

const ReviewsDisplay = ({ reviews }) => {
    const reviewsElems = [];

    for(let i = reviews.length - 1; i >= 0 ; i--) {
        reviewsElems.push(
            <Review
                key={`Review${i}`}
                date={reviews[i].date}
                cheese_score={reviews[i].cheese_score}
                crust_score={reviews[i].crust_score}
                plain_score={reviews[i].plain_score}
                slice_review={reviews[i].slice_review}
                shopName={reviews[i].name}
            /> 
        )
    };

    return(
        <div className="reviewDisplayBox">
            <h3>Reviews Display</h3>
            <div>{reviewsElems}</div>
        </div>
    );
};

export default ReviewsDisplay;