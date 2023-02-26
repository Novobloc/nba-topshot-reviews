import ReviewContract from 0xb880e7b2e2c0a70b

transaction(stars: UInt64, comment: String, date: String, id: String){

    var signerAddress: Address;

    prepare(signer: AuthAccount){
    self.signerAddress = signer.address
        log(signer.address)
    }

    execute {
       
        ReviewContract.createReview(by:self.signerAddress,stars:stars,comment:comment,date:date,id:id)
        
    }

}