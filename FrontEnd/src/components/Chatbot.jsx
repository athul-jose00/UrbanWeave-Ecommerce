import React, { useState, useEffect, useRef, useContext } from "react";
import { FaRegCommentDots, FaTimes } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const { token, products, backendURL } = useContext(ShopContext);
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingCategory, setAwaitingCategory] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      botResponse(userMessage.text);
    }, 800);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false); // Close chatbot when navigating
  };

  const botResponse = async (userText) => {
    setIsTyping(false);
    const lowerText = userText.toLowerCase();

    //intro
    if (
      lowerText.includes("hello") ||
      lowerText.includes("hi") ||
      lowerText.includes("hey")
    ) {
      addBotMessage(
        "Hello! 👋 I'm the UrbanWeave Assistant.\nI can help you with:\n• Tracking your orders 📦\n• Recommending trending products 👗🧥\n• Learning about UrbanWeave 🛍️\n• Contacting support 📞\n\nJust type what you need help with!"
      );
      return;
    }

    // If bot is waiting for category
    if (awaitingCategory) {
      if (lowerText.includes("woman") || lowerText.includes("women") || lowerText === "w") {
        recommendByCategory("Women");
      } else if (lowerText.includes("man") || lowerText.includes("men") || lowerText === "m") {
        recommendByCategory("Men");
      } else {
        addBotMessage(
          "Sorry, I didn't understand. Please type 'Men' or 'Women'."
        );
        return; // Keep awaitingCategory true
      }
      setAwaitingCategory(false);
      return;
    }

    // About UrbanWeave
    if (lowerText.includes("urbanweave") || lowerText.includes("about")) {
      addBotMessage(
        "UrbanWeave is your one-stop fashion destination. We bring premium, trendy, and affordable clothing for Men and Women. 🌟"
      );
    }

    // Track orders
    else if (lowerText.includes("order") || lowerText.includes("track")) {
      if (!token) {
        addBotMessage("Please log in to view your orders!");
        return;
      }
      try {
        const res = await axios.post(
          `${backendURL}/api/order/userorders`,
          {},
          { headers: { token } }
        );
        const orders = res.data.orders;

        if (orders && orders.length > 0) {
          const undelivered = orders.filter(
            (order) => order.status !== "Delivered"
          );
          if (undelivered.length > 0) {
            addBotMessage("Here are your active orders:");
            undelivered.forEach((order) => {
              addBotMessage(
                `Order #${order._id.slice(-5)} - Status: ${
                  order.status
                } (Click to track)`,
                `/track-order/${order._id}`
              );
            });
          } else {
            addBotMessage("You have no pending deliveries! 🎉");
          }
        } else {
          addBotMessage("No orders found.");
        }
      } catch (error) {
        console.log(error);
        addBotMessage("Something went wrong fetching your orders.");
      }
    }

    else if ((lowerText.includes("recommend")||lowerText.includes("suggest") )|| (lowerText.includes("bestseller")||lowerText.includes("best seller"))||lowerText.includes("confused")) {
      if (lowerText.includes("woman") || lowerText.includes("women")) {
        recommendByCategory("Women");
      } else if (lowerText.includes("man") || lowerText.includes("men")) {
        recommendByCategory("Men");
      } else {
        addBotMessage("Are you looking outfits for Men or Women?");
        setAwaitingCategory(true);
      }
    }

    else if (lowerText.includes("contact") || lowerText.includes("support")) {
      addBotMessage("You can reach our support team here 👉", "/contact");
    }

    else {
      addBotMessage(
        "Sorry, I didn't understand. You can ask about 'orders', 'products', 'UrbanWeave', or 'contact'."
      );
    }
  };

  const recommendByCategory = (category) => {
    const filtered = products.filter((prod) => prod.category === category);
    
    if (filtered.length > 0) {
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      const recommendations = shuffled.slice(0, 3);
      
      addBotMessage(`Here are some ${category}'s products you might like:`);
      recommendations.forEach((product) => {
        addBotMessage(
          `${product.name} - ₹${product.price}`,
          `/product/${product._id}`
        );
      });
    } else {
      addBotMessage(`Currently no ${category}'s products available. Check back later!`);
    }
  };

  const addBotMessage = (text, link = null) => {
    setMessages((prev) => [...prev, { sender: "bot", text, link }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUserMessage();
    }
  };

  return (
    <>
      <div
        className="fixed bottom-6 right-7 z-50 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-800 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRegCommentDots size={24} />}
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-8 z-50 w-90 bg-[#121212]  text-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "400px" }} 
        >
          <div className="p-4 text-lg font-bold bg-gray-900">
            UrbanWeave Assistant
          </div>
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 space-y-2 overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${
                    msg.sender === "user" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {msg.link ? (
                    <button 
                      onClick={() => handleLinkClick(msg.link)}
                      className="underline text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                      {msg.text}
                    </button>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-2 rounded-lg max-w-[70%] bg-gray-700 flex space-x-1">
                  <span className="animate-bounce delay-0">●</span>
                  <span className="animate-bounce delay-150">●</span>
                  <span className="animate-bounce delay-300">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 flex border-t border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-2 bg-gray-800 rounded-l-lg outline-none text-sm"
            />
            <button
              onClick={handleUserMessage}
              className="bg-blue-600 px-4 rounded-r-lg text-sm hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;