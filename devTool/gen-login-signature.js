import * as ethers from "ethers"

import ethUtil from 'ethereumjs-util'
import sigUtil from 'eth-sig-util'

async function main(){
    // 1. Create a new user wallet
    const privateKey = process.argv[2];
    const NONCE = process.argv[3];
    if(!privateKey || !NONCE){
        throw new Error('Invalid params. Command: "node scripts/gen-login-signature PRIVATE_KEY NONCE"')
    }
    const userWallet = new ethers.Wallet(privateKey);

    console.log('1. user wallet');
    console.log({
        wallet_address: userWallet.address,
    })

    //2. FE: User open metamask and sign messsage
    console.log('2. FE: User open metamask and sign messsage');
    const msg = `Wellcome to XYZ, please sign this message to authen ${NONCE}`
    const signature = await userWallet.signMessage(msg);

    console.log({
        msg,
        signature
    })
    //3. BE verify signature
    console.log('3. BE verify signature');

    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    });
    console.log('- Address from signature: ', address)

    if (address.toLowerCase() !== userWallet.address.toLowerCase()) {
        console.log('Invalid Signature');
    }else{
        console.log('Valid Signature');
    }

    console.log('\n====== YOUR SIGNAGURE =====');
    console.log(signature);
    console.log('==========================\n');
}


main()
.then(() => {
    console.log('Done');
    process.exit(0);
})
.catch(err => {
    console.log(err);
    process.exit(1);
})
