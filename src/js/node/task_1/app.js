const fs = require('fs')

fs.readFile('input.txt', 'utf8', (error, data) => {
	if (error) throw error

	// переворачиваем строку
	const reversed = data.split('').reverse().join('')

	// записываем в новый файл
	fs.writeFile('output.txt', reversed, error => {
		if (error) throw error
		console.log('File saved!')
	})
})
