export default class RandomizeCubes {
	#num_squares = Math.floor(Math.random() * 90) + 10

	constructor() {
		this.containerCubes = document.getElementById('container-cubes')
		this.randomCubesBtn = document
			.getElementById('random-cubes__btn')
			.addEventListener('click', () => this.#getRandomize())
	}

	#getRandomColor() {
		var letters = '0123456789ABCDEF'
		var color = '#'
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	#getRandomize() {
		for (var i = 0; i < this.#num_squares; i++) {
			var square = document.createElement('div')
			square.style.width = '20px'
			square.style.height = '20px'
			square.style.margin = '5px'
			square.style.backgroundColor = this.#getRandomColor()
			this.containerCubes.appendChild(square)
		}
	}
}
