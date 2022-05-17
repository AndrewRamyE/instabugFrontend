import { render, screen, fireEvent } from '@testing-librart/vue';
import '@testing-library/jest-dom';
import PreformancePage from './performance-page.vue';

describe('test Preformance Page rendered', ()=>{
  it('renders', () => {
    render(PreformancePage);

    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });
  it('put start and end date and see tooltip', async ()=>{
    fireEvent.update(screen.getByLabelText('startDate'), '2022-01-10');
    fireEvent.update(screen.getByLabelText('endDate'), '2022-01-11');
    expect(await screen.findByText('10 jan 2022')).toBeInTheDocument();
  });
});
