var write = module.exports = (string, type, res) => {
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': type
  });
  res.write(string);
  res.end();
};


