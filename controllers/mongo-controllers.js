const test = true;
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
    let toExplain = false;
    try {
        collectionName = requestQuery.collectionName;
        limitCount = parseInt(requestQuery.limit);
        collection = db.collection(collectionName);
        requestQuery.includeFields && (projection = JSON.parse(requestQuery.includeFields));
        sort = requestQuery.sortField;
        requestQuery.modifiers && requestQuery.modifiers != 'null' && JSON.parse(requestQuery.modifiers).explain && (toExplain = true);
    } catch (err) {
        console.log("error:", err);
        return res.status(500).json({message: "Invalid fields please check the query"});
    }


    try {
        query = JSON.parse(requestQuery.query);
        test && console.log("query ->", query);

    } catch (err) {
        test && console.log(err);
        return res.status(500).json({message: "Invalid query"});
    }

    let result;

    try {
        if (toExplain) {
            test && console.log("explain");
            result = await collection.find(query).explain();
        } else {
            result = await collection.find(query).project(projection).limit(limitCount).toArray();
        }

    } catch (err) {
        test && console.log("err :", err);
        return res.status(500).json({message: "Error"});
    }

    test && console.log("result->", result);
    if (limitCount === 1 && !toExplain) {
        result = result[0];
    }


    if (!result) {
        return res.status(404).json({message: "Not found"});
    }

    return res.status(200).json(result);

}
exports.handleQuery = handleQuery;