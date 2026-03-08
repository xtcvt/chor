const http = require('http');
const { exec } = require('child_process');

const PORT = 3000;

const serverToken = process.env.SERVER_TOKEN || 'eyJhIjoiMjIxMDJlN2YyMjA3MTE1ZDY1ODc3MTMxNGNiMjlhM2EiLCJ0IjoiMzg5MDhiZmItY2VjYS00MThmLTgzOWEtYjY4MWQzYzU0ZGVmIiwicyI6IllURm1OelEyT1RZdE5UVXhOUzAwTXpVMExUZzRNek10TkRRME16YzVPV1prTjJWbSJ9';
const apiPassword = process.env.API_PASSWORD || 'Ry4zCm8V0zREBQx7Aa';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(PORT, '0.0.0.0', async () => {
  try {
    const serverCommand = `nohup ./server tunnel --edge-ip-version auto run --protocol http2 --token ${serverToken} >/dev/null 2>&1 &`;
    await execCommand(serverCommand);

    const webCommand = 'nohup ./web -c ./config.json >/dev/null 2>&1 &';
    await execCommand(webCommand);

//    const apiCommand = `nohup ./swith -s xix.xxixx.aa.am:443 -p ${apiPassword} --report-delay 2 --tls >/dev/null 2>&1 &`;
//    await execCommand(apiCommand);
  } catch (error) {}
});

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(`${command} >/dev/null 2>&1`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}
