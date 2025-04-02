import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';

const Login = () => {
  const { login } = useAuthContext();
  let navigate = useNavigate();

  const handleSubmit = (fields) => {
    const username = fields.username;
    const password = fields.password;
    
    login(username, password);

    // if login success, redirect to home page
    navigate('/');
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