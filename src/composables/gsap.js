import { gsap } from 'gsap';

export function useGsap(el) {
  gsap.from(el, {
    delay: .3,
    opacity: 0,
    y: 100,
    ease: 'power1',
    stagger: .1
  })
}
