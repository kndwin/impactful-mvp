import { ButtonHTMLAttributes } from "react";
import tw from "tailwind-styled-components";

export const Button = tw.button<any>`
	py-2.5 px-5 text-sm font-bold text-left
	flex gap-4 items-center justify-between
	text-gray-900 focus:outline-none bg-white rounded-lg 
	disabled:bg-zinc-300 disabled:hover:bg-zinc-300
	border border-zinc-200 
	hover:bg-zinc-200 hover:text-zinc-700 
	focus:z-10 focus:ring-1 focus:ring-gray-200 
`;
