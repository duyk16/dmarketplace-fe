import { useWeb3 } from '@/hooks'
import { getMarketContract, getNFTContract } from '@/utils/contract'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useMyList = () => {
  const { signer, address } = useWeb3()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])
  const [soldItems, setSoldItems] = useState<any[]>([])

  const getMarketItems = async () => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)
    const itemCount = await marketplaceContract.itemCounter()
    let items = []

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplaceContract.marketItems(i)
      if (!item.isSold && item.seller.toLowerCase() == address.toLowerCase()) {
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

  const getSoldItems = async () => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)

    const filter = marketplaceContract.filters.Sold(
      undefined,
      undefined,
      undefined,
      undefined,
      address
    )

    const items = await marketplaceContract.queryFilter(filter)

    const soldItems = await Promise.all(
      items.map(async (item) => {
        const uri = await nftContract.tokenURI(item.args.tokenId)
        const response = await axios.get(uri)
        const metadata = response.data
        return {
          price: item.args.price,
          itemId: item.args.itemId,
          seller: item.args.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        }
      })
    )
    setSoldItems(soldItems)
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
      getSoldItems()
    }
  }, [signer])

  return {
    loading,
    items,
    soldItems,

    buyMarketItem,
  }
}
