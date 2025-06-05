import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-4 px-6 text-center bg-burgundy text-white text-sm mt-8 rounded-t-2xl">
      © Copyright Jason Renaud 2025. All rights reserved.{" "}
      <Link to="/contact" className="underline hover:text-pink-300">Contact</Link>
    </footer>
  );
}
