import { render, fireEvent } from '@testing-library/react'
import Modal from '../components/Common/Modal'

describe('Singup Component', () => {
  const component = (
    <Modal
      open={true}
      setOpen={() => console.log('hi')}
      title={'this is title'}
      description={'this is description'}
    />
  )

  test('Renders successfully', () => {
    render(component)
  })

  test('Renders successfully', () => {
    const { getByTestId } = render(component)
    const closeButton = getByTestId('close_btn')
    fireEvent.click(closeButton)
  })
})
