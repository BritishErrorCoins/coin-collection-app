import React, { useState } from "react";

const QUERY_TYPES = [
  "Report Missing Coin Listing",
  "Report Bug",
  "General Query"
];

export default function Contact() {
  const [form, setForm] = useState({
    queryType: QUERY_TYPES[0],
    firstName: "",
    surname: "",
    email: "",
    message: "",
    image: null,
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!form.firstName || !form.surname || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSending(true);

    // Using mailto: fallback for no backend; replace with backend if you want real sending
    let mailBody = [
      `Nature of Query: ${form.queryType}`,
      `First Name: ${form.firstName}`,
      `Surname: ${form.surname}`,
      `Email: ${form.email}`,
      `Message: ${form.message}`
    ].join('\n');
    const subject = encodeURIComponent(`[Predecimal Coins] ${form.queryType}`);
    const body = encodeURIComponent(mailBody);

    window.location.href = `mailto:britisherrorcoins@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({
        queryType: QUERY_TYPES[0],
        firstName: "",
        surname: "",
        email: "",
        message: "",
        image: null,
      });
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-[#231821] rounded-2xl shadow-lg p-6 mt-8 mb-12">
      <div className="mb-4 text-gray-700 dark:text-gray-300">
        <p>
          I hope that you are enjoying the software. Please feel free to contact me if you find any errors in the listings or if you have a variety that is not listed. I am also happy to hear your suggestions on how to improve the software.
        </p>
        <p className="mt-2 font-semibold">
          Reporting new listings or listing errors
        </p>
        <p>
          If you are able to provide pictures or direct me to any evidence to support your report, I would greatly appreciate it. Please be clear with as many details as you can provided.
        </p>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nature of Query<span className="text-red-500">*</span></label>
          <select
            name="queryType"
            value={form.queryType}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 w-full"
            required
          >
            {QUERY_TYPES.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">First Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Surname<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address<span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Message<span className="text-red-500">*</span></label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="border rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className={`bg-burgundy text-white rounded-2xl px-6 py-2 font-semibold shadow ${sending ? "opacity-70" : ""}`}
          disabled={sending}
        >
          {sending ? "Sending..." : "Submit"}
        </button>
        {sent && (
          <div className="text-green-600 text-center mt-2">Your message has been sent. Thank you!</div>
        )}
      </form>
    </div>
  );
}
