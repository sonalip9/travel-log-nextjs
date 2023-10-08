'use client';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Switch } from '@components/Switch';
import { MoonIcon, SunIcon } from '@icons';
import { useAppTheme } from '@styles/theme';

function NavBar() {
  const { theme, setTheme } = useAppTheme();

  const { status } = useSession();

  return (
    <Container row alignItems="center" className="w-auto gap-lg p-sm" justifyContent="flex-end">
      <Switch
        classNames={{
          thumb: theme === 'light' ? 'bg-blue-90' : 'bg-blue-10',
        }}
        defaultSelected={theme === 'light'}
        size="lg"
        thumbIcon={
          theme === 'light' ? (
            <SunIcon filled className="text-onPrimaryContainer" />
          ) : (
            <MoonIcon filled className="text-onPrimaryContainer" />
          )
        }
        onValueChange={(isChecked) => setTheme(isChecked ? 'light' : 'dark')}
      />

      {status === 'authenticated' && (
        <Button
          className="uppercase"
          color="primary"
          variant="bordered"
          onPress={() => {
            signOut({ callbackUrl: '/login', redirect: true }).catch(console.error);
          }}
        >
          Sign Out
        </Button>
      )}
    </Container>
  );
}

export default NavBar;
