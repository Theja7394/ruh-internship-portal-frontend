// pages/user-profile.jsx
"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import api from "../../../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [note, setNote] = useState("");
  const router = useRouter();

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const comapanyData = { name, address, email, phone, person, note };
    console.log(comapanyData);

    try {
      const response = await api.post("/company", comapanyData);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push("/admin-dashboard/CompanyDetails");
      } else {
        toast.error("Error adding company");
      }
    } catch (error) {
      toast.error("Error adding company");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8  mx-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ADD COMPANY DETAILS
      </h1>
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-5xl mx-auto">
        <form onSubmit={handleSaveChanges}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-base font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-base font-medium mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex mb-6">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="email"
                className="block text-base font-medium mb-2"
              >
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaEnvelope className="text-gray-500 ml-2" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-0 ml-2"
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <label
                htmlFor="phone"
                className="block text-base font-medium mb-2"
              >
                Contact Number
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FaPhone className="text-gray-500 ml-2" />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border-0 ml-2"
                />
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="person"
              className="block text-base font-medium mb-2"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="person"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="note" className="block text-base font-medium mb-2">
              Note
            </label>
            <textarea
              id="note"
              className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
              rows="4"
              value={note}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-[#0F1D2F] text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
