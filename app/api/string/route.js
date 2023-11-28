export const POST = async (req, res) => {
    try {
        const {query} = await req.json()
        console.log(query)
        const response = await fetch(`${process.env.URL}/string`, {
            method: "POST", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        })
        const {zip, age} = await response.json()
        const response2 = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${process.env.API_KEY}`)
        const {lon, lat, name} = await response2.json()
        console.log(lon, lat)
        const post = await fetch(`${process.env.URL}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                long: lon, lat, age
            })
        })
        const final_res = await post.json()
        console.log(final_res)
        return new Response(JSON.stringify({price: final_res.price, location: name}))
    }
    catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ error: "Something went wrong" }, { status: 500 }));
    }
}