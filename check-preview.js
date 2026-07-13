const https = require('https');

const postData = JSON.stringify({
  name: "Test Preview Check",
  email: "test@check.com",
  phone: "1234567890",
  companySize: "10-50",
  message: "Checking if API route is active on preview URL."
});

const options = {
  hostname: 'karamcharhr-4xkh4hxi5-vilisipsums-projects.vercel.app',
  port: 443,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Response Body:', data);
  });
});

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.write(postData);
req.end();
