import { sleep } from 'components/utils/utils'

const calculateTime = (maxTime: number, addTime: number): number => {
  let totalTime = maxTime
  if (addTime < 0 && addTime * -1 > maxTime) {
    return (totalTime = 0)
  }
  return (totalTime += addTime)
}

export const animations = {
  default: {
    preTransition: async (addTime: number) => {
      const maxTime = 200
      document.body.classList.add('page-transition')
      await sleep(calculateTime(maxTime, addTime))
    },
    posTransition: async (addTime: number) => {
      const maxTime = 600
      await sleep(calculateTime(maxTime, addTime))
      document.body.classList.remove('page-transition')
    },
  },
}
