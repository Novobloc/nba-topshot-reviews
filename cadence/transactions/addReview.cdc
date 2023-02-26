import ReviewContract from 0x01

transaction(stars: UInt64, comment: String, date: String, momentId: String){

    var signerAddress: Address;

    prepare(signer: AuthAccount){
    self.signerAddress = signer.address
        log(signer.address)
    }

    execute {
       
        ReviewContract.createReview(by:self.signerAddress,stars:stars,comment:comment,date:date,momentId:momentId)
        
    }

}