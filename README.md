# Store api (In Development)

## Technonogies used

* ExpressJs
* NodeJs
* Mongodb
* Mongoose

## Run locally

* Clone repository
```
git clone https://github.com/Oggy107/store-api/
```

* Run `npm install` to install dependencies
* Create file named `.env` in root of the repository and store mongodb connection string in format `MONGO_URI=<Your mongodb connection-string>` in the file. [Here's](https://docs.mongodb.com/manual/reference/connection-string/#connection-string-formats) more about mongodb connection-string.
* Start api server by running `npm start`

## Base url

```
http://localhost:3000/api/v1/products
```
## Usage

* ### Get all products (default limit is 10)
```
GET http://localhost:3000/api/v1/products
```

* ### Common query parameters

|    Parameter    |    Description    |    Type    |
|-----------------|-------------------|------------|
|    `Name=`      |filter on specific name|String   |
|    `Company=`   |filter on specific company. Available companies:<br />`ikea`, `liddy`, `caressa`, `marcos`|String|
|    `featured=`  |filter by featured product|Boolean|
|    `numericFilters=`|filter on a specific numerical condition (<, <=, =, > or >=).<br />Available numerical fields:<br />`price`, `rating`|String|
|    `sort=`      |sort by field      |String      |
|    `fields=`    |return specified fields|String  |
|    `page=`      |page number        |Integer     |
|    `limit=`     |limit number of returned products|Integer|

* ### Examples
    * Get products matching *table*<br />
    ```
    http://localhost:3000/api/v1/products?page=1&name=table
    ```
    * Get featured products of company *ikea*<br />
    ```
    http://localhost:3000/api/v1/products?page=1&company=ikea&featured=true
    ```
    * Sort by name and price<br />
    ```
    http://localhost:3000/api/v1/products?page=1&sort=name,price
    ```
    * Get products between price range of 100-150<br />
    ```
    http://localhost:3000/api/v1/products?page=1&numericFilters=price>100,price<150
    ```