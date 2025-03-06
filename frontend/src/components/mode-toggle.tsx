import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {/* Sun icon for light theme */}
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : null}

      {/* Moon icon for dark theme */}
      {theme === "dark" ? (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
      ) : null}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
