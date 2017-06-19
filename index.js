import { extname } from 'path'
import createDebug from 'debug'
import { parse, format } from 'url'
import { parse as parseIni } from 'ini'

import fetch from './fetch'

const debug = createDebug('iheart')

// go through a CORS reverse proxy so that these APIs work in the web browser
const corsProxy = 'https://cors.now.sh/'

const searchBase  = 'https://api.iheart.com/api/v1/catalog/searchAll'
const streamsBase = 'https://api.iheart.com/api/v2/content/liveStations/'

/**
 *
 */
export async function search (keyword) {
  if ('string' !== typeof keyword) {
    throw new TypeError('a string "keyword" is required')
  }

  const formatted = parse(searchBase, true)
  formatted.query.keywords = keyword
  const url = format(formatted)

  const res = await fetch(`${corsProxy}${url}`)

  const body = await res.json()
  if (body.errors) {
    // body.firstError
  }
  return body
}


/**
 * Gets the raw stream URL of the given Station or Station ID.
 */
export async function streamURL (_station) {
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

  url = streams.secure_pls_stream
    || streams.pls_stream
    || streams.stw_stream
    || streams.secure_shoutcast_stream
    || streams.shoutcast_stream
    || streams[Object.keys(streams)[0]]

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
