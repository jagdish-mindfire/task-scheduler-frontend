import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const PopoverContext = React.createContext({
  open: false,
  setOpen: () => {},
})

export const Popover = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      {children}
    </PopoverContext.Provider>
  )
}

export const PopoverTrigger = ({ children, asChild = false }) => {
  const { setOpen } = React.useContext(PopoverContext)
  const child = asChild ? React.Children.only(children) : children

  return React.cloneElement(child, {
    onClick: () => setOpen((prev) => !prev),
  })
}

export const PopoverContent = ({ children }) => {
  const { open, setOpen } = React.useContext(PopoverContext)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setOpen])

  if (!open) return null

  return createPortal(
    <div ref={ref} className="absolute z-50 bg-white rounded shadow-lg p-4">
      {children}
    </div>,
    document.body,
  )
}
