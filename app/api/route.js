export const POST = async (req, res) => {
    try {
        const {zip, age, rooms, baths, garages, stories} = await req.json()
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${process.env.API_KEY}`)
        const {lon, lat, name} = await response.json()
        console.log(lon, lat)
        const post = await fetch('http://4a68-35-222-167-252.ngrok-free.app/', {
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