import keitaiso from './morphological-analysis'
import kizapi from './kizapi'
import image from './bingImageSearch'

var _myIdeaRef = null

export default {
	getRelatedImages(idea){
		return new Promise((resolve, reject) => {
			keitaiso.getNoun(idea)
				.then(kizapi.getWord)
				.then(image.getImage)
				.then(resolve)
				.catch(err => {
					Materialize.toast('Error ' + err, 4000, 'red')
				})
		})
	}
}
