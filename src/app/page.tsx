'use client'
import { ItemCart } from '@/components'
import { useHome } from './useHome'
import { ethers } from 'ethers'

export default function Home() {
  const { items, buyMarketItem } = useHome()

  return (
    <div className="w-full">
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
    </div>
  )
}
