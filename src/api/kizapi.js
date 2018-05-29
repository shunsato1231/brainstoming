import querystring from 'querystring'

var max_length = 50
const YQL_URL = "https://query.yahooapis.com/v1/public/yql"

const defaultParams = {
  format: 'json',
  diagnotistics: true
}

export default {
  getWord(noun){
    return new Promise((resolve, reject) => {
      var word = []
      var count = 0;

      for(var i = 0; i < noun.length; i++){
        const sql = "select * from rss where url='http://kizasi.jp/kizapi.py?span=24&kw_expr=" + noun[i] + "&type=coll'"
        const data = Object.assign({}, defaultParams, { q: sql })
        const url = `${YQL_URL}?${querystring.stringify(data)}`

        fetch(url)
          .then((res) => {
            return res.json()
          })
          .then((json) => {
            if(json.query.results != null){
              for (var j = 0; j < json.query.results.item.length; j++) {
                if(j == max_length) break
                var entry = json.query.results.item[j]
                word.push(entry.title)
                }
              }
              count ++
              if(count == noun.length) resolve(word)
          })
      }
    })
  }
}
