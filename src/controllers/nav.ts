import { Controller } from '@hotwired/stimulus'

export default class extends Controller<HTMLElement> {
  toggleClasses = ['before:translate-y-0', 'before:opacity-100']
  observer?: IntersectionObserver
  sentinel?: HTMLElement

  connect() {
    // Create and insert a sentinel element at the scroll threshold position
    this.sentinel = document.querySelector('.nav-sentinel') as HTMLElement
    console.log(this.sentinel)
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
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    ) // Adjust rootMargin for scroll threshold

    if (this.sentinel) {
      this.observer.observe(this.sentinel)
    }
  }

  disconnect() {
    // Clean up the observer and sentinel when the element is disconnected
    if (this.observer && this.sentinel) {
      this.observer.unobserve(this.sentinel)
    }
  }
}
