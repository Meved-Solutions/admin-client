import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSetRecoilState } from 'recoil';
import { Admin, Authenticated } from '@/atom';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(Authenticated);
  const setAdmin = useSetRecoilState(Admin);

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Error: Password and confirm password do not match');
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/adminAuth/register`, data);

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("_id", res.data.newAdmin._id);
      setAuthenticated(true);
      setAdmin(res.data.newAdmin);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 min-h-screen py-24">
      <div className="flex flex-row justify-center">
        <div className="px-8 py-2 rounded-md shadow-md bg-white">
          <div className="flex flex-col items-center py-6 ">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
              Register
            </h2>
            <div className="w-80 overflow-auto">
              <h4 className="scroll-m-20 my-4 font-semibold tracking-tight">
                Email
              </h4>
              <Input type="text" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="w-80">
              <h4 className="scroll-m-20 my-4 font-semibold tracking-tight">
                Name
              </h4>
              <Input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="w-80">
              <h4 className="scroll-m-20 my-4 font-semibold tracking-tight">
                Password
              </h4>
              <Input type={showPassword ? "text" : "password"} placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className='flex flex-row justify-end'>
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide password' : 'Show password'}
                </button>
              </div>
            </div>
            <div className="w-80">
              <h4 className="scroll-m-20 my-4 font-semibold tracking-tight">
                Confirm Password
              </h4>
              <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Your Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <div className='flex flex-row justify-end'>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? 'Hide password' : 'Show password'}
                </button>
              </div>
            </div>
            <div className="mt-3">
              <Button type="submit">Register</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;