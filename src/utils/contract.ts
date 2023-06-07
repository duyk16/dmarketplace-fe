import { ethers } from 'ethers'

import {
  MARKETPLACE_ADDRESS,
  NFT_ADDRESS,
  marketplaceAbi,
  nftAbi,
} from '@/config'
import { Marketplace, NFT } from '@/types'

export const getNFTContract = (signer: any) => {
  const nft = new ethers.Contract(NFT_ADDRESS, nftAbi, signer) as unknown as NFT
  return nft
}

export const getMarketContract = (signer: any) => {
  const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    marketplaceAbi,
    signer
  ) as unknown as Marketplace

  return marketplace
}
