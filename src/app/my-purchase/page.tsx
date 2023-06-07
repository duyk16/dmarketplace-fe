'use client'
import { ItemCart } from '@/components'
import { useMyPurchase } from './useMyPurchase'
import { ethers } from 'ethers'

export default function MyPurchasePage() {
  const { items } = useMyPurchase()

  return (
    <div className="w-full space-y-5">
      <div className="text-center text-3xl uppercase font-bold">
        My purchase
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
