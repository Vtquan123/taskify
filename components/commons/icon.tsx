import { cn } from "@/lib/utils"

interface IconProps {
  name: string,
  size?: string,
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, size, className }) => {
  if (!name) return null
  return <i
    className={cn(
      `${name}`,
      `${size ? `ri-${size}` : ''}`,
      className
    )}
  />
}

export {
  Icon
}