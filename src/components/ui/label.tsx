import * as React from "react";
import { cn } from "../../lib/utils";

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			// biome-ignore lint/a11y/noLabelWithoutControl: Label is designed to work with or without controls
			<label
				className={cn(
					"text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Label.displayName = "Label";

export { Label };
