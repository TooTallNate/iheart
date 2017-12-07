const { extname } = require('path')
const createDebug = require('debug')
const { parse, format } = require('url')
const { parse: parseIni } = require('ini')

const fetch = require('./fetch')

const debug = createDebug('iheart')

// go through a CORS reverse proxy so that these APIs work in the web browser
const corsProxy = 'https://cors.now.sh/'

const searchBase =
  'https://api.iheart.com/api/v3/search/all?keywords=<search term>&bundle=false&keyword=true&maxRows=3&countryCode=US&startIndex=0&station=true&artist=true&track=true&playlist=true&talkShow=true'
const streamsBase = 'https://api.iheart.com/api/v2/content/liveStations/'

/**
 * Searches for radio streams matching `keyword`.
 */
async function search(keyword) {
  if ('string' !== typeof keyword) {
    throw new TypeError('a string "keyword" is required')
  }

  const formatted = parse(searchBase, true)
  delete formatted.search
  formatted.query.keywords = keyword
  const url = format(formatted)

  const res = await fetch(`${corsProxy}${url}`)

  const body = await res.json()
  if (body.errors) {
    // body.firstError
  }
  return body.results
}

/**
 * Gets the raw stream URL of the given Station or Station ID.
 */
async function streamURL(_station) {
  const id = _station.id || _station
  if ('number' !== typeof id) {
    throw new TypeError('a number station "id" is required')
  }

  let url = streamsBase + id
  const res = await fetch(`${corsProxy}${url}`)

  const body = await res.json()
  if (body.errors) {
    // body.firstError
  }

  const station = body.hits[0]
  const { streams } = station
  if (!streams) {
    throw new Error('No `streams` given')
  }

  url =
    streams.secure_pls_stream ||
    streams.pls_stream ||
    streams.stw_stream ||
    streams.secure_shoutcast_stream ||
    streams.shoutcast_stream ||
    streams[Object.keys(streams)[0]]

  if ('.pls' === extname(url).toLowerCase()) {
    debug('attempting to resolve "pls" file %o', url)
    const res = await fetch(`${corsProxy}${url}`)
    const body = parseIni(await res.text())
    debug('pls file: %O', body)
    url = body.playlist.File1
  }

  debug('stream URL: %o', url)
  return url
}

module.exports = {
  search,
  streamURL
};
