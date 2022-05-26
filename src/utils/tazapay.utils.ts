import https from 'https';
import crypto from 'crypto';
import config from "config";

const accessKey = config.get("tazapayAccessKey") as string;
const secretKey = config.get("tazapaySecretKey") as string;
const baseURL = config.get("tazapayBaseUrl") as string;
const log = false

export async function makeRequest(method:string, urlPath:string, body = null) {
  try {
    let httpMethod = method;
    let httpBaseURL = baseURL;
    let httpURLPathforSign = urlPath.split("?")[0]; // use only path without params.
    let salt = generateRandomString(6);
    let timestamp = Math.round(new Date().getTime() / 1000);
    let signature = sign(
      httpMethod,
      httpURLPathforSign,
      salt,
      timestamp
    );

    const options = {
      hostname: httpBaseURL,
      port: 443,
      path: urlPath,
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        salt,
        timestamp,
        signature,
        accessKey,
      },
    };
    return await httpRequest(options, body);
  } catch (error) {
    console.error("Error generating request options");
    throw error;
  }
}

function sign(method:string, urlPath:string, salt:string, timestamp:number) {
  try {
    let toSign =
      method.toUpperCase() + urlPath + salt + timestamp + accessKey + secretKey;
    log && console.log(`toSign: ${toSign}`);

    let hash = crypto.createHmac("sha256", secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64");
    log && console.log(`signature: ${signature}`);

    return signature;
  } catch (error) {
    console.error("Error generating signature");
    throw error;
  }
}

function generateRandomString(size:number) {
  try {
    return crypto.randomBytes(size).toString("hex");
  } catch (error) {
    console.error("Error generating salt");
    throw error;
  }
}

async function httpRequest(options:any, body:any) {
  return new Promise((resolve, reject) => {
    try {
      let bodyString = "";
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString == "{}" ? "" : bodyString;
      }

      log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
      const req = https.request(options, (res) => {
        let response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: "",
        };

        res.on("data", (data) => {
          response.body += data;
        });

        res.on("end", () => {
          response.body = response.body ? JSON.parse(response.body) : {};
          log &&
            console.log(`httpRequest response: ${JSON.stringify(response)}`);

          if (response.statusCode !== 200) {
            return reject(response);
          }

          return resolve(response);
        });
      });

      req.on("error", (error) => {
        return reject(error);
      });

      req.write(bodyString);
      req.end();
    } catch (err) {
      return reject(err);
    }
  });
}
