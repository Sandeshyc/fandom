import React from "react";

interface TextFieldUpdatedProps {
	name: string;
	label: string;
	value: string;
	onChange: any;
	errors?: any;
	inline?: boolean;
	[x:string]: any;
};

const TextFieldUpdated: React.FC<TextFieldUpdatedProps> = ({
	name,
	label,
	value,
	errors,
	onChange,
	inline,
	...restProps
}) => {
	const debug = false;
	// console.log("error 1", errors);
	return (
		<div className="w-full mt-4 ">
			<label className="block text-gray-700 text-lg font-bold mb-1" htmlFor="username">{label}</label>
			<input className="w-full px-2 py-4 rounded-lg bg-white text-left shadow-md border-2 border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-xl" 
				type="text"
				id={name}
				name={name}
				placeholder={label}
				value={value}
				onChange={e => onChange(e.target.value)}
				// error={errors[name] !== undefined}
				// helperText={errors[name] ? errors[name] : ""}
				{...restProps}
			/>
		</div>
	);
};


export default TextFieldUpdated;
