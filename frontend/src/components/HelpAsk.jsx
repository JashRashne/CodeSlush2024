import React, { useState } from 'react';
import Consultation from './Consultation';

const HelpAsk = () => {
  const [responses, setResponses] = useState({
    feeling: '',
    stressLevel: '',
    support: {
      friends: false,
      family: false,
      others: false,
    },
    hobbies: '',
  });

  const [showConsultation, setShowConsultation] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setResponses((prevResponses) => ({
        ...prevResponses,
        support: {
          ...prevResponses.support,
          [name]: checked,
        },
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User responses:', responses);
    setShowConsultation(true);
  };

  if (showConsultation) {
    return <Consultation />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Mental Wellbeing Check</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">
            How are you feeling today?
            <textarea
              name="feeling"
              value={responses.feeling}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <span className="block text-lg font-medium mb-2">Are you experiencing any stress or anxiety?</span>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="stressLow"
              name="stressLevel"
              value="low"
              checked={responses.stressLevel === 'low'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="stressLow" className="mr-4">Low</label>
            <input
              type="radio"
              id="stressMedium"
              name="stressLevel"
              value="medium"
              checked={responses.stressLevel === 'medium'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="stressMedium" className="mr-4">Medium</label>
            <input
              type="radio"
              id="stressHigh"
              name="stressLevel"
              value="high"
              checked={responses.stressLevel === 'high'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="stressHigh">High</label>
          </div>
        </div>
        <div>
          <span className="block text-lg font-medium mb-2">Do you feel you have enough support from:</span>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="supportFriends"
              name="friends"
              checked={responses.support.friends}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="supportFriends" className="mr-4">Friends</label>
            <input
              type="checkbox"
              id="supportFamily"
              name="family"
              checked={responses.support.family}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="supportFamily" className="mr-4">Family</label>
            <input
              type="checkbox"
              id="supportOthers"
              name="others"
              checked={responses.support.others}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="supportOthers">Others</label>
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">
            What activities or hobbies help you relax and unwind?
            <textarea
              name="hobbies"
              value={responses.hobbies}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HelpAsk;
