import DebounceElements from './deboucne_5/debounceElements.js'
import CanvasFigure from './figures_canvas_2/figures.js'
import FormValidator from './formValidator_6/formValidator.js'

import UserFetcher from './getDataJSON_4/getData.Json.js'
import RandomizeCubes from './randomCubes_7/randomCubes.js'
import Slider from './slider_1/slider.js'
import VideoPlayer from './videoFile_3/video.js'

new Slider(
	'.slider-section-wrap',
	'.holder',
	'.holder',
	'.slide-wrapper',
	'.slide-image',
	'.prev-button-slider',
	'.next-button-slider'
)

new CanvasFigure('myCanvas')

new VideoPlayer()

new UserFetcher()

new DebounceElements(
	'.article__left',
	'.article__right',
	'.article__top',
	'.element__button'
)

new RandomizeCubes()

new FormValidator('my-form', 'error-message').init()
