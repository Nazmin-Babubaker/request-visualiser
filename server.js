import express from "express";
import cors from "cors";
import dns from "dns";


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running ");
});


app.post("/test", async(req, res) => {
  let { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const parsed = new URL(url);
   const lookup = await dns.promises.lookup(parsed.hostname, { family: 4 });
    console.log(lookup.address)
    
    const geoRes = await fetch(`https://ipinfo.io/${lookup.address}/json`);
    console.log(geoRes)
    const geo = await geoRes.json();
    console.log(geo)

    res.json({
      original: url,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      ipAddress: lookup.address,

  location: {
    country: geo.country_name,
    city: geo.city,
    region: geo.region,
    latitude: geo.latitude,
    longitude: geo.longitude,
    org: geo.org,
  },

  path: parsed.pathname,
  query: parsed.search,
    });
  } catch (err) {
    res.status(400).json({ error: "Domain does not exist or is invalid" });  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000 ");
});
