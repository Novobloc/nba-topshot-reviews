import ReviewContract from 0xb880e7b2e2c0a70b

pub fun main(): [ReviewContract.review] {
  return ReviewContract.getReviews()
}
