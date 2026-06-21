/**
 * Barrel export for all UI primitives.
 * Import from here: `import { Button, Card, Input } from "@/components/ui";`
 */

// Form primitives
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";
export { Input } from "./input";
export type { InputProps } from "./input";
export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";
export { Label } from "./label";
export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";
export { FormField } from "./form-field";
export { UploadButton } from "./upload-button";
export {
  OTPInputField,
  OTPInputGroup,
  OTPInputSlot,
  OTPInputSeparator,
} from "./otp-input";
export { Slider } from "./slider";

// Display primitives
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export { Separator } from "./separator";
export { Skeleton } from "./skeleton";
export { Progress } from "./progress";
export { Stat } from "./stat";
export { Avatar, AvatarImage, AvatarFallback } from "./avatar";

// Navigation primitives
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";
export { Breadcrumbs } from "./breadcrumbs";
export { Pagination } from "./pagination";
export { MobileNav } from "./mobile-nav";
export { SkipLink } from "./skip-link";

// Overlay primitives
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./sheet";
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./popover";
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
export { Toaster, toast } from "./toast";

// Typography primitives
export { Eyebrow } from "./eyebrow";
export { SectionHeading } from "./section-heading";
export { Prose } from "./prose";

// Interactive primitives
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export { Checkbox } from "./checkbox";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export { Switch } from "./switch";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./select";
