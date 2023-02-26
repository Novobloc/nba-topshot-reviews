import ReviewContract from 0x01

pub fun main(): [ReviewContract.review] {
  return ReviewContract.getReviews()
}
