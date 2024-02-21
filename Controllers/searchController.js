import LandTrade from '../Models/landTradeModel.js'

const searchProperties = async (req, res) => {
    try {
        const { query } = req.query
        // Tìm kiếm dữ liệu LandTrade dựa trên query
        const result = await LandTrade.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { descirbe: { $regex: query, $options: 'i' } },
                {
                    price: [
                        { price: { $gte: 0 } },
                        { price: { $exists: true } }
                    ]
                },
                { addressLand: { $regex: query, $options: 'i' } }
            ],
        });
        res.json(result);
    } catch (error) {
        console.log('search failed', error.message);
        res.status(500).json({ message: 'search failed' })
    }
}
export { searchProperties }