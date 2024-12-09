import { sleep } from 'components/utils/utils'

export const animations = {
  default: {
    preTransition: async () => {
      document.body.classList.add('page-transition')
      await sleep(300)
    },
    posTransition: async () => {
      await sleep(300)
      document.body.classList.remove('page-transition')
    },
  },
}
