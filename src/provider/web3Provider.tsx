import { ethers } from 'ethers'
import { FC, createContext, useEffect, useState } from 'react'

export const Web3Context = createContext<any>({})

export const Web3Provider: FC<any> = ({ children }) => {
  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider>()
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>()
  const [address, setAddress] = useState('')

  const getBrowserProvider = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setWeb3Provider(provider)
    }
  }

  const getAccountInfo = async () => {
    if (web3Provider) {
      const accounts = await web3Provider.listAccounts()
      if (accounts.length > 0) {
        connectWallet()
      }
    }
  }

  const connectWallet = async () => {
    const signer = await web3Provider!.getSigner()
    setSigner(signer)

    const address = await signer.getAddress()
    setAddress(address)
    console.log(`Connected to ${address}`)
  }

  const listenAccountChange = async () => {
    window.ethereum.on('accountsChanged', async function (accounts: any) {
      if (accounts.length > 0) {
        getBrowserProvider()
      }
    })
  }

  useEffect(() => {
    getBrowserProvider()
    listenAccountChange()
  }, [])

  useEffect(() => {
    getAccountInfo()
  }, [web3Provider])

  return (
    <Web3Context.Provider
      value={{
        web3Provider,
        signer,
        address,

        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
