import renderer from 'react-test-renderer';
import { Circle } from '../circle';
import { ElementStates } from "../../../../types/element-states";

const letter = 'A';
describe('Circle component tests', () => {

  it('circle without letter', () => {
    const circle = renderer.create(<Circle />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with letter', () => {
    const circle = renderer.create(<Circle text={letter}/>).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with empty head', () => {
    const circle = renderer.create(<Circle head />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with not empty head', () => {
    const circle = renderer.create(<Circle head={<Circle text={letter} />} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with empty tail', () => {
    const circle = renderer.create(<Circle tail />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with not empty tail', () => {
    const circle = renderer.create(<Circle tail={<Circle text={letter} />} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with index', () => {
    const circle = renderer.create(<Circle index={0} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with prop isSmall', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with state Default', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with state Changing', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

  it('circle with state Modified', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
    expect(circle).toMatchSnapshot()
  })

})