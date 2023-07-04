export default class FormValidator {
	constructor(formId, errorMessagesId) {
		this.form = document.getElementById(formId)
		this.errorMessages = document.getElementById(errorMessagesId)

		this.name = this.form.querySelector('#name')
		this.phone = this.form.querySelector('#phone')
		this.password = this.form.querySelector('#password')
		this.passwordConfirm = this.form.querySelector('#password-confirm')

		this.nameRegExp = /^[A-Za-zА-Яа-яЁё\s]{3,30}$/
		this.phoneRegExp = /^(\+?\d{1,15})$/
		this.passwordRegExp = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,40}$/
	}

	init() {
		this.form.addEventListener('submit', event => {
			event.preventDefault()
			this.errorMessages.innerHTML = ''

			const nameValue = this.name.value.trim()
			const phoneValue = this.phone.value.trim()
			const passwordValue = this.password.value.trim()
			const passwordConfirmValue = this.passwordConfirm.value.trim()

			if (!this.nameRegExp.test(nameValue)) {
				this.errorMessages.innerHTML +=
					"Ошибка в поле 'Имя': имя должно содержать только кириллицу/латиницу от 3 до 30 символов.<br><br>"
			}

			if (!this.phoneRegExp.test(phoneValue)) {
				this.errorMessages.innerHTML +=
					"Ошибка в поле 'Телефон': телефон должен содержать от 10 до 15 символов, состоять из цифр и может начинаться с плюса.<br><br>"
			}

			if (passwordValue !== passwordConfirmValue) {
				this.errorMessages.innerHTML += 'Ошибка: пароли должны совпадать.<br>'
			}

			if (!this.passwordRegExp.test(passwordValue)) {
				this.errorMessages.innerHTML +=
					"Ошибка в поле 'Пароль': защитите свою учетную запись паролем от 8 до 40 символов, хотя бы из одной заглавной буквы и цифры.<br>"
			}

			if (this.errorMessages.innerHTML === '') {
				alert('Форма отправлена успешно')

				this.name.value = ''
				this.phone.value = ''
				this.password.value = ''
				this.passwordConfirm.value = ''
			}
		})
	}
}
