const handleQuery = async (req, res, next) => {
    // console.log("req :", req);
    const db = req.app.locals.db;

    const requestQuery = req.body;

    console.log("request ->", requestQuery);
    const collectionName = requestQuery.collectionName;
    const limitCount = parseInt(requestQuery.limit);
    const collection = db.collection(collectionName);
    let query;
    try {
        query = JSON.parse(requestQuery.query);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Invalid query"});
    }

    let result;
    try {
        result = await collection.find(query).limit(limitCount).toArray();
    } catch (err) {
        console.log("err :", err);
        return res.status(500).json({message: "Error"});
    }
    console.log("result ->", result);
    if (limitCount === 1) {
        result = result[0];
    }

    console.log(result);
    if (!result) {
        return res.status(404).json({message: "Not found"});
    }
    
    return res.status(200).json(result);

}
exports.handleQuery = handleQuery;