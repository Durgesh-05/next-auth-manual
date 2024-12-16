'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', { ...loginData });
      if (res.status === 200) {
        toast.success('Login successful');
        setLoginData({
          email: '',
          password: '',
        });
        router.push('/profile');
      }
    } catch (e: any) {
      toast.error('Failed to login. Please check your credentials.');
      console.error('Failed to login user Error: ', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className='w-full max-w-xs h-screen flex flex-col space-y-4 justify-center mx-auto'
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
    >
      <Label htmlFor='email'>Email</Label>
      <Input
        type='email'
        placeholder='johndoe@example.com'
        value={loginData.email}
        name='email'
        id='email'
        className='py-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      />
      <Label htmlFor='password'>Password</Label>
      <Input
        type='password'
        placeholder='******'
        value={loginData.password}
        name='password'
        id='password'
        className='py-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      />
      <div className='flex justify-center items-center'>
        <Button variant='outline' disabled={loading} type='submit'>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
