var obj = {
	'app_id':'57fd15f7aeac4aa91a3b680a0a3085a708e83e8927a5416c4c2387c6b8f0bdb1',
	'info_filter':'form',
	'pos_filter':'名詞'
};

const method = 'POST';
const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
};

export default {
		getNoun (sentence){
			return new Promise((resolve, reject) => {
				obj.sentence = sentence;
				var noun = []
				var body = Object.keys(obj).map((key)=>key+"="+encodeURIComponent(obj[key])).join("&");

				fetch('https://labs.goo.ne.jp/api/morph', {method, headers, body})
					.then((res) => {
						return res.json()
					})
					.then((json) => {
						for (var i = 0; i < json.word_list.length; i++) {
								for(var j = 0; j<json.word_list[i].length; j++){
									noun.push(json.word_list[i][j][0])
								}
						}
						if(noun.length == 0){
							reject("名詞が含まれていません")
						}else{
							resolve(noun)
						}
					})
			})
		}
}
