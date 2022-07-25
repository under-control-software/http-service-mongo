const axios = require('axios');
const serverUrl = "https://sweet-ladybug-42.telebit.io/api/mongo";
const test = false;
const handleQuery = async (req, res, next) => {
    // console.log("req :", req);
    try {
        test && console.log("request :", req.body);
        const requestQuery = req.body;
        test && console.log("requestQuery :", requestQuery);
        const response = await axios.post(serverUrl, requestQuery);
        test && console.log("response :", response);
        res.status(200).json(response.data);
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({message: "Internal server error"});
    }


}
exports.handleQuery = handleQuery;