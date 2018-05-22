// import React from 'react';
// import { shallow } from 'enzyme';
// import Button from '../components/Button.jsx';

// describe('Button', () => {
//     it('should be defined', () => {
//         expect(Button).toBeDefined();
//     });
//     it('should render correctly', () => {
//         const tree = shallow(
//             <Button name='button test' />
//         );
//         expect(tree).toMatchSnapshot();
//     });
// });

describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});