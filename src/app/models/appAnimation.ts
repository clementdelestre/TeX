import { animate, style, transition, trigger } from "@angular/animations";

export const modalAnimation = trigger('modalAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-15px)' }),
    animate('100ms', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('100ms', style({ opacity: 0, transform: 'translateY(-15px)' }))
  ])
])

export const modalAnimationReverse = trigger('modalAnimationReverse', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(15px)' }),
    animate('100ms', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('100ms', style({ opacity: 0, transform: 'translateY(15px)' }))
  ])
])

export const openCloseAnimation = trigger('openClose', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0 }))
  ])
])

export const heightAnimation = trigger('heightAnimation', [
  transition(':enter', [
    style({'height': 0, 'opacity' : 0 }),
    animate('200ms', style({  'height': '*', 'opacity' : 1 })),
  ]),
  transition(':leave', [
    animate('200ms', style({'height': 0,  'opacity' : 0}))
  ])
])

export const fastFadeAnimation = trigger('fastFadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('100ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('100ms', style({ opacity: 0 }))
  ])
])