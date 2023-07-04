export default class Slider {
	#touchStartX = undefined
	#touchMoveX = undefined
	#moveX = undefined
	#index = 0
	#longTouch = undefined
	#slideWidth = undefined

	constructor(
		sliderEl,
		sliderHolderEl,
		slidesWrapperEl,
		slidesEl,
		slidesImagesEl,
		prevButtonEl,
		nextButtonEl
	) {
		this.sliderEl = document.querySelector(sliderEl)
		this.slidesHolderEl = document.querySelector(sliderHolderEl)
		this.slidesWrapperEl = document.querySelector(slidesWrapperEl)
		this.slidesEl = Array.from(this.slidesHolderEl.querySelectorAll(slidesEl))
		this.slidesImagesEl = Array.from(
			this.slidesHolderEl.querySelectorAll(slidesImagesEl)
		)
		this.prevButtonEl = document.querySelector(prevButtonEl)
		this.nextButtonEl = document.querySelector(nextButtonEl)

		this.#slideWidth = this.sliderEl.clientWidth

		if (navigator.msMaxTouchPoints) {
			this.sliderEl.classList.add('ms-touch')
			this.sliderEl.addEventListener('scroll', () => this.#handleScroll())
		} else {
			this.#bindUIEvents()
		}

		this.prevButtonEl.addEventListener('click', () => this.#prev())
		this.nextButtonEl.addEventListener('click', () => this.#next())
	}

	#bindUIEvents() {
		this.slidesHolderEl.addEventListener('touchstart', event =>
			this.#start(event)
		)
		this.slidesHolderEl.addEventListener('touchmove', event =>
			this.#move(event)
		)
		this.slidesHolderEl.addEventListener('touchend', event => this.#end(event))

		this.slidesHolderEl.addEventListener('mouseup', event => this.#end(event))
	}

	#handleScroll() {
		this.slidesImagesEl.forEach(slideImageEl => {
			slideImageEl.style.transform = `translate3d(-${
				100 - this.sliderEl.scrollLeft / 6
			}px,0,0)`
		})
	}

	#prev() {
		if (this.#index > 0) {
			this.#index--
			this.#moveSlider()
		}
	}

	#next() {
		if (this.#index < this.slidesEl.length - 1) {
			this.#index++
			this.#moveSlider()
		}
	}

	#start(event) {
		this.#longTouch = false
		setTimeout(() => {
			this.#longTouch = true
		}, 250)

		if (event.touches && event.touches[0]) {
			this.#touchStartX = event.touches[0].pageX
		}
		if (event.clientX) {
			this.#touchStartX = event.clientX
		}

		this.slidesHolderEl.classList.remove('animate')
		this.slidesImagesEl.forEach(slideImageEl => {
			slideImageEl.classList.remove('animate')
		})
	}

	#end(event) {
		const absMove = Math.abs(this.#index * this.#slideWidth - this.#moveX)
		if (absMove > this.#slideWidth / 2 || this.#longTouch === false) {
			if (
				this.#moveX > this.#index * this.#slideWidth &&
				this.#index < this.slidesEl.length - 1
			) {
				this.#index++
			} else if (
				this.#moveX < this.#index * this.#slideWidth &&
				this.#index > 0
			) {
				this.#index--
			}
		}

		if (event.changedTouches && event.changedTouches[0]) {
			this.#moveSlider()
		}
	}

	#move(event) {
		if (event && event.touches && event.touches[0]) {
			this.#touchMoveX = event.touches[0].pageX
		}
		if (event.clientX) {
			this.#touchMoveX = event.clientX
		}

		this.#moveX =
			this.#index * this.#slideWidth + (this.#touchStartX - this.#touchMoveX)
		const panx = 100 - this.#moveX / 6

		if (this.#moveX < 600) {
			this.slidesHolderEl.style.transform = `translate3d(-${this.#moveX}px,0,0)`
		}
		if (panx < 100) {
			this.slidesImagesEl.forEach(slideImageEl => {
				slideImageEl.style.transform = `translate3d(-${panx}px,0,0)`
			})
		}

		requestAnimationFrame(() => this.#move())
	}

	#moveSlider() {
		this.slidesHolderEl.classList.add('animate')
		this.slidesHolderEl.style.transform = `translate3d(-${
			this.#index * this.#slideWidth
		}px,0,0)`
		this.slidesImagesEl.forEach(slideImageEl => {
			slideImageEl.classList.add('animate')
			slideImageEl.style.transform = `translate3d(-${
				100 - this.#index * 50
			}px,0,0)`
		})
	}
}
