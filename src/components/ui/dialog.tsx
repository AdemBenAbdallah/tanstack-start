import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
	onClose?: () => void;
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

interface DialogDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function Dialog({ open, onOpenChange, children }: DialogProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === DialogContent) {
					return React.cloneElement(
						child as React.ReactElement<DialogContentProps>,
						{
							onClose: () => onOpenChange(false),
						},
					);
				}
				return child;
			})}
		</div>
	);
}

function DialogContent({ children, className, onClose }: DialogContentProps) {
	return (
		<div
			className={cn(
				"relative bg-card border border-border rounded-2xl shadow-2xl",
				"w-full max-w-lg mx-4 animate-in zoom-in-95 fade-in duration-200",
				className,
			)}
		>
			{children}
			{onClose && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
				>
					<X className="w-5 h-5" />
					<span className="sr-only">Close</span>
				</Button>
			)}
		</div>
	);
}

function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<div className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)}>
			{children}
		</div>
	);
}

function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<h2 className={cn("text-xl font-semibold text-foreground", className)}>
			{children}
		</h2>
	);
}

function DialogDescription({ children, className }: DialogDescriptionProps) {
	return (
		<p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
	);
}

function DialogBody({ children, className }: DialogBodyProps) {
	return <div className={cn("p-6 space-y-5", className)}>{children}</div>;
}

function DialogFooter({ children, className }: DialogFooterProps) {
	return <div className={cn("flex gap-3 pt-4", className)}>{children}</div>;
}

function DialogOverlay() {
	return (
		<div className="fixed inset-0 z-[-1]">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
		</div>
	);
}

export {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogBody,
	DialogFooter,
	DialogOverlay,
};
