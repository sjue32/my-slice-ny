import React, { Component } from 'react';
// import '../stylesheets/styles.css';

// import { Switch, Route } from 'react-router-dom';
// i don't think i need switch or route for my project for the MVP

import AddEntryDisplay from './AddEntryDisplay.jsx';
import ReviewsDisplay from './ReviewsDisplay.jsx';
// import StoresDisplay from './StoresDisplay.jsx';
 
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedStores: false,
            fetchedReviews: false,
            reviews: [],
            stores: []
        }

        // section to bind defined functions to App class, this.bind
        this.submitReviewFunc = this.submitReviewFunc.bind(this);
    }

    componentDidMount() {
        // fetch request for reviews
        fetch('/reviews')
        .then(res => res.json())
        .then(reviews => {
            console.log(`--------> post fetch for reviews, response: ${reviews}`);
            
            // if(!Array.isArray(reviews)) reviews = [];
            return this.setState({
                reviews,
                fetchedReviews: true
            });
        }).catch(err => console.log('App.componentDidMount: get REVIEWS: ERROR: ', err));
        // fetch request for stores
        fetch('/reviews/stores')
        .then(res => res.json())
        .then(stores => {
            console.log(`--------> post fetch for reviews, response: ${stores}`);
            // if(!Array.isArray(stores)) stores = [];
            return this.setState({
                stores,
                fetchedStores: true
            });
        }).catch(err => console.log('App.componentDidMount: get STORES: ERROR: ', err));
    }

    // ADD FUNCTIONS HERE, NEED TO BE BINDED
    submitReviewFunc(date, cheese, crust, review) {
        console.log(`--------> made it into submitReviewFunc`);
        const plain_score = cheese + crust;

        const requestBody = {
            date: date,
            cheese_score: cheese_score,
            crust_score: crust_score,
            plain_score: plain_score,
            slice_review: review,
            store_id: 5
        };

        fetch('/reviews', {
            method: POST,
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(data => data.json())
        .then(data => {
            // additional fetch GET for updated reviews
            fetch('/reviews')
            .then(res => res.json())
            .then(reviews => {
                return this.setState({
                    reviews,
                });
            }).catch(err => console.log('trouble with fetch for updated reviews: ERROR: ', err));

        }).catch(err => console.log('trouble with fetch for updated reviews: ERROR: ', err));
    };


    render() {
        if(!this.state.fetchedReviews || !this.state.fetchedStores) return (
            <div>
                <h1>Loading ...</h1>
            </div>
        );

        const { reviews, stores, submitReviewFunc } = this.state;

        // condition if no reviews/store data
        if(!reviews) return null;
        console.log(`-------> insider render section of App, reviews: ${reviews}`);
        if(!stores) return null;
        console.log(`-------> insider render section of App, stores: ${stores}`);
        console.log(this.state);
        if(!reviews.length) return (
            <div>Sorry, no reviews!</div>
        );
        if(!stores.length) return (
            <div>Sorry, no store data!</div>
        );

        return (
            <div>
                <AddEntryDisplay
                    stores={stores}
                    reviews={reviews}
                    submitReviewFunc={submitReviewFunc}
                />
                <ReviewsDisplay
                    stores={stores}
                    reviews={reviews}
                />
                {/* <StoresDisplay
                    stores={stores}
                    reviews={reviews}
                /> */}
            </div>
        );

    }

};

export default App;