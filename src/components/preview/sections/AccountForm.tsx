import React from 'react';

interface AccountFormProps {
  baseLib: string;
}

export const AccountForm = ({ baseLib }: AccountFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-[rgb(var(--color-text-primary))]">Create Account</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">Name</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">Password</label>
          <input 
            type="password" 
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[rgb(var(--color-text-primary))] mb-1">Country</label>
          <select className="w-full px-3 py-2 border border-[rgb(var(--color-border))] rounded-[var(--radius-md)] bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:border-transparent outline-none">
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>
        <button className="w-full px-4 py-2 bg-[rgb(var(--color-brand))] text-white rounded-[var(--radius-md)] hover:bg-[rgb(var(--color-brand))]/90 focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2 font-medium">
          Create Account
        </button>
      </div>
    </div>
  );
};
