import React, { useState } from "react";
import { ContactItem } from "../types";
import { motion } from "motion/react";
import { InteractiveTilt } from "../components/reactbits/InteractiveTilt";
import emailjs from "@emailjs/browser";

const contactItems: ContactItem[] = [
  {
    title: "Email",
    value: "email@wanma2.com",
    iconClass: "fa-regular fa-envelope",
    link: "mailto:email@wanma2.com",
  },
  {
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    iconClass: "fa-brands fa-whatsapp",
    link: "https://wa.me/6281234567890",
    target: "_blank",
  },
  {
    title: "GitHub",
    value: "github.com/wanma2",
    iconClass: "fa-brands fa-github",
    link: "https://github.com/wanma2",
    target: "_blank",
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/wanma2",
    iconClass: "fa-brands fa-linkedin-in",
    link: "https://linkedin.com/in/wanma2",
    target: "_blank",
  },
  {
    title: "TikTok",
    value: "tiktok.com/@wanma2",
    iconClass: "fa-brands fa-tiktok",
    link: "https://tiktok.com/@wanma2",
    target: "_blank",
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus("idle");

    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || "service_rz40e6p";
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || "template_ev4knue";
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || "156PqRvZ8G3VFlcC5";

    const formattedTime = new Date().toLocaleString("id-ID", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    const templateParams = {
      name,
      email,
      subject,
      message,
      time: formattedTime,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSending(false);
    }
  };


  return (
    <section className="py-[120px] px-[10%] bg-transparent flex justify-center border-b border-border-primary relative overflow-hidden" id="contact">
      {/* Premium Contact Background Composition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft blue glow behind the contact form (5-8% opacity) */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary opacity-[0.06] blur-[110px]" />
        
        {/* Subtle floating dots */}
        <div className="absolute inset-0 z-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[3px] h-[3px] bg-primary rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.01, 0.04, 0.01],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Slight localized grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.5]" />
        
        {/* Minimal abstract curve (extremely light 1.5% opacity) */}
        <svg className="absolute bottom-[10%] left-[5%] w-[350px] h-[150px] opacity-[0.02] text-primary" viewBox="0 0 350 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10 140 C 100 100, 200 150, 340 10" stroke="currentColor" strokeWidth="1" />
          <path d="M 30 140 C 110 110, 190 140, 320 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-[1200px] w-full relative z-10">
        {/* HEADER */}
        <div className="relative mb-[56px]">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-[10px] mb-[16px]"
            >
              <span className="relative flex h-[10px] w-[10px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-primary"></span>
              </span>
              <span className="text-[0.8rem] font-bold uppercase tracking-[3px] text-primary">CONTACT</span>
            </motion.div>
            <h2 className="text-[2.5rem] font-extrabold leading-[1.2] text-text-primary mb-[16px] flex flex-wrap gap-x-3">
              {["Let's", "Build", "Something"].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                  transition={{ delay: 0.1 + i * 0.1, type: "spring" as any, stiffness: 120, damping: 14 }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ delay: 0.1 + 3 * 0.1, type: "spring" as any, stiffness: 120, damping: 14 }}
                className="text-primary"
              >
                Together
              </motion.span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-text-secondary text-[1rem] leading-[1.6] max-w-[500px]"
            >
              Have a project in mind or just want to say hello?<br />
              Feel free to reach out. I'll get back to you as soon as possible.
            </motion.p>
          </div>
        </div>

        {/* MAIN GRID (2 COLUMNS) */}
        <div className="grid grid-cols-[1fr_1.5fr] gap-[32px] max-md:grid-cols-1">
          {/* KIRI: CONTACT INFO CARD */}
          <InteractiveTilt maxTilt={6} glareMaxOpacity={0.08} glareColor="#4ac8ff" className="h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 80, damping: 15, delay: 0.2 }}
              className="bg-surface border border-border-primary rounded-[20px] p-[40px] h-full shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            >
              <div className="mb-[32px]">
                <h3 className="text-[1.25rem] font-bold text-text-primary mb-[8px]">Contact Information</h3>
                <p className="text-[0.9rem] text-text-secondary">
                  Let's connect through any of these channels
                </p>
              </div>

              <div className="flex flex-col gap-[24px] mb-[40px]">
                {contactItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    target={item.target}
                    rel={item.target ? "noopener noreferrer" : undefined}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                    whileHover="hover"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.4 + idx * 0.08 } },
                      hover: { y: -4, transition: { type: "spring" as any, stiffness: 400, damping: 20 } }
                    }}
                    className="flex items-center gap-[16px] no-underline color-inherit group"
                  >
                    <motion.div 
                      variants={{
                        hover: { scale: 1.08, rotate: 5, transition: { type: "spring" as any, stiffness: 400, damping: 10 } }
                      }}
                      className="w-[48px] h-[48px] rounded-[12px] bg-primary/10 text-primary flex items-center justify-center text-[1.25rem] shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-white border border-transparent group-hover:border-primary/20"
                    >
                      <i className={item.iconClass}></i>
                    </motion.div>
                    <div className="grow">
                      <h4 className="text-[0.95rem] font-bold text-text-primary mb-[4px]">{item.title}</h4>
                      <p className="text-[0.85rem] text-text-secondary">{item.value}</p>
                    </div>
                    <motion.i 
                      variants={{
                        hover: { x: 4, transition: { type: "spring" as any, stiffness: 400, damping: 20 } }
                      }}
                      className="fa-solid fa-chevron-right text-text-muted text-[0.85rem] transition-colors duration-300 group-hover:text-primary"
                    ></motion.i>
                  </motion.a>
                ))}
              </div>

              <div className="border-l-[3px] border-primary pl-[16px] text-[0.85rem] text-text-secondary leading-[1.6]">
                Open for collaboration, freelance projects,<br />and new opportunities.
              </div>
            </motion.div>
          </InteractiveTilt>

          {/* KANAN: CONTACT FORM CARD */}
          <InteractiveTilt maxTilt={6} glareMaxOpacity={0.08} glareColor="#4ac8ff" className="h-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
              transition={{ type: "spring" as any, stiffness: 80, damping: 15, delay: 0.3 }}
              className="bg-surface border border-border-primary rounded-[20px] p-[40px] h-full shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            >
              <div className="mb-[32px]">
                <h3 className="text-[1.25rem] font-bold text-text-primary mb-[8px]">Send Me a Message</h3>
                <p className="text-[0.9rem] text-text-secondary">
                  Fill out the form below and I'll get back to you
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-[20px] mb-[20px] max-md:grid-cols-1">
                  {/* Name */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[0.85rem] font-semibold text-text-primary">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-[14px] px-[16px] bg-background-secondary border border-border-primary rounded-[12px] text-[0.95rem] text-text-primary outline-none transition-all duration-200 focus:bg-surface focus:border-primary focus:shadow-[0_0_12px_rgba(74,200,255,0.15)] placeholder-text-muted focus:placeholder-text-muted/50"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[0.85rem] font-semibold text-text-primary">Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-[14px] px-[16px] bg-background-secondary border border-border-primary rounded-[12px] text-[0.95rem] text-text-primary outline-none transition-all duration-200 focus:bg-surface focus:border-primary focus:shadow-[0_0_12px_rgba(74,200,255,0.15)] placeholder-text-muted focus:placeholder-text-muted/50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  {/* Subject */}
                  <div className="flex flex-col gap-[8px] col-span-2 max-md:col-span-1">
                    <label className="text-[0.85rem] font-semibold text-text-primary">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full py-[14px] px-[16px] bg-background-secondary border border-border-primary rounded-[12px] text-[0.95rem] text-text-primary outline-none transition-all duration-200 focus:bg-surface focus:border-primary focus:shadow-[0_0_12px_rgba(74,200,255,0.15)] placeholder-text-muted focus:placeholder-text-muted/50"
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                  {/* Message */}
                  <div className="flex flex-col gap-[8px] col-span-2 max-md:col-span-1">
                    <label className="text-[0.85rem] font-semibold text-text-primary">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full py-[14px] px-[16px] bg-background-secondary border border-border-primary rounded-[12px] text-[0.95rem] text-text-primary outline-none transition-all duration-200 focus:bg-surface focus:border-primary focus:shadow-[0_0_12px_rgba(74,200,255,0.15)] placeholder-text-muted focus:placeholder-text-muted/50 min-h-[150px] resize-y"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={isSending ? {} : { y: -3, scale: 1.02, boxShadow: "0 10px 25px rgba(37,99,235,0.25)" }}
                  whileTap={isSending ? {} : { scale: 0.98, y: 0 }}
                  transition={{ type: "spring" as any, stiffness: 400, damping: 15 }}
                  className={`w-full p-[16px] bg-gradient-to-r from-primary to-[#2F6BFF] text-white border-none rounded-[12px] text-[1rem] font-semibold flex items-center justify-center gap-[10px] mt-[24px] relative overflow-hidden ${
                    isSending ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isSending ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin relative z-10"></i>
                      <span className="relative z-10">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 4.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                      />
                      <i className="fa-solid fa-paper-plane relative z-10"></i> 
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-[20px] p-[16px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-[12px] text-[0.9rem] flex items-center gap-[12px]"
                >
                  <i className="fa-solid fa-circle-check text-[1.1rem]"></i>
                  <span>Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-[20px] p-[16px] bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[12px] text-[0.9rem] flex items-center gap-[12px]"
                >
                  <i className="fa-solid fa-circle-xmark text-[1.1rem]"></i>
                  <span>Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp/Email secara langsung.</span>
                </motion.div>
              )}

              <div className="mt-[24px] flex items-center gap-[8px] text-[0.8rem] text-text-muted">
                <i className="fa-solid fa-lock text-text-muted"></i> Your information is safe with me. I will never share it with anyone.
              </div>
            </motion.div>
          </InteractiveTilt>
        </div>

        {/* BOTTOM QUOTE */}
        <InteractiveTilt maxTilt={4} glareMaxOpacity={0.05} glareColor="#4ac8ff" className="mt-[60px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-surface border border-border-primary rounded-[20px] p-[32px] flex items-center justify-center gap-[20px] text-center"
          >
            <motion.i 
              animate={{ y: [0, -3, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="fa-solid fa-quote-left text-[2rem] text-border-primary"
            ></motion.i>
            <div className="grow-0">
              <motion.h4 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-[1.1rem] font-bold text-text-primary mb-[4px]"
              >
                Great ideas start with a conversation.
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "10000px 0px 0px 0px", amount: 0.15 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-[0.95rem] text-text-secondary"
              >
                Let's create something amazing together.
              </motion.p>
            </div>
            <motion.i 
              animate={{ y: [0, 3, 0] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="fa-solid fa-quote-right text-[2rem] text-border-primary"
            ></motion.i>
          </motion.div>
        </InteractiveTilt>

      </div>
    </section>
  );
}
