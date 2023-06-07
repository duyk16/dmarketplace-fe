import { useWeb3 } from '@/hooks'
import { getMarketContract, getNFTContract } from '@/utils/contract'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useHome = () => {
  const { signer } = useWeb3()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])

  const getMarketItems = async () => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)
    const itemCount = await marketplaceContract.itemCounter()
    let items = []

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplaceContract.marketItems(i)
      if (!item.isSold) {
        const uri = await nftContract.tokenURI(item.tokenId)
        const response = await axios.get(uri)
        const metadata = response.data
        const totalPrice = await marketplaceContract.getTotalPrice(item.itemId)
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        })
      }
    }

    setLoading(false)
    setItems(items)
  }

  /**
   *
   * @param itemId - string
   * @param totalPrice - in Wei
   */
  const buyMarketItem = async (itemId: string, totalPrice: string) => {
    const marketplaceContract = getMarketContract(signer)
    const tx = await marketplaceContract.purchaseItem(itemId, {
      value: totalPrice,
    })
    await tx.wait()
    console.log(`Buy NFT succes`)
    getMarketItems()
  }

  useEffect(() => {
    if (signer) {
      getMarketItems()
    }
  }, [signer])

  return {
    items,
    loading,
    buyMarketItem,
  }
}
