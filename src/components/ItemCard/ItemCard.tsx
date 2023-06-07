type Props = {
  imageUrl: string
  price: number
  desc: string
  onBuy?: () => void
  isSold?: boolean
}

export const ItemCart = (props: Props) => {
  const { imageUrl, price, desc, onBuy, isSold } = props

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-4 md:p-8 rounded-t-lg"
          src={imageUrl}
          alt="product image"
        />
      </a>
      <div className="px-3 pb-3 md:px-5 md:pb-5 space-y-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {desc}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {price.toFixed(3)}
            </span>
            <span>
              <img
                src="/ethereum-eth-icon.png"
                alt="ether-icon"
                width={25}
                height={25}
              />
            </span>
          </div>
          {!isSold ? (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={onBuy}
            >
              Buy
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Sold
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
