class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    console.log(this.queryStr)
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    console.log('ajay sahu')
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit","deal_type"];
    if(this.queryStr.deal_type == "null"){
      removeFields.forEach((key) => delete queryCopy[key]);
    }
    console.log(queryCopy)
    //   Removing some fields for category
   

   

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    console.log('llllllllllllllll')
    console.log(queryStr)
   // queryStr = queryStr.replace(console.log(/\b(gt|gte|lt|lte)\b/g), (key) => console.log(key));

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (key) => `$${key}`);
    console.log('queryStr')
    console.log(queryStr)
    this.query = this.query.find(JSON.parse(queryStr));
//console.log(this.query)
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
