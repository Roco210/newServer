

const url = "/api/products"
export const urlData = async (req, res, next) => {
    console.log(req.originalUrl)
    console.log(req.originalUrl)
    next()
}

export const allProdsObj = async () => {
    const allprod = await fetch(`http://localhost:8080/api/products`)
    const getProd = await allprod.json()
    const allProds = getProd.payload
    const allProdMap = allProds.map(e => ({
        _id: e._id,
        title: e.title,
        description: e.description,
        code: e.code,
        price: e.price,
        stock: e.stock,
        category: e.category
    }))
    return allProdMap
}





