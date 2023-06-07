'use client'
import { MARKETPLACE_ADDRESS, NFT_ADDRESS } from '@/config'
import { useWeb3 } from '@/hooks'
import { Marketplace } from '@/types'
import { getMarketContract, getNFTContract } from '@/utils/contract'
import axios from 'axios'
import { ethers } from 'ethers'
import { ChangeEvent, useState } from 'react'

export default function CreatePage() {
  const { signer } = useWeb3()
  const [formState, setFormState] = useState({
    name: '',
    desc: '',
    price: 0,
  })

  const [file, setFile] = useState<File>()

  const onSubmit = async (e: any) => {
    e.preventDefault()

    if (!file || !formState.price || !formState.name || !formState.desc) return
    const fileUrl = await uploadImage(file)
    const metadata = {
      name: formState.name,
      desc: formState.desc,
      image: fileUrl,
    }

    const metadataUrl = await uploadMetadata(metadata)
    const tokenId = await mintNft(metadataUrl)
    const txHash = await sellNft(tokenId.toString(), formState.price)

    console.log(`Sell NFT success with hash ${txHash}`)
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setFormState((v) => ({ ...v, [name]: value }))
  }

  const uploadImage = async (fileImg: any) => {
    try {
      const formData = new FormData()
      formData.append('file', fileImg)

      const resFile = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: formData,
        headers: {
          pinata_api_key: `4ad13e9f6b319d0e89c4`,
          pinata_secret_api_key: `ff7e09011e60ac211fed5bdd97a29cf239f1093c46e5a28ac187c340ac66e222`,
          'Content-Type': 'multipart/form-data',
        },
      })

      const fileUrl = `https://gray-technological-caterpillar-114.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`
      return fileUrl
    } catch (error) {
      console.log('Error sending File to Pinata: ')
      console.log(error)
      throw error
    }
  }

  const uploadMetadata = async (metadata: any) => {
    try {
      const data = JSON.stringify({
        pinataContent: { ...metadata },
      })

      const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONtoIPFS',
        data: data,
        headers: {
          pinata_api_key: `4ad13e9f6b319d0e89c4`,
          pinata_secret_api_key: `ff7e09011e60ac211fed5bdd97a29cf239f1093c46e5a28ac187c340ac66e222`,
          'Content-Type': 'application/json',
        },
      })
      const metadataUrl = `https://gray-technological-caterpillar-114.mypinata.cloud/ipfs/${res.data.IpfsHash}`
      return metadataUrl
    } catch (error) {
      console.log('Error sending Metadata to Pinata: ')
      console.log(error)
      throw error
    }
  }

  const mintNft = async (tokenUri: string) => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)
    const receipt = await (await nftContract.mint(tokenUri)).wait()
    const tokenId = await nftContract.tokenCounter()
    return tokenId
  }
  const sellNft = async (tokenId: string, price: number) => {
    const marketplaceContract = getMarketContract(signer)
    const nftContract = getNFTContract(signer)
    await (
      await nftContract.setApprovalForAll(MARKETPLACE_ADDRESS, true)
    ).wait()

    const tx = await (marketplaceContract as Marketplace).makeItem(
      NFT_ADDRESS,
      tokenId,
      ethers.parseEther(price.toString())
    )

    await tx.wait()
    return tx.hash
  }

  return (
    <div className="w-full max-w-screen-md space-y-5">
      <h1 className="font-bold uppercase text-3xl text-center">
        Create your NFT
      </h1>

      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Choose NFT image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            name="image"
            accept=".jpeg,.jpg,.webp,.png"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your NFT name"
            required
            onChange={onInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="desc"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type NFT description"
            required
            onChange={onInputChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price (ETH)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.1"
            step="any"
            required
            onChange={onInputChange}
          />
        </div>

        <button
          // onClick={onSubmit}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
