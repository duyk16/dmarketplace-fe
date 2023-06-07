'use client'
import { ItemCart } from '@/components'
import { ethers } from 'ethers'
import { useMyList } from './useMyList'

export default function MyListPage() {
  const { items, soldItems, buyMarketItem } = useMyList()

  return (
    <div className="w-full space-y-5">
      <div className="text-center text-3xl uppercase font-bold">
        My listing
      </div>
      {items.length === 0 && (
        <div className="text-2xl text-center">No NFT available</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((o, index) => {
          return (
            <ItemCart
              key={index}
              imageUrl={o.image}
              price={Number(ethers.formatEther(o.totalPrice))}
              desc={o.name}
              onBuy={() => {
                buyMarketItem(o.itemId, o.totalPrice)
              }}
            />
          )
        })}
      </div>
      <div className="text-center text-3xl uppercase font-bold mt-[50px]">
        Sold items
      </div>
      {items.length === 0 && (
        <div className="text-2xl text-center">No NFT available</div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {soldItems.map((o, index) => {
          return (
            <ItemCart
              key={index}
              imageUrl={o.image}
              price={Number(ethers.formatEther(o.price))}
              desc={o.name}
              isSold
            />
          )
        })}
      </div>
    </div>
  )
}
