const BING_ENDPOINT = "https://api.cognitive.microsoft.com/bing/v7.0/images/search"
const API_KEY = "89f7fa54071042cdaf433802d7a621fa";

const method = 'GET'
const headers = {
	'Ocp-Apim-Subscription-Key': API_KEY,
	'Accept': 'application/json'
}
var options = [
	"mkt=ja-JP",
	"SafeSearch=strict",
	"aspect=square",
	"count=1",
	"offset=0"
]

export default {
	getImage (word){
		return new Promise((resolve, reject) => {
			var count = 0;
			var imageUrl = []

			for(var i = 0; i < 6; i++){
					var url = BING_ENDPOINT + "?q=" + encodeURIComponent(word[i]) + "&" + options.join("&");
					fetch(url, {method, headers})
						.then((res) => {
							return res.json()
						})
						.then((json) => {
							imageUrl.push(json.value[0].thumbnailUrl)
							count ++
							if(count == 6) resolve(imageUrl)
						})
			}
		})
	}
}
