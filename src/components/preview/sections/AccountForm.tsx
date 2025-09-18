import React from 'react';

interface AccountFormProps {
  baseLib: string;
}

export const AccountForm = ({ baseLib }: AccountFormProps) => {
  if (baseLib === 'shadcn') {
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
  }

  if (baseLib === 'daisyui') {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold">Create Account</h3>
        <div className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Enter your name" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Enter your email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Enter password" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <select className="select select-bordered">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <button className="btn btn-primary w-full">Create Account</button>
        </div>
      </div>
    );
  }

  if (baseLib === 'flowbite') {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Create Account</h3>
        <div className="space-y-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter password" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Account</button>
        </div>
      </div>
    );
  }

  // Default implementation
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
        <button className="w-full px-4 py-2 bg-[rgb(var(--color-brand))] text-white rounded-[var(--radius-md)] hover:bg-[rgb(var(--color-brand))]/90 focus:ring-2 focus:ring-[rgb(var(--color-focus))] focus:ring-offset-2 font-medium min-h-[44px]">
          Create Account
        </button>
      </div>
    </div>
  );
};