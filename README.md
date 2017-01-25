# iheart
### iHeart Radio JavaScript API


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

// get a list of "stream" objects for the station, pick the first one
const streams = await iheart.streams(station)
const stream = streams[0]

// finally you can get the source stream URL which can
// be requested over HTTP and fed into an audio decoder,
// or whatever your application does with it…
const url = await iheart.streamURL(stream)

console.log(url)
// https://18533.live.streamtheworld.com:443/KSANFMAAC_SC
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
