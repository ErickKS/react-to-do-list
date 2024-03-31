import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Howl } from 'howler';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const completeSound = new Howl({
  src: ['https://res.cdn.office.net/todo/1630603_2.116.1/sounds/complete.wav'],
  volume: 1,
  loop: false,
})
