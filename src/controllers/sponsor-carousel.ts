import { Controller } from "@hotwired/stimulus"
import Swiper from "swiper"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css/bundle"

export default class extends Controller<HTMLElement> {
	static targets = ["slider", "slide"]

	declare readonly sliderTarget: HTMLElement

	swiper?: Swiper

	connect() {
		this.swiper = new Swiper(this.sliderTarget, {
			// configure Swiper to use modules
			modules: [Autoplay],
			loop: true,
			spaceBetween: 40,
			centeredSlides: true,

			autoplay: {
				delay: 25000,
				disableOnInteraction: false
			},
			breakpoints: {
				400: {
					slidesPerView: 2,
					spaceBetween: 40
				},
				600: {
					slidesPerView: 3,
					spaceBetween: 40
				},
				800: {
					slidesPerView: 4,
					spaceBetween: 150
				},
				1000: {
					slidesPerView: 5,
					spaceBetween: 150
				}
				// "@1.50": {
				//   slidesPerView: 4,
				//   spaceBetween: 50,
				// },
			},
			slidesPerView: "auto"
			// ...
		})
	}
}
