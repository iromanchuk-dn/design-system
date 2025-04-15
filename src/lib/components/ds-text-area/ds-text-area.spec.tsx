import { render } from '@testing-library/react';
import DsTextArea from './ds-text-area';

describe('DsTextArea', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DsTextArea />);
    expect(baseElement).toBeTruthy();
  });
});
