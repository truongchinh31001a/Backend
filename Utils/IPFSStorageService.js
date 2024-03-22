import pkg from '@pinata/sdk';

const PinataSDK = pkg;
const pinata = new PinataSDK({
    pinataApiKey: 'e7ba3ca1383ab23bab90',
    pinataSecretApiKey: '9ddfc6bd53b9feb3e69b479c4e09055e5fd40d75c0bdbb35b5d97f6d64297dfd',
});

const pinataClient = async () => {
    return pinata;
};

const uploadToIPFS = (async (certificateJSON, address) => {
    try {
        const pinata = await pinataClient();
        const options = {
            pinataMetadata: {
                name: `${address}.json`
            }
        };
        const result = await pinata.pinJSONToIPFS({ certificateJSON, timestamp: Date.now() }, options);
        console.log(result);
        return result.IpfsHash
    } catch (error) {
        console.error('Failed upload file JSON certificate:', error.message);
        throw new Error('Failed upload file JSON certificate');
    }
})

export { uploadToIPFS }