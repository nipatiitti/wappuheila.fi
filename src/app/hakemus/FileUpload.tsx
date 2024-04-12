'use client'

export const FileUpload = () => (
  <input
    type="file"
    accept="image/*"
    id="image"
    name="image"
    required
    className="peer p-2 w-full h-full bg-white border-2 border-black rounded-none outline-none"
    onChange={(e) => {
      // Make sure the file is under 2MB
      if (e.target.files && e.target.files[0].size > 1 * 1024 * 1024) {
        e.target.setCustomValidity('Kuvan koko saa olla korkeintaan 1MB')
      } else {
        e.target.setCustomValidity('')
      }
    }}
  />
)
