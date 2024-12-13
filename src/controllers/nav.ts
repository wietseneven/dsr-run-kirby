import { Controller } from "@hotwired/stimulus"

export default class extends Controller<HTMLElement> {
	static targets = ["button"]

	toggleClasses = ["before:translate-y-0", "before:opacity-100"]
	observer?: IntersectionObserver
	sentinel?: HTMLElement

	connect() {
		// Create and insert a sentinel element at the scroll threshold position
		this.sentinel = this.element.nextElementSibling as HTMLElement

		// Create an IntersectionObserver to observe the sentinel element
		this.observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.element.classList.remove(...this.toggleClasses)
					} else {
						this.element.classList.add(...this.toggleClasses)
					}
				})
			},
			{ threshold: 0, rootMargin: "-10px 0px 0px 0px" }
		) // Adjust rootMargin for scroll threshold

		if (this.sentinel) {
			this.observer.observe(this.sentinel)
		}

		this.buttonTargets.forEach((target) => {
			target.addEventListener("click", this._handleButtonClick)
		})
	}

	disconnect() {
		// Clean up the observer and sentinel when the element is disconnected
		if (this.observer && this.sentinel) {
			this.observer.unobserve(this.sentinel)
		}
	}

	_handleButtonClick = (event: Event) => {
		event.preventDefault()

		const target = event.currentTarget as HTMLElement
		const link = target.dataset.navLink
		if (link) {
			window.location.href = link
		}
	}
}
