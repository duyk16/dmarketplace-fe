import { useContext } from 'react'

import { Web3Context } from '@/provider'

export const useWeb3 = () => {
  return useContext(Web3Context)
}
