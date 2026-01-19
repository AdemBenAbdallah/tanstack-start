import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface SelectProps
	extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, label, error, children, id: providedId, ...props }, ref) => {
		const generatedId = React.useId();
		const selectId = providedId || generatedId;

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={selectId}
						className="block text-sm font-medium text-foreground"
					>
						{label}
					</label>
				)}
				<div className="relative">
					<select
						id={selectId}
						className={cn(
							"w-full px-4 py-3 bg-background border border-border rounded-lg",
							"focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
							"transition-all duration-200 appearance-none cursor-pointer",
							"text-foreground",
							error &&
								"border-red-500 focus:ring-red-500/50 focus:border-red-500",
							className,
						)}
						ref={ref}
						{...props}
					>
						{children}
					</select>
					<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
				</div>
				{error && <p className="text-sm text-red-500">{error}</p>}
			</div>
		);
	},
);
Select.displayName = "Select";

export { Select };
