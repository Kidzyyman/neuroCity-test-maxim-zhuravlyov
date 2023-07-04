export default class DebounceElements {
	constructor(
		elementArticleLeft,
		elementArticleRight,
		elementArticleTop,
		elementButton
	) {
		this.elementArticleLeft = document.querySelector(elementArticleLeft)
		this.elementArticleRight = document.querySelector(elementArticleRight)
		this.elementArticleTop = document.querySelector(elementArticleTop)
		this.elementButton = document
			.querySelector(elementButton)
			.addEventListener('click', () =>
				this.#debounce(this.#toggleElementArticle(), 2000)
			)
	}

	#debounce(f, ms) {
		let isCooldown = false
		return function () {
			if (isCooldown) return
			f.apply(this, arguments)
			isCooldown = true
			setTimeout(() => (isCooldown = false), ms)
		}
	}
	#toggleElementArticle() {
		this.elementArticleLeft.classList.toggle('article__left_active')
		this.elementArticleRight.classList.toggle('article__right_active')
		this.elementArticleTop.classList.toggle('article__top_active')
	}
}
