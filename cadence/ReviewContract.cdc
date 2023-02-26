
pub contract ReviewContract {

    pub struct review {
        pub let by: Address
        pub let stars: UInt64
        pub let comment: String
        pub let date: String
        pub let momentId: String
        

        init(by: Address, stars: UInt64, comment: String, date: String, momentId: String) {
            self.by = by
            self.stars = stars
            self.comment = comment
            self.date = date
            self.momentId = momentId
            
        }
    }

    pub let reviews: [review]

    init() {
        // This is the constructor method
        self.reviews = []    
    }

    // create a review
    pub fun createReview(by: Address, stars: UInt64, comment: String, date: String, momentId: String) {
        let newReview =  review(by: by, stars: stars, comment: comment, date: date, momentId: momentId)
        self.reviews.append(newReview)
        log(newReview)
    }

    // get all reviews
    pub fun getReviews(): [review] {
        return self.reviews
    }

    // get reviews by momentId
    pub fun getReviewsByMomentId(momentId: String): [review] {
        let reviewsByMoment:[review] = [];

        for element in self.reviews {
            if(momentId == element.momentId) {
                reviewsByMoment.append(element)
             }
        }
        return reviewsByMoment
    }  

}