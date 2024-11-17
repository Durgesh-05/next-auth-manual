'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Signup } from '@/utils/types';
import React, { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const SignupPage = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<Signup>({
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevData: Signup) => {
      return { ...prevData, [name]: value };
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/users/signup', { ...signupData });
      if (res.status === 200) {
        toast.success('Signup successful');
        setSignupData({
          email: '',
          username: '',
          password: '',
        });
        router.push('/login');
      }
    } catch (e: any) {
      console.error('failed to signup user Error: ', e);
      toast.error('Failed to signup user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className='w-full max-w-xs h-screen flex flex-col space-y-4 justify-center  mx-auto '
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
    >
      <Label htmlFor='username'>Username</Label>
      <Input
        type='text'
        placeholder='johndoe'
        value={signupData.username}
        name='username'
        id='username'
        className='py-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      />
      <Label htmlFor='email'>Email</Label>
      <Input
        type='email'
        placeholder='johndoe@example.com'
        value={signupData.email}
        name='email'
        id='email'
        className='py-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      />
      <Label htmlFor='password'>Password</Label>
      <Input
        type='password'
        placeholder='******'
        value={signupData.password}
        name='password'
        id='password'
        className='py-5'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      />
      <div className='flex justify-center items-center'>
        <Button variant='outline' disabled={loading} type='submit'>
          Signup
        </Button>
      </div>
    </form>
  );
};
