import React from 'react';
import {shallow} from 'enzyme';
import Facet from '../src/components/Facet';
import App from '../src/App';
import {countByKey} from '../src/utils';
import CartDetails from '../src/components/CartDetails';

const mockShoes = [
    {id: 'a', brand: 'Nike', name: 'Air Max 90', price: 2999.99},
    {id: 'b', brand: 'Nike', name: 'Cortez', price: 2129.99},
    {id: 'c', brand: 'Nike', name: 'Roshe', price: 333.99},
    {id: 'd', brand: 'Reebok', name: 'Classic Brown', price: 1999.99},
    {id: 'e', brand: 'Reebok', name: 'Classic White', price: 1999.99},
    {id: 'f', brand: 'Adidas', name: 'Ultra Boost', price: 1500.00}
];

describe('countByKey', () => {

    it('should return an array', () => {
        const result = countByKey(mockShoes, 'brand');
        expect(result).toBeInstanceOf(Array);
    });

    it('should return an array with a length matching the unique number of keys', () => {
        const result = countByKey(mockShoes, 'brand');
        expect(result.length).toEqual(3);
    });

    it('should return an array of objects containing the key and count value', () => {
        const result = countByKey(mockShoes, 'brand');
        result.forEach(r => {
            expect(r).toEqual(expect.objectContaining({
                brand: expect.any(String),
                count: expect.any(Number)
            }));
        })
    });


    it('should return an array of objects sorted by the count', () => {
        const result = countByKey(mockShoes, 'brand');
        expect(result[0].count).toBeGreaterThanOrEqual(result[1].count);
        expect(result[1].count).toBeGreaterThanOrEqual(result[2].count);
    });
});

describe('Facet', () => {
    it('should render an <li> for each unique brand', () => {
        const wrapper = shallow(<Facet items={mockShoes}/>);
        expect(wrapper.find('li').length).toEqual(3);
    });

    it('the <li> for each brand should contain the brand name and count of items', () => {
        const wrapper = shallow(<Facet items={mockShoes}/>);
        expect(wrapper.find('li').first().text()).toEqual('Nike (3)');
        expect(wrapper.find('li').last().text()).toEqual('Adidas (1)');
    });

    it('should call `props.onFacetSelect` when clicking on an <li>', () => {
        const clickSpy = jest.fn();
        const wrapper = shallow(<Facet items={mockShoes} onFacetSelect={clickSpy}/>);
        const element = wrapper.find('li').first();
        expect(clickSpy).not.toHaveBeenCalled();
        element.simulate('click');
        expect(clickSpy).toHaveBeenCalledWith(expect.objectContaining({
            brand: expect.any(String),
            count: expect.any(Number)
        }));
    })
});

describe('App', () => {
    it('should contain a <Facet /> component', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find(Facet).length).toEqual(1);
    });

    it('should have `state.facetSelected` that equals null', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.state().facetSelected).toBeNull();
        // return false;
    });

    it('should have an instance method called `handleFacetSelect`', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.instance().handleFacetSelect).toBeInstanceOf(Function);

    });

    it('the instance method should update `state.facetSelected`', () => {
        const wrapper = shallow(<App/>);
        const mockFacet = {brand: 'Nike', count: 3};
        expect(wrapper.state().facetSelected).toBeNull();

        wrapper.instance().handleFacetSelect(mockFacet);
        expect(wrapper.state().facetSelected).toEqual(mockFacet);
    });


    it('the instance method should update `state.facetSelected` to null if a shoe is selected already (toggle off)', () => {
        const wrapper = shallow(<App/>);
        const mockFacet = {brand: 'Nike', count: 3};
        wrapper.instance().handleFacetSelect(mockFacet);
        expect(wrapper.state().facetSelected).toEqual(mockFacet);
        wrapper.instance().handleFacetSelect(mockFacet);
        expect(wrapper.state().facetSelected).toBeNull();
    });

    it('the <Facet /> component should be passed `handleSelect` as a prop', () => {
        const wrapper = shallow(<App/>);
        const facetWrapperProps = wrapper.find(Facet).props();
        expect(Object.keys(facetWrapperProps)).toContain('onFacetSelect');

    });

    it('the list of shoes display should be filter based on the facet selected', () => {
        const wrapper = shallow(<App/>);
        const mockFacet = {brand: 'Nike', count: 3};
        wrapper.setState({allshoes: mockShoes});
        wrapper.instance().handleFacetSelect(mockFacet);
        expect(wrapper.state().facetSelected).toEqual(mockFacet);
        expect(wrapper.state().shoes.length).toEqual(3);

    });

    // Peter Ebersey own tests

    it('should pass a function called `onShoeRemove` as a prop to <CartDetails />', () => {
        const wrapper = shallow(<App/>);
        const shoeListRemoveProps = wrapper.find(CartDetails).props();
        expect(Object.keys(shoeListRemoveProps)).toContain('onShoeRemove');
        expect(shoeListRemoveProps.onShoeRemove).toBeInstanceOf(Function);
    });

    it('should have an instance method called `handleShoeRemove`', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.instance().handleShoeRemove).toBeInstanceOf(Function);
    });

    it('`handleShoeSelect()` should add the item to `state.cart`', () => {
        const wrapper = shallow(<App/>);
        const mockShoe = {name: 'Air Max 1000'};
        expect(wrapper.state().cart.length).toEqual(0);

        wrapper.instance().handleShoeSelect(mockShoe);
        expect(wrapper.state().cart).toContain(mockShoe);
        expect(wrapper.state().cart.length).toEqual(1);
    });

     it('`handleShoeRemove()` should delete the item from `state.cart`', () => {
         const wrapper = shallow(<App/>);
         const mockShoe = {name: 'Air Max 1000'};
         wrapper.instance().handleShoeSelect(mockShoe);
         expect(wrapper.state().cart.length).toEqual(1);
         wrapper.instance().handleShoeRemove(mockShoe);
         expect(wrapper.state().cart.length).toEqual(0);
    });


 /*   it('`RemoveShoeSelect()` should remove  the item to `state.cart`', () => {
        const wrapper = shallow(<App/>);
        const mockShoess = [[{name: 'Ultra Boost',quantity:2,amount:"299.99"},{name: 'Ultra Peter',quantity:2,amount:"299.99"},{quantity:4},{amount:"349"}]];

        wrapper.instance().handleShoeSelect(mockShoess);
        expect(wrapper.state().cart.length).toEqual(2);
         wrapper.instance().handleShoeRemove(mockShoess);
         expect(wrapper.state().cart.length).toEqual(1);
         // expect(wrapper.state().cart).toContain(mockShoe);

    });*/

});


