import ReviewContract from 0xb880e7b2e2c0a70b

pub fun main(id:String): [ReviewContract.review] {
  return ReviewContract.getReviewsByid(id:id)
}
