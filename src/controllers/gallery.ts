import { Controller } from "@hotwired/stimulus"
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/photoswipe.css';

export default class extends Controller<HTMLElement> {
	static targets = ["gallery", "form"]

	declare lightbox: PhotoSwipeLightbox
	declare readonly galleryTarget: HTMLElement

	connect() {
		console.log(window.galleryImages)
		this.lightbox = new PhotoSwipeLightbox({
			// gallery: this.galleryTarget,
			// children: 'a',
			dataSource: window.galleryImages,
			pswpModule: () => import('photoswipe')
		});



		this.lightbox.on('uiRegister', () => {
			this.lightbox.pswp.ui.registerElement({
				name: 'download-button',
				order: 8,
				isButton: true,
				tagName: 'a',

				// SVG with outline
				html: {
					isCustomSVG: true,
					inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
					outlineID: 'pswp__icn-download'
				},

				// Or provide full svg:
				// html: '<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" class="pswp__icn"><path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" /></svg>',

				// Or provide any other markup:
				// html: '<i class="fa-solid fa-download"></i>'

				onInit: (el, pswp) => {
					el.setAttribute('download', '');
					el.setAttribute('target', '_blank');
					el.setAttribute('rel', 'noopener');

					pswp.on('change', () => {
						console.log('change');
						el.href = pswp.currSlide.data.url;
					});
				}
			});
		});


		this.lightbox.addFilter('thumbEl', (thumbEl, data, index): HTMLElement => {
			const el = this.galleryTarget.querySelector(`[data-id="${index}"] picture`);

			if (el instanceof HTMLElement) {
				return el;
			}
			return thumbEl;
		});

		this.lightbox.addFilter('placeholderSrc', (placeholderSrc, slide) => {
			return slide.data.src;
		});

		for (const link of this.galleryTarget.querySelectorAll('a')) {
			link.addEventListener('click', (event) => {
				const id = (event.currentTarget as HTMLElement)?.dataset?.id;
				if (id) {
					event.preventDefault();
					this.lightbox.loadAndOpen(Number.parseInt(id));
				}
			});
		}

		this.lightbox.init();
	}

	disconnect() {
		this.lightbox.destroy();
	}

	filter(event: Event) {
		console.log('filter', event);
		this.formTarget.submit();
	}
}
