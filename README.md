# iheart
### iHeart Radio JavaScript API

Query the iHeart Radio API to search for internet radio stations.
Get their metadata including name and logos, and resolve high-quality
stream URLs to play.


## Installation

Install with `npm`:

``` bash
$ npm install --save iheart
```


## Example

```js
// search for a station, pick the first match
const matches = await iheart.search(process.argv[2] || '1077 the bone')
const station = matches.stations[0]

// finally you can get the source stream URL which can
// be requested over HTTP and fed into an audio decoder,
// or whatever your application does with it…
const url = await iheart.streamURL(station)

console.log(url)
// https://18533.live.streamtheworld.com:443/KSANFMAAC_SC
```

Both `search` and `streamURL` have an option to specify CORS proxy
so that these APIs work in the web browser

```js
// use specific proxy
const matches2 = await iheart.search('MyFM', { proxy: 'https://mycoolproxy.com' })
// use default proxy
const matches3 = await iheart.search('Jazz')
// do not use proxy (good for server side code)
const url2 = await iheart.streamURL(station, { proxy: null })
```


License
-------

(The MIT License)

Copyright (c) 2017 Nathan Rajlich &lt;n@n8.io&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
