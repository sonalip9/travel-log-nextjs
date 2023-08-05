import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Switch } from '@components/Switch';
import { MoonIcon, SunIcon } from '@icons';
import { useAppTheme } from '@styles/theme';

function NavBar() {
  const { setTheme } = useTheme();
  const { isDark } = useAppTheme();

  const { status } = useSession();

  return (
    <Container alignCenter row css={{ p: '$sm', gap: '$lg', width: 'auto' }} justify="flex-end">
      <Switch
        checked={!isDark}
        iconOff={<MoonIcon filled />}
        iconOn={<SunIcon filled />}
        size="xl"
        onChange={({ target }) => setTheme(target.checked ? 'light' : 'dark')}
      />

      {status === 'authenticated' && (
        <Button
          auto
          bordered
          color="primary"
          css={{ textTransform: 'uppercase' }}
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
