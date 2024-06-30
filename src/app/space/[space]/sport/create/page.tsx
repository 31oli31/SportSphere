'use client';

import React  from 'react';
import { useMutation} from "@apollo/client";
import {useImmer} from "use-immer";
import {gql} from "@/graphql/__generated__"; // Make sure to install axios using npm or yarn
import { useRouter } from 'next/navigation';
import {PAGE_ROUTE} from "@/interface/route";

const CREATE_SPORT = gql(`mutation createSport($name: String!) {
    createSport(name: $name) {
        name
    }
    }`);

interface SportForm {
    name: string;
}

const CreateSportPage: React.FC = () => {
  const router = useRouter();
  const [createSport, { data, loading, error }] = useMutation(CREATE_SPORT);
  const [sportForm, updateSportForm] = useImmer<SportForm >({
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'name') updateSportForm(draft => { draft.name = value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createSport({ variables: sportForm });
      console.log('Sport created successfully:', response.data);
      router.push(PAGE_ROUTE.SPORT)
    } catch (error) {
      console.error('Error creating sport:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create New Sport</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Sport Name</label>

          <input
            type="text"
            id="name"
            name="name"
            value={sportForm?.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Create Sport
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSportPage;
