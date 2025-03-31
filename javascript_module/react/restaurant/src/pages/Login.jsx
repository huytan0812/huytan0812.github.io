import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosHTTP from '../axios_handlers/loginAxiosHandler.js';
import { useUserContext } from '../contexts/UserContext.jsx';

const Login = () => {
  const { user, setUser } = useUserContext();
  let navigate = useNavigate();

  const handleSubmit = (fields) => {
    const username = fields.username;
    const password = fields.password;
    
    const login = async() => {
      try {
        // Send response to API endpoint to validate user
        const response = await axiosHTTP.post('/login', {
          username: username,
          password: password,
          expiresInMins: 30,
        })

        const data = response.data;
        
        // Set user to UserContext
        setUser(data);

        // Navigating to home
        navigate('/');
      }
      catch (error) {
        console.log(error);
    }
  }
  login();
  }

  return (
    <Flex justify='center' style={{ marginTop: '10px' }}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={ handleSubmit }
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
          </Form>
    </Flex>
  )
}

export default Login