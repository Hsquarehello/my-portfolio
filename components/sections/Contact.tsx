"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (!formRef.current) return;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured");
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Email error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error &&
          error.message === "Email service is not configured"
          ? "The contact form is not configured yet. Please email me directly."
          : "Something went wrong. Please try again later.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out
          to me directly!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Let&apos;s talk about everything!
            </h3>
            <p className="text-muted-foreground">
              I am open to full-time roles, freelance projects, and technical
              consultancy.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a
                  href="mailto:real203play@gmail.com"
                  className="font-medium hover:underline">
                  real203play@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Yangon, Myanmar</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Dynamic Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-border rounded-xl p-6 sm:p-8 bg-card shadow-sm">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Hello, I'd like to talk about..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            {/* Dynamic Status Notifications */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-green-600 bg-green-500/10 p-3 rounded-lg text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  Message sent successfully! I will get back to you soon.
                </span>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-600 bg-red-500/10 p-3 rounded-lg text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 px-6 bg-primary text-primary-foreground font-medium rounded-lg shadow hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50">
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
