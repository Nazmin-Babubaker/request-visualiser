import express from "express";
import cors from "cors";
import dns from "dns";
import { performance } from "perf_hooks";
import https from "https";
import http from "http";


function isValidHostname(hostname) {
  if (!hostname.includes(".")) return false;

  const pattern =
    /^(?=.{1,253}$)(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))*$/;

  return pattern.test(hostname);
}


function detectServerType(headers, org) {
  const server = headers["server"]?.toLowerCase() || "";
  const organization = org?.toLowerCase() || "";

  // ----- High confidence (Header-based) -----

  if (headers["cf-ray"]) {
    return { type: "Edge Server", provider: "Cloudflare", confidence: "High" };
  }

  if (headers["x-amz-cf-id"]) {
    return { type: "Edge Server", provider: "AWS CloudFront", confidence: "High" };
  }

  if (headers["x-served-by"]) {
    return { type: "Edge Server", provider: "Fastly", confidence: "High" };
  }

  if (headers["via"] || headers["x-cache"]) {
    return { type: "Edge Server", provider: "CDN/Proxy", confidence: "Medium" };
  }

  // ----- Medium confidence (ASN/org-based) -----

  if (organization.includes("cloudflare")) {
    return { type: "Edge Server (Likely)", provider: "Cloudflare", confidence: "Medium" };
  }

  if (organization.includes("akamai")) {
    return { type: "Edge Server (Likely)", provider: "Akamai", confidence: "Medium" };
  }

  if (organization.includes("fastly")) {
    return { type: "Edge Server (Likely)", provider: "Fastly", confidence: "Medium" };
  }

  if (organization.includes("cloudfront")) {
    return { type: "Edge Server (Likely)", provider: "CloudFront", confidence: "Medium" };
  }

if (organization.includes("google")) {
  if (server.includes("gws") || server.includes("esf")) {
    return {
      type: "Edge Server",
      provider: "Google Front End",
      confidence: "High"
    };
  }

  return {
    type: "Origin Server (Google Cloud)",
    provider: "Google Cloud",
    confidence: "Medium"
  };
}



  return {
    type: "Origin Server",
    provider: org || server || "Unknown",
    confidence: "Low"
  };
}




function measureTimings(url) {
  return new Promise((resolve, reject) => {
    const timings = {};
    const start = performance.now();

    const lib = url.startsWith("https") ? https : http;

    const req = lib.get(url, (res) => {
      timings.firstByte = performance.now() - start;

       const headers = res.headers;
      const statusCode = res.statusCode;
      const httpVersion = res.httpVersion;


      res.on("data", () => {});
      res.on("end", () => {
        timings.total = performance.now() - start;
        resolve({
          timings,
          headers,
          statusCode,
          httpVersion
        });
      });
    });

    req.on("socket", (socket) => {
      socket.on("lookup", () => {
        timings.dns = performance.now() - start;
      });

      socket.on("connect", () => {
        timings.tcp = performance.now() - start;
      });

      socket.on("secureConnect", () => {
        timings.tls = performance.now() - start;
      });
    });

    req.on("error", reject);
    req.setTimeout(6000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
}


function buildHops(timings) {
  const hops = [];

  const dns = timings.dns || 0;
  const tcp = timings.tcp || dns;
  const tls = timings.tls || tcp;
  const total = timings.total || tls;

 const phases = [
    {
      label: "DNS Resolver",
      latency: dns,
      description: "Translated domain name into IP address."
    },
    {
      label: "ISP Gateway",
      latency: tcp - dns,
      description: "Established TCP connection."
    },
    {
      label: "TLS Handshake",
      latency: tls - tcp,
      description: "Secure encrypted tunnel established."
    },
    {
      label: "Server Response",
      latency: total - tls,
      description: "Server processed request and responded."
    }
  ];

  let cumulativeDistance = 0;

  phases.forEach((phase, index) => {
    const latency = Number(phase.latency.toFixed(2));
    const distance = latency * 4; // scale factor

    cumulativeDistance += distance;

    hops.push({
      id: index + 1,
      label: phase.label,
      latency,
      description: phase.description,
      visual: {
        distanceFromCenter: cumulativeDistance,
        glowIntensity: Math.min(latency / 100, 1),
        animationDelay: cumulativeDistance / 50
      }
    });
  });

  return hops;
}



const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running ");
});


app.post("/test", async (req, res) => {
  let { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
   
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const parsed = new URL(url);

    if (!isValidHostname(parsed.hostname)) {
     return res.status(400).json({ error: "Invalid domain format" });
  }

   
   let ipAddress;

   try {
      const lookup = await dns.promises.lookup(parsed.hostname, { family: 4 });
      ipAddress = lookup.address;
   } catch (err) {
     if (err.code === "ENOTFOUND") {
      return res.status(404).json({ error: "Domain does not exist" });
     }
    throw err;
     }


    
    let geo = {};
    try {
      const geoRes = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      geo = await geoRes.json();
    } catch {
      geo = {};
    }



  

   const result = await measureTimings(parsed.href);
   const timings = result.timings;
   const headers = result.headers;

const serverInfo = detectServerType(headers, geo.org);
    
   const hops = buildHops(timings);


   

   
    res.json({
      original: url,
      protocol: parsed.protocol,
      hostname: parsed.hostname,
      ipAddress,

      location: {
        country: geo.country || null,
        city: geo.city || null,
        region: geo.region || null,
        latitude: geo.loc ? geo.loc.split(",")[0] : null,
        longitude: geo.loc ? geo.loc.split(",")[1] : null,
        org: geo.org || null,
      },

      path: parsed.pathname,
      query: parsed.search,

     journey: {
          dnsMs: Number(timings.dns?.toFixed(2) || 0),
          tcpMs: Number(timings.tcp?.toFixed(2) || 0),
          tlsMs: Number(timings.tls?.toFixed(2) || 0),
          firstByteMs: Number(timings.firstByte?.toFixed(2) || 0),
          totalMs: Number(timings.total?.toFixed(2) || 0),
        },
        hops,
        server: {
          type: serverInfo.type,
          provider: serverInfo.provider,
          confidence: serverInfo.confidence,
          rawServerHeader: headers["server"] || null
        },
        httpVersion: result.httpVersion,

      
    });
  } catch (err) {
      console.error("Probe error:", err);

  if (err.code === "ENOTFOUND") {
    return res.status(404).json({ error: "Domain not found" });
  }

  if (err.code === "ECONNREFUSED") {
    return res.status(502).json({ error: "Connection refused by server" });
  }

  if (err.code === "ECONNRESET") {
    return res.status(502).json({ error: "Connection reset by server" });
  }

  if (err.message && err.message.includes("timed out")) {
    return res.status(408).json({ error: "Request timed out" });
  }

  if (err.code === "EPROTO") {
    return res.status(502).json({ error: "TLS handshake failed" });
  }

  return res.status(500).json({
    error: "Network probe failed",
    detail: err.code || err.message,
  });
}
});

app.listen(5002, () => {
  console.log("Server running on port 5000 ");
});
