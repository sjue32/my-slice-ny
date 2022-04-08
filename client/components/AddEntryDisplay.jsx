import React from 'react';
import AddEntry from './AddEntry.jsx';

const AddEntryDisplay = ({ stores, submitReviewFunc }) => {

    return (
        <div className="AddEntryBox">
            <AddEntry
                key={"newReview"}
                id={"newReviewId"}
                stores={stores}
                submitReviewFunc={submitReviewFunc}
            />
        </div>
    );
};

export default AddEntryDisplay;