var write = module.exports = (string, type, res, cookie) => {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': type,
    'Set-Cookie': cookie
  });
  res.write(string);
  res.end();
};


