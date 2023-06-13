import { TextField } from "@mui/material"
import { useState } from "react"

export default function InputVariant1({
  className,
  placeholder,
  label,
  defaultValue,
  id,
  type,
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className='block mb-[4px] font-medium dark:text-slate-200 tracking-wide'
        >
          {label}
        </label>
      )}
      <TextField
        type={type || "text"}
        fullWidth
        id={id}
        variant='outlined'
        sx={{
          "& .MuiInputBase-input": {
            backgroundColor: "#fff",
            borderRadius: 1,
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size='small'
        placeholder={placeholder}
      />
    </div>
  )
}
