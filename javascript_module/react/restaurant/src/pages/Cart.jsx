import { Flex, List } from 'antd';
import React from 'react';
import { useCartContext } from '../contexts/CartContext.jsx';

const Cart = () => {
    const cart = useCartContext();

    return (
        <Flex 
            justify='center'
            style={{
                marginTop: '20px'
            }}
        >
            <List
                header={<p><strong>Cart Items:</strong></p>}
                bordered
                dataSource={cart.cartItems}
                renderItem={(item) => (
                    <List.Item>
                        <p>
                            { item.name }
                        </p>
                    </List.Item>
                )}
            />
        </Flex>
    )
}

export { Cart };

