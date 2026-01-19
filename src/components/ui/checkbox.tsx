import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface CheckboxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, label, id: providedId, ...props }, ref) => {
		// Generate ID at the top level - hooks must be called unconditionally
		const generatedId = React.useId();
		const checkboxId = providedId ?? generatedId;

		return (
			<div className="flex items-center gap-3">
				<div className="relative">
					<input
						type="checkbox"
						id={checkboxId}
						className={cn(
							"peer appearance-none w-5 h-5 rounded-lg border-2 border-border bg-background checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0 transition-all duration-200 cursor-pointer shrink-0",
							className,
						)}
						ref={ref}
						{...props}
					/>
					<Check
						className={cn(
							"absolute left-0.5 top-0.5 w-3.5 h-3.5 text-primary-foreground",
							"opacity-0 peer-checked:opacity-100 transition-opacity duration-200",
							"pointer-events-none",
						)}
						aria-hidden="true"
					/>
				</div>
				{label && (
					<label
						htmlFor={checkboxId}
						className="text-sm text-foreground cursor-pointer select-none"
					>
						{label}
					</label>
				)}
			</div>
		);
	},
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
