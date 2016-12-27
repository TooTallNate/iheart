import { extname } from 'path'
import createDebug from 'debug'
import { parse, format } from 'url'
import fetch from 'isomorphic-fetch'
import { parse as parseIni } from 'ini'

const debug = createDebug('iheart')

// go through a CORS reverse proxy so that these APIs work in the web browser
const corsProxy = 'https://cors-anywhere.now.sh/'

const searchBase = 'http://api.iheart.com/api/v1/catalog/searchAll'
const streamsBase = 'http://proxy.iheart.com/streams_list_by_ids/?stream_ids=<stream id here>&apikey=null'
const headers = {
  // this header is required for `cors-anywhere` :/
  'X-Requested-With': 'XMLHttpRequest'
}

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
  debug('GET %o', url)

  const res = await fetch(`${corsProxy}${url}`, { headers })
  if (!res.ok) {
    throw new Error()
  }

  const body = await res.json()
  if (body.errors) {
    // body.firstError
  }
  return body
}


/**
 *
 */
export async function streams (station) {
  const id = station.id || station
  if ('number' !== typeof id) {
    throw new TypeError('a number station "id" is required')
  }

  const formatted = parse(streamsBase, true)
  delete formatted.search
  formatted.query.stream_ids = id
  const url = format(formatted)
  debug('GET %o', url)

  const res = await fetch(`${corsProxy}${url}`, { headers })
  if (!res.ok) {
    throw new Error()
  }

  const body = await res.json()
  if (body.errors) {
    // body.firstError
  }

  return body.streams
}

/**
 * Gets the raw stream URL of a given "station stream"
 */
export async function streamURL (stream) {
  let { url } = stream
  if ('.pls' === extname(url).toLowerCase()) {
    debug('attempting to resolve "pls" file %o', url)
    const res = await fetch(`${corsProxy}${url}`, { headers })
    const body = parseIni(await res.text())
    debug('pls file: %O', body)
    url = body.playlist.File1
  }
  debug('stream URL: %o', url)
  return url
}
