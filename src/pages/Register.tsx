import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log('Error: Password and confirm password do not match');
      return;
    }
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 h-screen py-24">
      <div className="flex flex-row justify-center">
        <div className="w-96 h-[575px] rounded-md shadow-md bg-white">
          <div className="flex flex-col items-center py-6 ">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
              Register
            </h2>
            <div className="w-80">
              <h4 className="scroll-m-20 my-4 font-semibold tracking-tight">
                Email
              </h4>
              <Input type="text" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <Button>Register</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Register