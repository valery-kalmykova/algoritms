import renderer from 'react-test-renderer';
import { Button } from '../button';
import { render, screen, fireEvent } from '@testing-library/react';

const buttonText = 'Развернуть'
describe('button component tests', () => {

  it('button with text', () => {
    const button = renderer.create(<Button text={buttonText}/>).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('button without text', () => {
    const button = renderer.create(<Button />).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('button is disabled', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('button is loading', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON()
    expect(button).toMatchSnapshot()
  })

  it('button has callback onClick', () => {
    const fn = jest.fn();
    render(<Button onClick={fn} text={buttonText} />)
    const button = screen.getByText(buttonText);
    fireEvent.click(button);
    expect(fn).toBeCalledTimes(1);    
  })

})