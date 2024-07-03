import { Controller } from '@hotwired/stimulus'
import Swiper from 'swiper'

export default class extends Controller<HTMLElement> {
  swiper?: Swiper

  connect() {
    // console.log('Hello world!', this.element)
    // this.swiper = new Swiper(this.element, {
    //   // configure Swiper to use modules
    //   // modules: [Navigation, Pagination],
    //   // ...
    // })
  }
}
