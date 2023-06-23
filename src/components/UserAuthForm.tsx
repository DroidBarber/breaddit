'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icons'
import { Github } from 'lucide-react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast()

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button
      isLoading={isLoading}
      type='button'
      size='sm'
      className='w-full'
      disabled={isLoading}
      onClick={loginWithGoogle}
      >
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
        Google
      </Button>
      <Button
      isLoading={isLoading}
      type='button'
      size='sm'
      className='w-full ml-4'
      disabled={isLoading}
      onClick={loginWithGoogle}
      >
        <Github className='h-4 w-4 mr-2'/>
        Github
      </Button>
    </div>
  )
}

export default UserAuthForm