import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import './body.scss'

const Body = () => {
    const rates = useSelector(state => state.rates.rates)
    const firstCurrency = useRef()
    const secondCurrency = useRef()
    const firsdtSelect = useRef()
    const secondSelect = useRef()

    let calculateBuyCost = () => {
        if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = rates.find(rate => rate.ccy === secondSelect.current.value)
            secondCurrency.current.value = (firstCurrency.current.value / parseFloat(ccy_buy.buy).toFixed(2)).toFixed(2)
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value === 'UAH') {
            let ccy_sell = rates.find(rate => rate.ccy === firsdtSelect.current.value)
            secondCurrency.current.value = (firstCurrency.current.value * parseFloat(ccy_sell.buy).toFixed(2)).toFixed(2)
        } else if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value === 'UAH') {
            secondCurrency.current.value = firstCurrency.current.value
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = rates.find(rate => rate.ccy === secondSelect.current.value)
            let ccy_sell = rates.find(rate => rate.ccy === firsdtSelect.current.value)

            secondCurrency.current.value = (firstCurrency.current.value * parseFloat(ccy_buy.buy).toFixed(2) / parseFloat(ccy_sell.buy).toFixed(2)).toFixed(2)
        }
    }

    let calculateSellCost = () => {
        if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = rates.find(rate => rate.ccy === secondSelect.current.value)
            firstCurrency.current.value = (secondCurrency.current.value / parseFloat(ccy_buy.buy).toFixed(2)).toFixed(2)
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value === 'UAH') {
            let ccy_sell = rates.find(rate => rate.ccy === firsdtSelect.current.value)
            firstCurrency.current.value = (secondCurrency.current.value * parseFloat(ccy_sell.buy).toFixed(2)).toFixed(2)
        } else if (firsdtSelect.current.value === 'UAH' && secondSelect.current.value === 'UAH') {
            firstCurrency.current.value = secondCurrency.current.value
        } else if (firsdtSelect.current.value !== 'UAH' && secondSelect.current.value !== 'UAH') {
            let ccy_buy = rates.find(rate => rate.ccy === secondSelect.current.value)
            let ccy_sell = rates.find(rate => rate.ccy === firsdtSelect.current.value)

            firstCurrency.current.value = (secondCurrency.current.value * parseFloat(ccy_sell.buy).toFixed(2) / parseFloat(ccy_buy.buy).toFixed(2)).toFixed(2)
        }
    }

  return (
    <div className='body_main_div'>
        <div className='exchange_calculator_div'>
            <div className='currency_box first_currency'>
                <select 
                    ref={firsdtSelect} 
                    onChange={() => {
                        firstCurrency.current.value = null
                        secondCurrency.current.value = null
                    }}>
                    {rates.map(rate => 
                        <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH'>UAH</option>
                </select>

                <input type='text' ref={firstCurrency} placeholder='0' onChange={calculateBuyCost}/>
            </div>

            <div className='currency_box second_currency'>
                <select 
                    ref={secondSelect} 
                    onChange={() => {
                        firstCurrency.current.value = null
                        secondCurrency.current.value = null
                    }}>
                    {rates.map(rate => 
                        <option key={rate.buy} value={rate.ccy}>{rate.ccy}</option>
                    )}
                    <option value='UAH'>UAH</option>
                </select>

                <input type='text' ref={secondCurrency} placeholder='0' onChange={calculateSellCost}/>
            </div>
        </div>
    </div>
  )
}

export default Body