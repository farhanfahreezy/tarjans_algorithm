import { ChangeEvent } from "react";
import { LuLoader } from "react-icons/lu";

interface FileInputProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const FileInput = ({ value, onChange, onSubmit, loading }: FileInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value.toUpperCase());
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-5">
      <div>Input Your Graph</div>
      <div>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={`Format:\n{node_1} {node_2}\n{node_1} {node_3}\n...`}
          className="block w-[300px] h-[50vh] resize-none px-3 py-2 bg-secondaryWhite border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none text-gray-900 transition-all"
        />
      </div>
      <button
        disabled={loading}
        onClick={onSubmit}
        className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-[130px] h-[47px] py-2 px-6 rounded-md text-white font-medium text-[20px] hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
      >
        {loading ? (
          <div className="flex flex-col justify-center items-center animate-spin">
            <LuLoader color="white" />
          </div>
        ) : (
          "Visualize"
        )}
      </button>
    </div>
  );
};

export default FileInput;
