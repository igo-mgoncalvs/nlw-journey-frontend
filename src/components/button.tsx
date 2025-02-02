import { ReactNode , ComponentProps} from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'rounded-lg px-5 justify-center font-medium flex items-center gap-2',

  variants: {
    vatiant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11'
    }
  },


  defaultVariants: {
    vatiant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode,
}

export function Button ({
  children,
  vatiant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ vatiant, size })}>
      {children}
    </button>
  )
}