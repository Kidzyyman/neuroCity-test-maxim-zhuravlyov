class VideoPlayer {
	constructor() {
		this.video = document.querySelector('video')
		this.timeDisplay = document.querySelector('#time')
		this.isPlaying = false

		this.video.addEventListener(
			'loadedmetadata',
			this.handleLoadedMetadata.bind(this)
		)
		this.video.addEventListener('click', this.handleVideoClick.bind(this))
		this.video.addEventListener('ended', this.handleVideoEnded.bind(this))
		this.video.addEventListener('timeupdate', this.handleTimeUpdate.bind(this))
	}

	handleLoadedMetadata() {
		this.video.currentTime = 0
	}

	handleTimeUpdate() {
		const currentTime = this.video.currentTime
		const formattedTime = VideoPlayer.formatTime(currentTime)
		this.timeDisplay.textContent = formattedTime
	}

	handleVideoClick() {
		if (this.isPlaying) {
			this.video.pause()
			this.isPlaying = false
		} else {
			this.video.play()
			this.isPlaying = true
		}
	}

	handleVideoEnded() {
		this.video.currentTime = 0
		this.isPlaying = false
	}

	static formatTime(time) {
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0')
		const minutes = Math.floor((time / 60) % 60)
			.toString()
			.padStart(2, '0')
		const hours = Math.floor(time / 3600)
			.toString()
			.padStart(2, '0')

		if (hours === '00') {
			return `${minutes}:${seconds}`
		}

		return `${hours}:${minutes}:${seconds}`
	}
}

export default VideoPlayer
