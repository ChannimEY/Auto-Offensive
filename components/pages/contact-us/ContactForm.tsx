"use client";

import { useState } from "react";

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log({ ...form, agreed });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0d9488] bg-gray-50";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 mb-1 font-medium"
            style={{ fontSize: "20px" }}
          >
            First Name
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Auto"
            className={inputClass}
            style={{ fontSize: "20px" }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-1 font-medium"
            style={{ fontSize: "20px" }}
          >
            Last Name
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Offensive"
            className={inputClass}
            style={{ fontSize: "20px" }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 mb-1 font-medium"
          style={{ fontSize: "20px" }}
        >
          Email Address
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="auto.offensive@edu.com"
          className={inputClass}
          style={{ fontSize: "20px" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-gray-700 mb-1 font-medium"
            style={{ fontSize: "20px" }}
          >
            Company
          </label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="ISTAD"
            className={inputClass}
            style={{ fontSize: "20px" }}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-1 font-medium"
            style={{ fontSize: "20px" }}
          >
            Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="098 765 432"
            className={inputClass}
            style={{ fontSize: "20px" }}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 mb-1 font-medium"
          style={{ fontSize: "20px" }}
        >
          Subject
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Free ask"
          className={inputClass}
          style={{ fontSize: "20px" }}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 mb-1 font-medium"
          style={{ fontSize: "20px" }}
        >
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="How can i you use unlimited?"
          rows={5}
          className={`${inputClass} resize-none`}
          style={{ fontSize: "20px" }}
        />
      </div>

      <div className="flex items-start gap-2 mb-6 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-[#0d9488]"
        />
        <label
          htmlFor="agree"
          className="text-gray-600"
          style={{ fontSize: "20px" }}
        >
          I agree to the{" "}
          <a href="#" className="text-[#0d9488] underline">
            privacy policy
          </a>{" "}
          and terms. PenShield may contact me regarding my inquiry.
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#0d9488] hover:bg-[#0b7a6e] text-white font-semibold py-3 rounded-xl transition-colors"
        style={{ fontSize: "20px" }}
      >
        Send Message
      </button>
    </div>
  );
}
