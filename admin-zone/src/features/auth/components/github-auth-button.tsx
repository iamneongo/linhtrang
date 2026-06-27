'use client';

import { Button } from '@admin/components/ui/button';
import { Icons } from '@admin/components/icons';

export default function GithubSignInButton() {
  return (
    <Button className='w-full' variant='outline' type='button' onClick={() => void 0}>
      <Icons.github className='mr-2 h-4 w-4' />
      Continue with Github
    </Button>
  );
}

