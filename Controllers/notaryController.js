import LandLicence from "../Models/landLicenceModel.js";
import User from "../Models/userModel.js";
import { createdCertificate, createCertificateIPFSJon } from '../Utils/certificateService.js';
import { uploadToIPFS } from '../Utils/IPFSStorageService.js';

const updateStatusUser = (async (req, res) => {
    try {
        const { verifiedStatus } = req.body
        const userId = req.user._id
        const user = req.user
        if (!user || user.role !== 'NOTARY_ROLE') return res.status(403).json({ message: 'You do not have permission to access this task.' })

        if (user.verifiedStatus === 'submitted KYC') {
            await User.findByIdAndUpdate(userId, { verifiedStatus: verifiedStatus })
            if (verifiedStatus === 'approved') return res.status(200).json({ message: 'User KYC successfully' })
            if (verifiedStatus === 'rejected') return res.status(200).json({ message: 'Invalid information' })
        } else {
            return res.status(400).json({ message: 'The user status is invalid' });
        }
    } catch (error) {
        console.error('Error managing KYC:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

const createCertificate = (async (req, res) => {
    try {
        const userId = req.user._id
        const {wallet_address, land_lot, diagram_url, idBlockchain, ipfsHash, transactionHash, house_id, ProdForestIsAnArtificialForest, otherConstructionWork, perennialTrees, notice } = req.body;
        const data = { land_lot, diagram_url, idBlockchain, ipfsHash, transactionHash, house_id, ProdForestIsAnArtificialForest, otherConstructionWork, perennialTrees, notice };

        const certificateData = await createdCertificate(userId, data)
        const certificateJSON = await createCertificateIPFSJon(certificateData)
        // console.log(certificateJSON)
        const IpfsHash = await uploadToIPFS(certificateJSON, wallet_address)

        await LandLicence.findByIdAndUpdate({ _id: certificateData._id }, { $set: { ipfsHash: IpfsHash } }, { new: true })

        res.status(200).json({ IpfsHash, wallet_address, landlot: LandLicence.land_lot , message: 'Certificate successfully created',})
    } catch (error) {
        console.error('Error creating certificate:', error.message);
        return res.status(500).json({ error: 'Failed to create certificate' });
    }
})

const updateCerfiticate = (async (req, res) => {
    
const updateCertificate = async (licenseId, LandAddress, landLot) => {
    try {
      // Cập nhật trạng thái của landLicense trong cơ sở dữ liệu
      const updatedLandLicense = await LandLicense.findByIdAndUpdate(
        licenseId,
        {$set:{ status: 'is onBlockchain' }},
        { new: true }
      );
  
      // Trả về landLicense đã được cập nhật
      return updatedLandLicense;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error updating landLicense:', error);
      throw error;
    }
  };
})

const getSubmittedKYCUsers = async (req, res) => {
    try {
        const submittedKYCUsers = await User.find({ verifiedStatus: 'submitted KYC' })
            .select(' wallet_address idCard_front_url idCard_back_url id_card full_name verifiedStatus birthday hometown permanent_address email')
            .limit(100); // Giới hạn số lượng kết quả trả về
        res.status(200).json(submittedKYCUsers);
    } catch (error) {
        console.error('Error getting submitted KYC users:', error);
        res.status(500).json({ message: error.message }); // Trả về thông báo lỗi cụ thể
    }
};

export { updateStatusUser, createCertificate, updateCerfiticate, getSubmittedKYCUsers }

