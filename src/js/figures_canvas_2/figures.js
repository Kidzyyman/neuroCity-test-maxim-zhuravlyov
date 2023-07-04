class CanvasFigure {
	constructor(canvasId) {
		this.canvas = document.getElementById(canvasId)
		this.context = this.canvas.getContext('2d')
		this.figureTextStart = document.getElementById('figure-TextStart')
		this.figures = [
			new Circle(100, 100, 50, this.context),
			new Square(600, 100, 100, this.context),
			new Triangle(200, 200, 300, 500, 400, 200, this.context),
			new Rectangle(550, 400, 200, 100, this.context),
		]

		this.figureTextStart.addEventListener('click', () => {
			this.start()
		})
	}
	start() {
		this.draw()
	}

	draw() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		for (const figure of this.figures) {
			figure.draw()
			figure.update(this.canvas.width, this.canvas.height, this.figures)
		}
		requestAnimationFrame(() => this.draw())
	}
}

class Figure {
	constructor(x, y, context) {
		this.x = x
		this.y = y
		this.context = context
		this.velocityX = 2
		this.velocityY = 2
	}

	draw() {}

	update(canvasWidth, canvasHeight, figures) {
		if (this.x <= 0 || this.x + this.width >= canvasWidth) {
			this.velocityX = -this.velocityX
		}
		if (this.y <= 0 || this.y + this.height >= canvasHeight) {
			this.velocityY = -this.velocityY
		}
		this.x += this.velocityX
		this.y += this.velocityY
		this.checkCollisionWithFigures(figures)
	}

	checkCollisionWithFigures(figures) {
		for (const figure of figures) {
			if (figure !== this) {
				if (
					this.x < figure.x + figure.width &&
					this.x + this.width > figure.x &&
					this.y < figure.y + figure.height &&
					this.y + this.height > figure.y
				) {
					this.velocityX = -this.velocityX
					this.velocityY = -this.velocityY
					break
				}
			}
		}
	}
}

class Circle extends Figure {
	constructor(x, y, radius, context) {
		super(x, y, context)
		this.radius = radius
		this.borderColor = '#000000'
		this.width = radius * 2
		this.height = radius * 2
	}

	draw() {
		this.context.beginPath()
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		this.context.strokeStyle = this.borderColor
		this.context.stroke()
	}
	update(canvasWidth, canvasHeight, figures) {
		super.update(canvasWidth, canvasHeight, figures)
		this.checkCollisionWithFigures(figures)
	}
	checkCollisionWithFigures(figures) {
		for (const figure of figures) {
			if (figure !== this) {
				// вычисляем расстояние между центрами фигур
				const distX = this.x - figure.x
				const distY = this.y - figure.y
				const distance = Math.sqrt(distX * distX + distY * distY)
				if (distance < this.radius + figure.radius) {
					this.velocityX = -this.velocityX
					this.velocityY = -this.velocityY
					this.x += this.velocityX
					this.y += this.velocityY
					break
				}
			}
		}
	}
}

class Triangle extends Figure {
	constructor(x1, y1, x2, y2, x3, y3, context) {
		super(x1, y1, context)
		this.x2 = x2
		this.y2 = y2
		this.x3 = x3
		this.y3 = y3
		this.borderColor = '#000000'
		this.width = Math.max(x1, x2, x3) - Math.min(x1, x2, x3)
		this.height = Math.max(y1, y2, y3) - Math.min(y1, y2, y3)
	}

	draw() {
		this.context.beginPath()
		this.context.moveTo(this.x, this.y)
		this.context.lineTo(this.x2, this.y2)
		this.context.lineTo(this.x3, this.y3)
		this.context.closePath()
		this.context.strokeStyle = this.borderColor
		this.context.stroke()
	}

	update(canvasWidth, canvasHeight, figures) {
		super.update(canvasWidth, canvasHeight, figures)
		this.width =
			Math.max(this.x, this.x2, this.x3) - Math.min(this.x, this.x2, this.x3)
		this.height =
			Math.max(this.y, this.y2, this.y3) - Math.min(this.y, this.y2, this.y3)
		this.checkCollisionWithFigures(figures)
	}
}
class Square extends Figure {
	constructor(x, y, size, context) {
		super(x, y, context)
		this.size = size
		this.borderColor = '#000000'
		this.width = size
		this.height = size
	}

	draw() {
		this.context.strokeStyle = this.borderColor
		this.context.strokeRect(this.x, this.y, this.size, this.size)
	}
	update(canvasWidth, canvasHeight, figures) {
		super.update(canvasWidth, canvasHeight, figures)
		this.height = this.width // квадрат всегда имеет равную высоту и ширину
		this.checkCollisionWithFigures(figures)
	}
}

class Rectangle extends Figure {
	constructor(x, y, width, height, context) {
		super(x, y, context)
		this.width = width
		this.height = height
		this.borderColor = '#000000'
	}

	draw() {
		this.context.strokeStyle = this.borderColor
		this.context.strokeRect(this.x, this.y, this.width, this.height)
	}

	update(canvasWidth, canvasHeight, figures) {
		super.update(canvasWidth, canvasHeight, figures)
		this.checkCollisionWithFigures(figures)
	}
}

export default CanvasFigure
