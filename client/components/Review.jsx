import React from 'react';

const Review = ({ date, cheese_score, crust_score, plain_score, slice_review, shopName }) => (
    <div className="reviewBox">
        <p><label>Date: </label><span>{date}</span></p>
        <p><label>Name: </label><span>{shopName}</span></p>
        <p><label>Cheese Score: </label><span>{cheese_score}</span></p>
        <p><label>Crust Score: </label><span>{crust_score}</span></p>
        <p><label>Total Score: </label><span>{plain_score}</span></p>
        <p><article>{slice_review}</article></p>
    </div>
);

export default Review;