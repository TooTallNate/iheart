const iheart = require('./');

async function main() {
  const { stations: [ station ] } = await iheart.search('106 KMEL');
  const stream = await iheart.streamURL(station);
  console.log({ station, stream });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
