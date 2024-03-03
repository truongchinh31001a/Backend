import User from "../Models/userModel.js";

const updateStatusUser = (async (req, res) => {
    try {
        const userId = req.user._id
        const user = req.user
        if (!user || user.role !== 'Notary') return res.status(403).json({ message: 'You do not have permission to access this task.' })

        if (user.verifiedStatus === 'submitKYC') {
            await User.findByIdAndUpdate(userId, { verifiedStatus: 'approved' });
            return res.status(200).json({ message: 'The user status has been updated successfully' });
        } else if (user.verifiedStatus === 'approved') {
            await User.findByIdAndUpdate(userId, { verifiedStatus: 'rejected' });
            return res.status(200).json({ message: 'The user status has been updated successfully' });
        } else {
            return res.status(400).json({ message: 'The user status is invalid' });
        }

    } catch (error) {
        console.error('Error managing KYC:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export {updateStatusUser}