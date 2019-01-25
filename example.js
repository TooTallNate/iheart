const iheart = require('./');

async function main() {
  const { stations = [] } = await iheart.search('106 KMEL');
  const stream = await iheart.streamURL(stations[0]);
  console.log({stream});
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
