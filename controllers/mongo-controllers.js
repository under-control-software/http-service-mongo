const test = false;
const handleQuery = async (req, res, next) => {
    console.log("got request from " + req.url);
    // console.log("req :", req);
    const db = req.app.locals.db;
    const requestQuery = req.body;

    test && console.log("request ->", requestQuery);
    let collectionName;
    let limitCount;
    let collection;
    let projection = {};
    let query = {};
    let sort = {};

    try {
        collectionName = requestQuery.collectionName;
        limitCount = parseInt(requestQuery.limit);
        collection = db.collection(collectionName);
        projection = requestQuery.includeFields;
        sort = requestQuery.sortField;
    }
    catch (err) {
        console.log("error:", err);
        return res.status(500).json({message: "Invalid fields please check the query"});
    }


    try {
        query = requestQuery.query;
        // console.log("query ->", query);
        //    convert the values can be converted into array

    } catch (err) {
        test && console.log(err);
        return res.status(500).json({message: "Invalid query"});
    }

    let result;

    try {
        result = await collection.find(query).project(projection).limit(limitCount).toArray();
    } catch (err) {
        test && console.log("err :", err);
        return res.status(500).json({message: "Error"});
    }
    
    // console.log("result ->", result);
    if (limitCount === 1) {
        result = result[0];
    }

    // console.log(result);
    if (!result) {
        return res.status(404).json({message: "Not found"});
    }

    return res.status(200).json(result);

}
exports.handleQuery = handleQuery;