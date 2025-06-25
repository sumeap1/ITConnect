import { useRef } from "react";

export default function FileUploadButtons() {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex gap-4 mt-4">
      {/* Profile Photo Upload */}
      <div>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("Selected profile photo:", file?.name);
          }}
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Upload Profile Photo
        </button>
      </div>

      {/* CV Upload */}
      <div>
        <input
          ref={cvInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log("Selected CV:", file?.name);
          }}
        />
        <button
          onClick={() => cvInputRef.current?.click()}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Upload CV
        </button>
      </div>
    </div>
  );
}
