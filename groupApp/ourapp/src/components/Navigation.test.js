// Navigation.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Navigation from './Navigation'

test('renders navigation links', () => {
  render(<Navigation />)

  const accountLink = screen.getByText('Account')
  const predictionLink = screen.getByText('Prediction')
  const busynessLink = screen.getByText('Busyness')
  const realEstateLink = screen.getByText('Real Estate')

  expect(accountLink).toBeInTheDocument()
  expect(predictionLink).toBeInTheDocument()
  expect(busynessLink).toBeInTheDocument()
  expect(realEstateLink).toBeInTheDocument()
})

test('renders correct navigation links href attributes', () => {
  render(<Navigation />)

  const accountLink = screen.getByText('Account')
  const predictionLink = screen.getByText('Prediction')
  const busynessLink = screen.getByText('Busyness')
  const realEstateLink = screen.getByText('Real Estate')

  expect(accountLink).toHaveAttribute('href', '/')
  expect(predictionLink).toHaveAttribute('href', '/main')
  expect(busynessLink).toHaveAttribute('href', '/taxi')
  expect(realEstateLink).toHaveAttribute('href', '/price')
})
