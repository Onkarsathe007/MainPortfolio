"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"

const NavBar = ({ items, className }) => {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const navigate = useNavigate()
  const location = useLocation()

  // Detect scroll position and update active tab
  useEffect(() => {
    // Only run scroll detection on home page
    if (location.pathname !== '/') {
      setActiveTab(null) // Deactivate all tabs when not on home page
      return
    }

    const handleScroll = () => {
      const sections = items
        .filter(item => item.url.startsWith('#'))
        .map(item => ({
          name: item.name,
          element: document.querySelector(item.url)
        }))
        .filter(section => section.element)

      // Get current scroll position
      const scrollPosition = window.scrollY + 100 // offset for navbar height

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.name)
          break
        }
      }
    }

    // Run once on mount
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location.pathname, items])

  const handleClick = (e, item) => {
    e.preventDefault()
    setActiveTab(item.name)
    
    // If it's the Blog item, navigate to /blogs page
    if (item.name === 'Blogs' || item.url === '/blogs') {
      navigate('/blogs')
      return
    }
    
    // For other items, handle section scrolling
    if (item.url.startsWith('#') && item.url !== '#') {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const targetElement = document.querySelector(item.url)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      } else {
        // We're already on home page, just scroll
        const targetElement = document.querySelector(item.url)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }
  }


  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export { NavBar }
