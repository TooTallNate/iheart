import retry from 'async-retry'
import _fetch from 'isomorphic-fetch'
import createDebug from 'debug'

const debug = createDebug('iheart:fetch')

const defaultRetryOpts = {
  retries: 10,
  minTimeout: 500,
  onRetry(err) {
    debug('Retrying: %o', err)
  }
}

/**
 * Wrapper around `fetch` with `async-retry`.
 */
export default function fetch (url, _opts) {
  const opts = Object.assign({}, defaultRetryOpts, _opts)
  //console.error(opts)

  return retry(async (bail) => {
    const method = (opts.method || 'GET').toUpperCase()
    debug(`${method} ${url}`)

    const res = await _fetch(url, opts)
    if (!res.ok) {
      const err = new Error(`${method} ${url} failed: HTTP status code ${res.status}`)
      if (res.status / 100 | 0 === 5) {
        // retry
        throw err
      } else {
        // assume 4xx, user error, don't retry
        return bail(err)
      }
    }
    return res
  }, opts)
}
