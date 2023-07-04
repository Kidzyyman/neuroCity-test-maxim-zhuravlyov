export default class UserFetcher {
	constructor() {
		this.currentPage = 1
		this.container = document.getElementById('data-container')
		this.currentPageElement = document.querySelector('.current-page')
		this.prevButton = document.querySelector('.prev-button-fetcher')
		this.nextButton = document.querySelector('.next-button-fetcher')
		this.prevButton.addEventListener('click', this.onPrevButtonClick.bind(this))
		this.nextButton.addEventListener('click', this.onNextButtonClick.bind(this))
		document.querySelector('#get-data').addEventListener('click', () => {
			this.fetchUsers(1)
		})
	}

	onPrevButtonClick() {
		if (this.currentPage > 1) {
			this.fetchUsers(this.currentPage - 1)
			this.currentPage -= 1
			this.currentPageElement.textContent = this.currentPage
		}
	}

	onNextButtonClick() {
		this.fetchUsers(this.currentPage + 1)
		this.currentPage += 1
		this.currentPageElement.textContent = this.currentPage
	}

	renderUsers(users) {
		this.container.innerHTML = ''
		for (let user of users) {
			const card = document.createElement('div')
			card.classList.add('card')
			card.innerHTML = `
        <img src="${user.avatar}">
        <h3>${user.first_name} ${user.last_name}</h3>
        <p>${user.email}</p>
      `
			this.container.appendChild(card)
		}
	}

	formatUser(user) {
		return {
			id: user.id,
			email: user.email,
			firstName: user.first_name,
			lastName: user.last_name,
			avatar: user.avatar,
		}
	}

	validateUser(user) {
		return (
			user.id && user.email && user.first_name && user.last_name && user.avatar
		)
	}

	sortUsersAlphabetically(users) {
		return users.sort((a, b) => a.first_name.localeCompare(b.first_name))
	}

	fetchUsers(page) {
		fetch(`https://reqres.in/api/users?page=${page}`)
			.then(response => response.json())
			.then(data => {
				console.log('Data from server:', data)

				if (data && data.data) {
					const formattedUsers = data.data
						.map(formatUser => formatUser)
						.filter(validateUser => validateUser)

					const sortedUsers = this.sortUsersAlphabetically(formattedUsers)

					this.renderUsers(sortedUsers)
					this.currentPage = page
					this.currentPageElement.textContent = page

					if (page === 1) {
						this.prevButton.disabled = true
					} else {
						this.prevButton.disabled = false
					}
					if (page === data.total_pages) {
						this.nextButton.disabled = true
					} else {
						this.nextButton.disabled = false
					}
				}
			})
	}
}
