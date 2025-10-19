"use client";

import { useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputPassword = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          {...props}
          className={cn("pr-9", props.className)}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default InputPassword;
