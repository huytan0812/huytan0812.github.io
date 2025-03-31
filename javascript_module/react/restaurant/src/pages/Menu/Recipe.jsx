import { ShoppingCartOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Flex, List, Spin, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import color from '../../assets/colors.js';
import axiosHTTP from '../../axios_handlers/recipeListAxiosHandler.js';
import { useCartContext } from '../../contexts/CartContext.jsx';

const Recipe = () => {
    const [recipe, setRecipe] = useState({});
    const params = useParams();
    const cart = useCartContext();

    console.log(cart);
    
    useEffect(() => {
        const getRecipe = async() => {
            try {
                // const url = `https://dummyjson.com/recipes/${ params.recipeId }`;
                const response = await axiosHTTP.get(`/recipes/${ params.recipeId }`);
                console.log(response);
                setRecipe(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }

        getRecipe();
    }, [params.recipeId])

    console.log(recipe);

    if (Object.keys(recipe).length === 0) {
        return (
            <Flex justify='center' align='middle'>
                <Spin size='large' />
            </Flex>
        )
    }

    return (
        <React.Fragment>
            <Flex justify='center' style={{ marginTop: '10px' }}>
                <Breadcrumb
                    items={[
                    {
                        title: <NavLink to='/'>Home</NavLink>,
                    },
                    {
                        title: <NavLink to='/menu'>Menu</NavLink>,
                    },
                    {
                        title: <span>Recipe { params.recipeId } </span>,
                    },
                    ]}
                />
            </ Flex>
            <Flex justify='center'>
                    <Card
                    key={recipe.id}
                    title={<p className="recipe-title"><strong>{ recipe.name} </strong></p>}
                    style={
                        { width: '50%',
                        cursor: 'pointer',
                        marginTop: 10,
                        }
                    }
                    >
                    <p style={{ textAlign: 'center' }}>
                        <img
                        src={ recipe.image }
                        alt={ recipe.name }
                        style={
                            { width: '60%',
                            height: '60%',
                            }
                        }
                        />
                    </p>
                    <Flex justify='start' gap='small' wrap='wrap' style={{ marginTop: '10px' }}>
                        {
                            recipe.tags.map((tag, idx) => {
                                return (
                                    <Tag key={ idx } color={ color[idx]} gap='small'>
                                        { tag }
                                    </Tag>
                                )
                            })
                        }
                    </Flex>
                    <p style={{ marginTop: '10px', color: 'black' }}>
                        <strong>Ingredients: </strong>
                        <span>
                            { recipe.ingredients.join(", ")}
                        </span>
                    </p>
                    <List
                    size="small"
                    header={<p><strong>Instructions</strong></p>}
                    bordered
                    dataSource={ recipe.instructions }
                    renderItem={
                        (item, idx) => {
                            return (
                                <List.Item>
                                    <strong>Step { idx + 1 }: </strong>
                                    {item}
                                </List.Item>
                            )
                    }
                    }
                    style={{ marginTop: '10px' }}
                    />
                    <p style=
                    {
                        { 
                            float: 'right', 
                            borderRadius: '5px', 
                            border: '1px solid black',
                            marginTop: '10px',
                        }
                    }
                    >
                        <Button 
                            type="button" 
                            style={{ marginTop: '10px' }}
                            onClick={ () =>  cart.setCartItems([...cart.cartItems, recipe])}
                        >
                            <ShoppingCartOutlined 
                                style = {{
                                    fontSize: '30px',
                                    color: 'black',
                                }}
                            />
                        </Button>
                    </p>
                </Card>
            </Flex>
        </React.Fragment>
    )
}

export default Recipe