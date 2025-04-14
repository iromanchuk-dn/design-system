import { render } from '@testing-library/react';
import DsTextField from './ds-text-field';

describe('DsTextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DsTextField />);
    expect(baseElement).toBeTruthy();
  });
});
