import { Button, Card, Flex, Pagination, Spin, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import color from '../../assets/colors.js';
import axiosHTTP from '../../axios_handlers/recipeListAxiosHandler.js';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';

const RecipeList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [menu, setMenu] = useState([]);
  const value = useThemeContext();

  const pageSize = 12;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const pageItems = await axiosHTTP.get('/recipes', {
            params: {
              'limit': pageSize,
              'skip': pageSize * currentPage
            }
          }
          );
        const data = pageItems.data;
        setTotalPages(data.total);
        setMenu(data.recipes);
      }
      catch (error) {
        console.error(error);
      }
    }
    getRecipes();
  }, [currentPage])

  if (menu.length === 0) {
    return (
        <Flex justify='center' align='middle'>
            <Spin size='large' />
        </Flex>
    )
  }

  return (
    <React.Fragment>
        <Switch checkedChildren="Light mode" unCheckedChildren="Dark mode" onChange={(checked) => {(checked) ? value.setTheme('dark') : value.setTheme('light')}}/>
        <h1 style={{ textAlign: 'center' }}>Menu trang { currentPage } { totalPages }</h1>
        <Flex justify='center' wrap='wrap' gap='small'>
        {
            menu.map((recipe) => {
            return (
                <Card
                key={recipe.id}
                title={recipe.name}
                style={
                    { width: 300,
                    cursor: 'pointer',
                    marginTop: 10,
                    }
                }
                className = {(value.theme === 'light') ? 'light' : 'dark-theme'}
                >
                <p>
                    <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    style={
                        { width: '100%',
                        height: 'auto',
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
                <p style={{ marginTop: '10px', color: value.theme === 'light' ? 'black' : 'white' }}>{ recipe.name }</p>
                <p style={{ marginTop: '10px' }}>
                    <Button type='primary'>
                        <NavLink to={`/menu/${ recipe.id }`}>
                            Xem chi tiết
                        </NavLink>
                    </Button>
                </p>
                </Card>
            )
            })
        }
        </Flex>
        <Flex justify='center' align='middle'>
          <Pagination 
            onChange={ (page) => setCurrentPage(page) } 
            defaultCurrent={ 1 } 
            pageSize={ pageSize } 
            total={ totalPages }
            style={{ marginTop: '20px' }}
          />
        </Flex>
    </React.Fragment>
  )
}

export default RecipeList;