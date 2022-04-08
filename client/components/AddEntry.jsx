import React from 'react';

const AddEntry = ({ id, stores, submitReviewFunc }) => (

    <div className="AddEntryInnerBox">
        <p><h4>Add A New Review</h4></p>
        <p><label>Date: </label><span className="newEntryDate">2022-04-07</span></p>
        <p><label>Pizza Shop Name: </label><span className="pizzaShop">Napoli Pizza</span></p>
        <p><label>Cheese Rating: </label><input type="text" className="cheeseInput"></input></p>
        <p><label>Crust Rating: </label><input type="text" className="crustInput"></input></p>
        <div><input type="text" className="reviewInput"></input></div>
        <button className="submitButton" onClick={() => 
            submitReviewFunc('2022-04-07', 5, 5, "Napoli Pizza is life!!!")
        }>Submit Review</button>
    </div>

);

export default AddEntry;