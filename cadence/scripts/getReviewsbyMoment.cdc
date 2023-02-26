import ReviewContract from 0x01

pub fun main(momentId:String): [ReviewContract.review] {
  return ReviewContract.getReviewsByMomentId(momentId:momentId)
}
