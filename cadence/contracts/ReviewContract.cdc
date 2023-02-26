
pub contract ReviewContract {

    pub struct review {
        pub let by: Address
        pub let stars: UInt64
        pub let comment: String
        pub let date: String
        pub let id: String
        

        init(by: Address, stars: UInt64, comment: String, date: String, id: String) {
            self.by = by
            self.stars = stars
            self.comment = comment
            self.date = date
            self.id = id
            
        }
    }

    pub let reviews: [review]

    init() {
        // This is the constructor method
        self.reviews = []    
    }

    // create a review
    pub fun createReview(by: Address, stars: UInt64, comment: String, date: String, id: String) {
        let newReview =  review(by: by, stars: stars, comment: comment, date: date, id: id)
        self.reviews.append(newReview)
        log(newReview)
    }

    // get all reviews
    pub fun getReviews(): [review] {
        return self.reviews
    }

    // get reviews by id
    pub fun getReviewsByid(id: String): [review] {
        let reviewsByMoment:[review] = [];

        for element in self.reviews {
            if(id == element.id) {
                reviewsByMoment.append(element)
             }
        }
        return reviewsByMoment
    }  

}