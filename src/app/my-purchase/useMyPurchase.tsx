import { useWeb3 } from '@/hooks'
import { getMarketContract, getNFTContract } from '@/utils/contract'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useMyPurchase = () => {
  const { signer, address } = useWeb3()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<any[]>([])

  const getPurchaseItems = async () => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)

    const filter = marketplaceContract.filters.Sold(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      address
    )

    const items = await marketplaceContract.queryFilter(filter)

    const purchaseItems = await Promise.all(
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
    setItems(purchaseItems)
  }

  useEffect(() => {
    if (signer) {
      getPurchaseItems()
    }
  }, [signer])

  return {
    loading,
    items,
  }
}
