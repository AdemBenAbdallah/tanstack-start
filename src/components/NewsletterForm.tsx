import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";

interface NewsletterFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function NewsletterForm({
  onSuccess,
  onError,
}: NewsletterFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      interests: [] as string[],
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          throw new Error("Subscription failed");
        }

        form.reset();
        onSuccess?.();
      } catch (error) {
        onError?.(error instanceof Error ? error.message : "Unknown error");
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) =>
            value.length < 2 ? "Name must be at least 2 characters" : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-cream/70"
            >
              Name
            </label>
            <input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-lg border border-copper/20 bg-charcoal-light/50 px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-transparent transition-all"
              placeholder="Your name"
            />
            {field.state.errors && (
              <p className="text-red-400 text-sm">{field.state.errors}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ? "Please enter a valid email"
              : undefined,
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-cream/70"
            >
              Email
            </label>
            <input
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded-lg border border-copper/20 bg-charcoal-light/50 px-4 py-2.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-copper/40 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            {field.state.errors && (
              <p className="text-red-400 text-sm">{field.state.errors}</p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="interests">
        {(field) => (
          <div className="space-y-2">
            <span className="block text-sm font-medium text-cream/70">
              Interests
            </span>
            <div className="flex flex-wrap gap-2">
              {["Workshops", "Demos", "Networking", "Recipes"].map((interest) => {
                const isSelected = field.state.value.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => {
                      const newValue = isSelected
                        ? field.state.value.filter((i) => i !== interest)
                        : [...field.state.value, interest];
                      field.handleChange(newValue);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-copper/20 border border-copper/40 text-copper-light"
                        : "bg-charcoal-light/30 border border-copper/10 text-cream/50 hover:border-copper/30"
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={({ canSubmit, isSubmitting }) => ({
          canSubmit,
          isSubmitting,
        })}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full"
            variant="gold"
            size="lg"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
