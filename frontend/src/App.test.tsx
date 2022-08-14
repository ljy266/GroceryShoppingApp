import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import CardComponent from './Components/CardComponent';
import CartComponent from './Components/CartComponent';
import {BrowserRouter as Router} from 'react-router-dom'
import StoreCardComponent from './Components/StoreCardComponent';


describe('Testing Main Components on Main Page', () => {

  it('should display core page components', () => {
    render(<App/>)
    expect(screen.getByText('GROCERY SHOPPER')).toBeInTheDocument()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByText('Current Grocery List')).toBeInTheDocument()
  })

  it('should display grocery store card and be clickable', async () => {
    const mockItem =  {
      name: "nameTest",
      description: "descriptionTest",
      image: "imageTest"
    }
    const spy = jest.fn()

    render(<CardComponent product={mockItem} groceryListCallback={spy}/>)
    expect(screen.getByText('nameTest')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Add to Cart'))
    expect(spy).toHaveBeenCalled()
  })

  it('should display grocery list when items are passed to it and be clickable ', () => {
    const mockItemList =  [{
      name: "nameTest",
      description: "descriptionTest",
      image: "imageTest"
    }]
    const spy = jest.fn()
    render(<Router> <CartComponent groceryList={mockItemList} searchItemCallback={spy}/></Router>)
    expect(screen.getByText('nameTest')).toBeInTheDocument()
    expect(screen.getByTestId('DeleteIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('DeleteIcon'))
    expect(spy).toHaveBeenCalled()
  })
})


describe('Testing Calculation Page', () => {

  it('should display store card', () => {
    const mockGroceryList =  [{
      name: "nameTest",
      price: "priceTest",
      image: "imageTest"
    }]

    render(<StoreCardComponent title={"storeNameTest"} description={"storeDescriptionTest"} imagePath={"storeImagePath"} total={"totalTest"} groceryList={mockGroceryList} storeHours={"storeHourTest"}/>)
    expect(screen.getByText('storeNameTest')).toBeInTheDocument()
  })
})

