class ApiFeatures {
    constructor(query, queryParams) {
        this.query = query;
        this.queryParams = queryParams;
    }

    // 1. Filtering
    filter() {
        const queryObj = { ...this.queryParams };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((field) => delete queryObj[field]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // 2. Sorting
    sort() {
        if (this.queryParams.sort) {
            const sortBy = this.queryParams.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        console.log('Sort Query:', this.query);
        return this;
    }

    // 3. Field Limiting
    limitFields() {
        if (this.queryParams.fields) {
            const fields = this.queryParams.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        console.log('Fields Query:', this.query);
        return this;
    }

    // 4. Pagination
    paginate() {
        const page = parseInt(this.queryParams.pageNo, 10) || 1;
        const limit = parseInt(this.queryParams.pageSize, 10) || 10;
        const skip = (page - 1) * limit;

        if (page < 1 || limit < 1) {
            throw new Error('Invalid pagination parameters.');
        }

        this.query = this.query.skip(skip).limit(limit);

        console.log('Pagination Query:', this.query);
        return this;
    }
}
module.exports = ApiFeatures
