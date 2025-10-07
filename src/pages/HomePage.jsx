// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaBullseye, FaCheckCircle } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Organize Your Student Life
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            TaskMaster helps you manage your assignments, track deadlines, and submit your work on time, all in one place.
          </p>
          <div className="mt-12">
            <Link
              to="/signup"
              className="inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Everything You Need to Succeed
            </p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-1 md:grid-cols-3">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <FaClipboardList className="mx-auto h-12 w-12 text-indigo-500" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Create & Manage Tasks</h3>
              <p className="mt-2 text-base text-gray-500">
                Easily create tasks for each subject, add descriptions, and set deadlines.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <FaBullseye className="mx-auto h-12 w-12 text-indigo-500" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Never Miss a Deadline</h3>
              <p className="mt-2 text-base text-gray-500">
                Our dashboard gives you a clear overview of all upcoming and pending tasks.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <FaCheckCircle className="mx-auto h-12 w-12 text-indigo-500" />
              <h3 className="mt-6 text-lg font-medium text-gray-900">Submit Your Work</h3>
              <p className="mt-2 text-base text-gray-500">
                Upload your completed assignments as PDFs directly to the task before the deadline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;